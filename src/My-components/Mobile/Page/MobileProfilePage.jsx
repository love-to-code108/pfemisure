import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import MobileUserProfile from '../mobileComponents/MobileUserProfile'; // Adjust import path if needed

// import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Give the adapter your database URL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL
});

// 2. Pass the adapter directly into the new Prisma V7 Client
const prisma = new PrismaClient({ adapter });



export default async function MobileProfilePage() {
    // 1. Get the cookies so Supabase can read the session
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
            },
        }
    );

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/home');
    }

    // 4. Use Prisma to find their exact profile in the database using their secure UUID
    const userProfile = await prisma.profile.findUnique({
        where: {
            id: user.id
        }
    });

    // 5. Render the Client UI and pass the Prisma data in as the "initialProfile" prop!
    return (
        <div className="min-h-screen pt-10 pb-20 bg-gray-50">
            <MobileUserProfile initialProfile={userProfile} />
        </div>
    );
}