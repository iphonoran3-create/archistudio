import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  // Check for Supabase session in cookies
  const sessionCookie = req.cookies.get('sb-archistudio-auth-token') ||
                        req.cookies.get('supabase-auth-token') ||
                        req.cookies.get('sb-access-token')

  // Protect admin routes
  if (req.nextUrl.pathname.startsWith('/admin') && req.nextUrl.pathname !== '/login') {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
