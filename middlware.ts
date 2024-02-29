import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    console.log("Middleware Executed");

    // Uncomment this line if you want to redirect
    // return NextResponse.redirect(new URL('/home', req.url));
}
export const config = {
    matcher: '/shop',
  }