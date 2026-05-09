"use server"

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Security check helper
async function verifyAdmin() {
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        { cookies: { getAll() { return cookieStore.getAll(); } } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const profile = await prisma.profile.findUnique({ where: { id: user.id } });
    return profile?.role === "ADMIN";
}

export async function processAffiliatePayout(affiliateCode) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized. Admin only." };

        // Find all unpaid, successful orders tied to this code and mark them paid!
        const result = await prisma.order.updateMany({
            where: {
                affiliate_code: affiliateCode,
                commission_paid: false,
                // ADD "DELIVERED" HERE:
                payment_status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] }
            },
            data: {
                commission_paid: true
            }
        });

        if (result.count === 0) {
            return { success: false, error: "No pending commissions found to pay." };
        }

        return { success: true, message: `Successfully marked ${result.count} orders as paid.` };
    } catch (error) {
        console.error("Payout Error:", error);
        return { success: false, error: "Database error during payout." };
    }
}


// Add this to the bottom of src/actions/adminActions.js

export async function updateOrderStatus(orderId, newStatus) {
    try {
        const isAdmin = await verifyAdmin();
        if (!isAdmin) return { success: false, error: "Unauthorized. Admin only." };

        // Ensure we only accept valid statuses
        const validStatuses = ["PENDING", "PAID", "PROCESSING", "SHIPPED", "FAILED", "DELIVERED"];
        if (!validStatuses.includes(newStatus)) {
            return { success: false, error: "Invalid status code." };
        }

        await prisma.order.update({
            where: { id: orderId },
            data: { payment_status: newStatus }
        });

        return { success: true, message: `Order #${orderId.substring(0, 6).toUpperCase()} marked as ${newStatus}.` };
    } catch (error) {
        console.error("Order Update Error:", error);
        return { success: false, error: "Failed to update order status." };
    }
}