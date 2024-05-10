import bcrypt from "bcrypt";
import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import userModel from '@/models/userModel';
import { sendOTP } from "@/actions/actionSMS";

export async function POST(req: NextRequest) {
    try {

        await connectMongoDB();

        const formData = await req.formData();
        const name = formData?.get("name") as string | undefined;
        const phone = formData?.get("phone") as string | undefined;
        const whatsApp = formData?.get("whatsApp") as string | undefined;
        const password = formData?.get("password") as string | undefined;

        const numberInUse = await userModel.findOne({ phone: phone });

        if (numberInUse) {
            return NextResponse.json({ message: "Phone is linked with another account", success: false });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password as string, 10);

        // Create a new user in the database
        const user = await userModel.create({
            name,
            phone: phone,
            password: hashedPassword,
            whatsAppNumber: whatsApp
        });

        // Return success response
        return NextResponse.json({ message: "Account created successfully", success: true, user });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Error while creating account", success: false });
    }
}
