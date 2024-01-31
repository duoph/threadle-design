import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        return NextResponse.json("Message")
    } catch (error) {
        console.log(error)
    }
}