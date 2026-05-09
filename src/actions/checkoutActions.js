

"use server"

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Initialize Razorpay
const razorpayInstance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function createCheckoutSession(cartItems, deliveryAddress, contactNumber) {
    try {
        // 1. Verify User Session
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            { cookies: { getAll() { return cookieStore.getAll(); } } }
        );

        // Ask the Supabase server to cryptographically verify the cookie
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) throw new Error("Unauthorized access");
        const userId = user.id;

        // 2. SECURITY CHECK: Recalculate the exact total on the server!
        // We never trust the total price sent from the browser.
        let calculatedSubtotal = 0;
        const verifiedOrderItems = [];

        for (const item of cartItems) {
            // Fetch the actual current price from the database
            const dbProduct = await prisma.product.findUnique({
                where: { id: item.productId }
            });

            if (!dbProduct) throw new Error(`Product missing: ${item.productId}`);

            calculatedSubtotal += (dbProduct.price * item.quantity);
            
            verifiedOrderItems.push({
                product_id: dbProduct.id,
                quantity: item.quantity,
                size: item.size,
                unit_price: dbProduct.price // Freeze the price at checkout!
            });
        }

        const deliveryFee = calculatedSubtotal > 500 ? 0 : 50;
        const finalTotal = calculatedSubtotal + deliveryFee;

        // 3. Ask Razorpay to create an Order ID
        // Razorpay expects the amount in PAISE (so we multiply by 100)
        const razorpayOptions = {
            amount: Math.round(finalTotal * 100), 
            currency: "INR",
            receipt: `rcpt_${Date.now()}_${userId.substring(0, 5)}`
        };

        const razorpayOrder = await razorpayInstance.orders.create(razorpayOptions);

        // 4. Create the PENDING order in our Database
        const newOrder = await prisma.order.create({
            data: {
                profile_id: userId,
                delivery_address: deliveryAddress,
                contact_number: contactNumber,
                total_amount: finalTotal,
                razorpay_order_id: razorpayOrder.id,
                payment_status: "PENDING",
                items: {
                    create: verifiedOrderItems
                }
            }
        });

        // 5. Send the keys to the frontend to pop open the payment window
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
        
        // 1. Create the exact string Razorpay expects us to hash
        const generatedSignature = crypto
            .createHmac("sha256", secret)
            .update(razorpayOrderId + "|" + razorpayPaymentId)
            .digest("hex");

        // 2. Compare our generated lock with the lock they sent
        const isAuthentic = generatedSignature === razorpaySignature;

        if (!isAuthentic) {
            // SECURITY BREACH: The payment was faked or tampered with!
            await prisma.order.update({
                where: { razorpay_order_id: razorpayOrderId },
                data: { payment_status: "FAILED" }
            });
            return { success: false, error: "Invalid payment signature detected." };
        }

        // 3. SUCCESS! The payment is real. Update the database officially.
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