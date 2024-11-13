import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateAccessToken } from './utils/auth/validateAccessToken'
import { decrypt } from './utils/encryption'

export const config = {
  matcher: [
    '/login/:path*',
    '/signup/:path*',
    '/user/:path*',
    '/profile/:path*',
    '/my-account/:path*',
  ],
}

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies
  const accessToken = await decrypt(cookieStore.get('accessToken')?.value)

  const path = request.nextUrl.pathname

  if ((path.startsWith('/login') || path.startsWith('/signup')) && accessToken) {
    return NextResponse.redirect(new URL('/store', request.url))
  }

  if (path.startsWith('/my-account')) {
    try {
      const customer = await validateAccessToken()

      if (!customer) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}
