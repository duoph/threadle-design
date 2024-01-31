import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        connectMongoDB()

        const { email } = req.json()

        return NextResponse.json({
            message: `This is the email you sented to us,:${email}`
        })

    } catch (error) {
        console.log(error)
    }
}

