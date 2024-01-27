import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import AdminModel from "@/models/adminModel";


export async function POST(req: NextRequest) {
    try {
        connectMongoDB()
        const { email, password, name } = await req.json()
        if (!email || !password || !name) {
            return NextResponse.json({ message: "Enter valid credentials", success: false })
        }
        // check email already exisiting or not
        const emailExists = await AdminModel.findOne({ email });
        if (emailExists) {
            return NextResponse.json({ message: "Email already exists", success: false });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        await AdminModel.create({
            email, password: hashedPassword, name
        })
        return NextResponse.json({ message: "Admin account created succesfully", success: true })

    } catch (error) {
        return NextResponse.json({ message: "Error in creating a new admin", success: false, error })
    }
}

