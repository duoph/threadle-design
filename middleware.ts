import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname


    const token = request.cookies.get("token")?.value || ""
    const isAdmin = request.cookies.get("isAdmin")?.value || false



    if (path === "/") {
        if (token && isAdmin === "1") {
            return NextResponse.redirect(new URL('/admin-panel/orders', request.url))
        } else if (token && isAdmin === "0") {
            return NextResponse.redirect(new URL('/shop', request.url))
        }
    }




    if (path.startsWith("/admin-panel/")) {
        if (isAdmin === "0") {
            return NextResponse.redirect(new URL('/login', request.url))
        } else if (isAdmin === "1") {
            return NextResponse.redirect(new URL('/admin-panel/orders', request.url))
        } else {
            return NextResponse.redirect(new URL('/shop', request.url))
        }
    }



    if (path === "/cart") {

        if (token && isAdmin === "0") {

            return NextResponse.redirect(new URL('/cart', request.url))
        } else {
            return NextResponse.redirect(new URL('account/login', request.url))

        }

    }

    if (path === "/account/login" || path === "/account/create-account") {
        if (token && isAdmin === "0") {
            return NextResponse.redirect(new URL('/account/profile', request.url))
        } else if (token && isAdmin === "1") {
            return NextResponse.redirect(new URL('/admin-panel/orders', request.url))
        }
    }

}

export const config = {
    matcher: ['/admin-panel/:path*', '/account/[userId]', "/account/login", "/account/create-account", "/shop", "/cart", "/", "/account/forgot-password"]
}