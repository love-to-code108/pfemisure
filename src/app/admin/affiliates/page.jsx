import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import AffiliatePayoutClient from '@/My-components/admin/AffiliatePayoutClient';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export const dynamic = 'force-dynamic'; // Always fetch fresh financial data

export default async function AdminAffiliatesPage() {
    // 1. Fetch all profiles that have an affiliate code generated
    const profiles = await prisma.profile.findMany({
        where: { affiliate_code: { not: null } },
        select: { full_name: true, email: true, affiliate_code: true }
    });

    // 2. Fetch all orders that owe commission
    const unpaidOrders = await prisma.order.findMany({
        where: {
            affiliate_code: { not: null },
            commission_paid: false,
            // ADD "DELIVERED" HERE:
            payment_status: { in: ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"] } 
        },
        select: { affiliate_code: true, affiliate_commission: true }
    });

    let totalUnpaidOverall = 0;

    // 3. Aggregate the data: Match orders to their owners
    const payoutData = profiles.map(profile => {
        const matchingOrders = unpaidOrders.filter(o => o.affiliate_code === profile.affiliate_code);
        
        // Sum up the debt for this specific user
        const totalUnpaid = matchingOrders.reduce((sum, order) => sum + (order.affiliate_commission || 0), 0);
        
        totalUnpaidOverall += totalUnpaid;

        return {
            ...profile,
            totalUnpaid,
            orderCount: matchingOrders.length
        };
    }).filter(p => p.totalUnpaid > 0); // Hide users who have 0 pending commission

    return <AffiliatePayoutClient payoutData={payoutData} totalUnpaidOverall={totalUnpaidOverall} />;
}