import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import AffiliateClient from '@/My-components/Mobile/mobileComponents/AffiliateClient';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default async function AffiliatePage() {
    const cookieStore = await cookies();
    
    // 1. Authenticate the User
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        { cookies: { getAll() { return cookieStore.getAll(); } } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/home');

    // 2. Get the user's specific affiliate code
    const userProfile = await prisma.profile.findUnique({
        where: { id: user.id },
        select: { affiliate_code: true }
    });

    if (!userProfile?.affiliate_code) redirect('/profile');

    // 3. Find every order in the database that used this exact code!
    const referredOrders = await prisma.order.findMany({
        where: { affiliate_code: userProfile.affiliate_code },
        orderBy: { created_at: 'desc' },
        select: {
            id: true,
            created_at: true,
            total_amount: true,
            payment_status: true
        }
    });

    return <AffiliateClient referredOrders={referredOrders} myCode={userProfile.affiliate_code} />;
}