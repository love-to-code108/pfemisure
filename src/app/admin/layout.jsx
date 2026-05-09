import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import AdminSidebar from "@/My-components/commonComponents/AdminSidebar";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export default async function AdminLayout({ children }) {
    const cookieStore = await cookies();
    
    // 1. Check if they are logged in at all
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        { cookies: { getAll() { return cookieStore.getAll(); } } }
    );

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
        redirect('/home'); // Kick out unauthenticated users
    }

    // 2. Check if they have the VIP "ADMIN" badge
    const profile = await prisma.profile.findUnique({
        where: { id: user.id },
        select: { role: true }
    });

    if (profile?.role !== "ADMIN") {
        redirect('/home'); // Kick out normal users!
    }

    // 3. Desktop Enforcement
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Block Warning */}
            <div className="flex xl:hidden flex-col items-center justify-center min-h-screen p-6 text-center bg-white">
                <div className="p-4 mb-4 bg-red-50 rounded-full">
                    <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Desktop Required</h1>
                <p className="mt-2 text-gray-600">The Pfemisure Admin Panel contains complex data tables and logistics tools that cannot be viewed on mobile devices. Please log in from a computer.</p>
            </div>

            {/* The Actual Admin Panel (Only shows on Desktop!) */}
            <div className="hidden xl:flex">

                <AdminSidebar />
                {/* We will build the Sidebar here next */}
                <main className="flex-1 w-full h-screen overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}