// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  
  // Define protected routes here
  const protectedRoutes = ['/user-panel'];

  // Check if the requested route is protected
  if (protectedRoutes.includes(pathname)) {
    // Parse cookies manually
    const cookieHeader = req.headers.get('cookie') || '';
    const cookies = Object.fromEntries(cookieHeader.split('; ').map(cookie => {
      const [name, ...rest] = cookie.split('=');
      return [name, decodeURIComponent(rest.join('='))];
    }));

    // If no auth token is found, redirect to the login page
    if (!cookies.authToken) {
      const loginUrl = new URL('/auth', req.url); // Adjust if your login page is at a different route
      return NextResponse.redirect(loginUrl);
    }
  }
}

export const config = {
  matcher: ['/user-panel'], // Specify routes to protect with middleware
};
