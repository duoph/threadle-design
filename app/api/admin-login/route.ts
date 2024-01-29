import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import AdminModel from "@/models/adminModel";

export async function POST(req: NextRequest) {
    try {
        connectMongoDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Enter valid credentials", success: false });
        }

        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            return NextResponse.json({ message: "Check your email or password", success: false });
        }

        const passCompare = await bcrypt.compare(password, admin.password);

        if (!passCompare) {
            return NextResponse.json({ message: "Check your password", success: false });
        }

        const token = JWT.sign({ _id: admin._id }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '7d' });

        return NextResponse.json({ message: "Logged in successfully", success: true, data: { ...admin._doc, token } });
    } catch (error) {
        return NextResponse.json({ message: "Error in logging as an admin", success: false, error });
    }
}