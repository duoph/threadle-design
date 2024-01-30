import bcrypt from "bcrypt"
import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import userModel from '@/models/userModel';

export async function POST(req: NextRequest) {
    try {
        // Connect to MongoDB
        await connectMongoDB();
        // Extract title from formData
        const formData = await req.formData();
        const name = formData?.get("name") as string | undefined;
        const phone = formData?.get("phone") as string | undefined;
        const email = formData?.get("email") as string | undefined;
        const password = formData?.get("password") as string | undefined;

        const hashedPassword = await bcrypt.hash(password as string, 10)


        await userModel.create({
            name, phone, email, password: hashedPassword
        })

        return NextResponse.json({ message: "Account created succesfully", success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Error while creating account", success: false });
    }
}