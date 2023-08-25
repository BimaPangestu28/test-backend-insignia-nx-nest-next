import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get('auth-key')?.value;

  if (
    !userToken &&
    !['/login', '/register'].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (
    userToken &&
    ['/login', '/register'].includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/users-management', '/login', '/register'],
};
