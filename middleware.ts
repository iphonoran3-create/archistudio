import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Temporarily disable admin protection for testing
  // TODO: Re-enable after fixing redirect issue
  return NextResponse.next()

  // Check for any Supabase auth cookie
  const hasAuthCookie = req.cookies.get('sb-access-token') ||
                        req.cookies.get('sb-refresh-token') ||
                        req.cookies.get('supabase-auth-token')

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin') && !req.nextUrl.pathname.includes('/login')) {
    if (!hasAuthCookie) {
      console.log('No auth cookie found, redirecting to login')
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
