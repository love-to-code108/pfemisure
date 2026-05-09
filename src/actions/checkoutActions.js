"use server"

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { AFFILIATE_DISCOUNT_PERCENTAGE } from "@/lib/utils"; // Make sure this is in your utils.js!

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Initialize Razorpay
const razorpayInstance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function validateAffiliateCode(code) {
    try {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            { cookies: { getAll() { return cookieStore.getAll(); } } }
        );

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { success: false, error: "Unauthorized" };

        // Check if the code exists
        const profile = await prisma.profile.findUnique({
            where: { affiliate_code: code.trim() } 
        });

        if (!profile) return { success: false, error: "Invalid affiliate code." };
        if (profile.id === user.id) return { success: false, error: "You cannot use your own affiliate code!" };

        return { success: true };
    } catch (error) {
        console.error("Affiliate Validation Error:", error);
        return { success: false, error: "Failed to validate code." };
    }
}

export async function createCheckoutSession(cartItems, deliveryAddress, contactNumber, appliedAffiliateCode = null) {
    try {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            { cookies: { getAll() { return cookieStore.getAll(); } } }
        );

        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw new Error("Unauthorized access");
        const userId = user.id;

        let calculatedSubtotal = 0;
        const verifiedOrderItems = [];

        for (const item of cartItems) {
            const dbProduct = await prisma.product.findUnique({
                where: { id: item.productId }
            });

            if (!dbProduct) throw new Error(`Product missing: ${item.productId}`);

            calculatedSubtotal += (dbProduct.price * item.quantity);
            
            verifiedOrderItems.push({
                product_id: dbProduct.id,
                quantity: item.quantity,
                size: item.size,
                unit_price: dbProduct.price 
            });
        }

        // --- NEW AFFILIATE MATH ---
        let discountAmount = 0;
        let validAffiliateCode = null;

        if (appliedAffiliateCode) {
            const profile = await prisma.profile.findUnique({
                where: { affiliate_code: appliedAffiliateCode }
            });
            if (profile && profile.id !== userId) {
                validAffiliateCode = appliedAffiliateCode;
                discountAmount = (calculatedSubtotal * AFFILIATE_DISCOUNT_PERCENTAGE) / 100;
            }
        }

        const discountedSubtotal = calculatedSubtotal - discountAmount;
        const deliveryFee = discountedSubtotal > 500 ? 0 : 50; 
        const finalTotal = discountedSubtotal + deliveryFee;

        const razorpayOptions = {
            amount: Math.round(finalTotal * 100), 
            currency: "INR",
            receipt: `rcpt_${Date.now()}_${userId.substring(0, 5)}`
        };

        const razorpayOrder = await razorpayInstance.orders.create(razorpayOptions);

        const newOrder = await prisma.order.create({
            data: {
                profile_id: userId,
                delivery_address: deliveryAddress,
                contact_number: contactNumber,
                total_amount: finalTotal,
                affiliate_code: validAffiliateCode, // Save the applied code to the database!
                razorpay_order_id: razorpayOrder.id,
                payment_status: "PENDING",
                items: {
                    create: verifiedOrderItems
                }
            }
        });

        return {
            success: true,
            orderId: newOrder.id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOptions.amount,
            currency: razorpayOptions.currency
        };

    } catch (error) {
        console.error("Checkout Initialization Error:", error);
        return { success: false, error: error.message };
    }
}

export async function verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
    try {
        const secret = process.env.RAZORPAY_KEY_SECRET;
        
        const generatedSignature = crypto
            .createHmac("sha256", secret)
            .update(razorpayOrderId + "|" + razorpayPaymentId)
            .digest("hex");

        const isAuthentic = generatedSignature === razorpaySignature;

        if (!isAuthentic) {
            await prisma.order.update({
                where: { razorpay_order_id: razorpayOrderId },
                data: { payment_status: "FAILED" }
            });
            return { success: false, error: "Invalid payment signature detected." };
        }

        await prisma.order.update({
            where: { razorpay_order_id: razorpayOrderId },
            data: {
                payment_status: "PAID",
                razorpay_payment_id: razorpayPaymentId,
                razorpay_signature: razorpaySignature
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Verification Error:", error);
        return { success: false, error: "Internal verification failed." };
    }
}



// Add this at the bottom of src/actions/checkoutActions.js

export async function markOrderAsFailed(orderId) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { payment_status: "FAILED" }
        });
        return { success: true };
    } catch (error) {
        console.error("Error marking order as failed:", error);
        return { success: false };
    }
}