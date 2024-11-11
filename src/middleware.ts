import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateAccessToken } from './utils/auth/validateAccessToken'

export const config = {
  matcher: ['/login/:path*', '/signup/:path*', '/user/:path*', '/profile/:path*'],
}

export async function middleware(request: NextRequest) {
  const cookieStore = request.cookies
  const accessToken = cookieStore.get('accessToken')?.value

  const path = request.nextUrl.pathname

  if ((path.startsWith('/login') || path.startsWith('/signup')) && accessToken) {
    return NextResponse.redirect(new URL('/store', request.url))
  }

  if (path.startsWith('/user') || path.startsWith('/profile')) {
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