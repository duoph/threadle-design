import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        return NextResponse.json(req.nextUrl.searchParams.get("categoryId"))
    } catch (error) {
        console.log(error)
    }
}
