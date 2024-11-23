// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Define protected routes with their respective login URLs
  const protectedRoutes = [
    { path: '/user-panel', redirectUrl: '/auth' },
    { path: '/admin-panel', redirectUrl: '/admin-auth' }
  ];

  // Check if the requested route is protected
  for (const { path, redirectUrl } of protectedRoutes) {
    if (pathname.startsWith(path)) {
      // Parse cookies manually
      const cookieHeader = req.headers.get('cookie') || '';
      const cookies = Object.fromEntries(cookieHeader.split('; ').map(cookie => {
        const [name, ...rest] = cookie.split('=');
        return [name, decodeURIComponent(rest.join('='))];
      }));

      // Determine the cookie to check for authentication based on the route
      const authToken = path === '/user-panel' ? cookies.authToken : cookies.adminAuthToken;

      // If the relevant auth token is not found, redirect to the appropriate login page
      if (!authToken) {
        const loginUrl = new URL(redirectUrl, req.url); // Redirect to login if token is missing
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  // Allow the request to proceed if the token is valid
  return NextResponse.next();
}

export const config = {
  matcher: ['/user-panel/:path*', '/admin-panel/:path*'], // Protect `/user-panel` and `/admin-panel` routes
};
