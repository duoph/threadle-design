import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getDataFromToken } from './helpers/getDataFromToken';

export async function middleware(request: NextRequest) {

    const path = await request.nextUrl.pathname


    const token = request.cookies.get("token")?.value || ""

    const data = getDataFromToken(request)


    console.log(token, data)

    if (path === "/shop") {
        return NextResponse.redirect(new URL('/admin-panel', request.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/admin-panel/:path*', '/account/[userId]', "/account/login", "/account/create-account", "/shop"]
}