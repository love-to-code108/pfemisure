import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import OrdersClient from '@/My-components/Mobile/mobileComponents/OrdersClient';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default async function OrdersPage() {
    const cookieStore = await cookies();
    
    // 1. Authenticate the User
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        { cookies: { getAll() { return cookieStore.getAll(); } } }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/home'); // Kick unauthenticated users out
    }

    // 2. Fetch all orders for this specific user
    const userOrders = await prisma.order.findMany({
        where: { profile_id: user.id },
        orderBy: { created_at: 'desc' }, // Newest orders at the top!
        include: {
            items: {
                include: {
                    product: true // This grabs the image and name of the actual product
                }
            }
        }
    });

    return <OrdersClient initialOrders={userOrders} />;
}