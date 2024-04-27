import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname


    const token = request.cookies.get("token")?.value || ""
    const isAdmin = request.cookies.get("isAdmin")?.value || false



    if (path === "/") {
        if (token && isAdmin === "1") {
            return NextResponse.redirect(new URL('/admin-panel/orders', request.url))
        } else if (token) {
            return NextResponse.redirect(new URL('/shop', request.url))
        }
    }

    if (path.startsWith("/admin-panel/")) {
        console.log("Requested path:", path);
        console.log("isAdmin status:", isAdmin);
        if (isAdmin === false) {
            console.log("User is not admin. Redirecting...");
            const redirectUrl = new URL('/pagenotfound', request.url);
            console.log("Redirecting to:", redirectUrl.href);
            return NextResponse.redirect(redirectUrl);
        }
    }


    if (path === "/cart") {

        if (token) {

            return NextResponse.redirect(new URL('/cart', request.url))
        } else {
            return NextResponse.redirect(new URL('account/login', request.url))

        }

    }

}

export const config = {
    matcher: ['/admin-panel/:path*', '/account/[userId]', "/account/login", "/account/create-account", "/shop", "/cart", "/"]
}