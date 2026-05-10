import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/home';

  if (code) {
    // 1. Determine the exact URL to redirect the user to
    const forwardedHost = request.headers.get('x-forwarded-host');
    const isLocalEnv = process.env.NODE_ENV === 'development';
    const redirectUrl = isLocalEnv 
        ? `${origin}${next}` 
        : forwardedHost ? `https://${forwardedHost}${next}` : `${origin}${next}`;

    // 2. Create the redirect response FIRST
    const response = NextResponse.redirect(redirectUrl);

    // 3. Inject the cookies directly into that specific response object
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set({ name, value, ...options });
            });
          },
        },
      }
    );

    // 4. Trade the code for the session (This triggers the setAll function above)
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 5. Fire the redirect WITH the cookies attached!
      return response; 
    }
  }

  // If something fails, send them home safely
  return NextResponse.redirect(`${origin}/home`);
}