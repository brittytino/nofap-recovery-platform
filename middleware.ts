import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard routes
        if (req.nextUrl.pathname.startsWith('/dashboard') ||
            req.nextUrl.pathname.startsWith('/profile') ||
            req.nextUrl.pathname.startsWith('/streak') ||
            req.nextUrl.pathname.startsWith('/health') ||
            req.nextUrl.pathname.startsWith('/challenges') ||
            req.nextUrl.pathname.startsWith('/achievements') ||
            req.nextUrl.pathname.startsWith('/forum') ||
            req.nextUrl.pathname.startsWith('/crisis')) {
          return !!token
        }
        return true
      },
    },
  }
)

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
