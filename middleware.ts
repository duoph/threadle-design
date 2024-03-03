import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getDataFromToken } from './helpers/getDataFromToken';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname

    const token = request.cookies.get("token")?.value || ""
    const isAdmin = request.cookies.get("isAdmin")?.value || false

    console.log("This is the token data", isAdmin)

    const isPublicPath = path === "/account/login" || "/account/create-account"

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/account', request.url))
    }


    if (path.startsWith("/admin-panel/*path:") && isAdmin === false) {
        return NextResponse.redirect(new URL('/account', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin-panel/:path*', '/account/[userId]', "/account/login", "/account/create-account"]
}