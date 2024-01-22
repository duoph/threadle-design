import connectMongoDB from "@/libs/db";
import { NextResponse } from "next/server";


export async function GET() {
    connectMongoDB()
    return NextResponse.json({ message: "Hello how are you" })

} 