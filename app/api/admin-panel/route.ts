import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    try {
        return NextResponse.json("categoryId")
    } catch (error) {
        console.log(error)
        return NextResponse.json("categoryId")
    }
}
