import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const runtime = 'nodejs' // Ensure Node.js runtime

export default function middleware(req: NextRequest) {
  // For now, allow all requests - auth checks are done in getServerSession calls
  // In production, you would implement proper session checking here
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/streak/:path*',
    '/health/:path*',
    '/challenges/:path*',
    '/achievements/:path*',
    '/forum/:path*',
    '/crisis/:path*'
  ]
}
