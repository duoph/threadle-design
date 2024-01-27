import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"


export async function POST(req: NextRequest) {
    try {
        const { email, password, } = await req.json()

        // check email already exisiting or not


        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)


        console.log(email, hashedPassword)
        connectMongoDB()
        return NextResponse.json({ hashedPassword, email })
    } catch (error) {
        return NextResponse.json({ message: "Error in creating a new admin", success: false })
    }

}

