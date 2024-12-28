import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Define protected routes with their respective login URLs
  const protectedRoutes = [
    { path: '/user-panel', redirectUrl: '/auth', tokenKey: 'authToken' },
    { path: '/admin-panel', redirectUrl: '/admin-auth', tokenKey: 'adminAuthToken' },
    { path: '/staff-panel', redirectUrl: '/staff-auth', tokenKey: 'staffAuthToken' }
  ];

  console.log(`Incoming request to: ${pathname}`);

  // Check if the requested route is protected
  for (const { path, redirectUrl, tokenKey } of protectedRoutes) {
    if (pathname.startsWith(path)) {
      console.log(`Checking protected route: ${path}`);
      
      // Parse cookies manually
      const cookieHeader = req.headers.get('cookie') || '';
      const cookies = Object.fromEntries(cookieHeader.split('; ').map(cookie => {
        const [name, ...rest] = cookie.split('=');
        return [name, decodeURIComponent(rest.join('='))];
      }));

      // Extract the relevant token for the route
      const token = cookies[tokenKey];
      
      if (token) {
        console.log(`Token found: ${tokenKey} = ${token}`);
      } else {
        console.warn(`No token found for: ${tokenKey}. Redirecting to ${redirectUrl}`);
        const loginUrl = new URL(redirectUrl, req.url); // Redirect to login if token is missing
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  console.log('Token validated. Proceeding with the request.');
  // Allow the request to proceed if the token is valid
  return NextResponse.next();
}

export const config = {
  matcher: ['/user-panel/:path*', '/admin-panel/:path*', '/staff-panel/:path*'], // Protect `/user-panel` and `/admin-panel` routes
};
