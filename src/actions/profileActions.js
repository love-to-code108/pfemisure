"use server" // This strict directive tells Next.js: NEVER send this code to the browser.

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { revalidatePath } from 'next/cache';

// Re-initialize Prisma with the V7 Adapter
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

export async function updateProfileData(formData) {
    // 1. SECURITY: Never trust the client. Always re-verify who is making the request.
    const cookieStore = await cookies();
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        { cookies: { getAll() { return cookieStore.getAll(); } } }
    );

    // Ask the Supabase server to securely verify the cookie
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return { success: false, error: "Unauthorized access" };
    }

    try {
        await prisma.profile.update({
            where: { id: user.id }, // <--- secure way
            data: {
                full_name: formData.full_name,
                phone_number: formData.phone_number,
                delivery_addresses: formData.delivery_addresses,
            }
        });

        // 3. MAGIC: Tell Next.js to purge its cache for the profile page so the user sees updates instantly
        revalidatePath('/profile');

        return { success: true };
    } catch (error) {
        console.error("Database Update Failed:", error);
        return { success: false, error: "Failed to save profile data" };
    }
}