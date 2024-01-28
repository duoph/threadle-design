import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        connectMongoDB()
        NextResponse.json("Hello")
    } catch (error) {
        return NextResponse.json({ message: "Error in creating a new admin", success: false, error })
    }
}

