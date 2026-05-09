import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic'; // CRITICAL: Tells Vercel to never cache this route and always read live cookies!

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/home';

  if (code) {
    const cookieStore = await cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // Ignore in server context
            }
          },
        },
      }
    );

    // Trade the code for a secure session cookie
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Vercel Proxy Handling: Ensures the redirect goes to your actual live domain
      const forwardedHost = request.headers.get('x-forwarded-host');
      if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      }
      return NextResponse.redirect(`${origin}${next}`);
    } else {
        console.error("Auth Callback Error:", error.message);
    }
  }

  // If authentication fails, safely bounce them back to the home page instead of a 404 error!
  return NextResponse.redirect(`${origin}/home`);
}