import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import CheckoutClient from '@/My-components/commonComponents/CheckoutClient'; // Adjust path if needed

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });



export const dynamic = 'force-dynamic';





export default async function CheckoutPage() {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        { cookies: { getAll() { return cookieStore.getAll(); } } }
    );

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect('/home'); // Kick unauthenticated users out
    }

    // Fetch their profile securely
    const userProfile = await prisma.profile.findUnique({
        where: { id: session.user.id }
    });

    return <CheckoutClient userProfile={userProfile} />;
}