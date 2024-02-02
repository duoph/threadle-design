import userModel from '@/models/userModel';
import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Enter valid credentials', success: false });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'Check your email or password', success: false });
        }

        const passCompare = await bcrypt.compare(password, user.password);

        if (!passCompare) {
            return NextResponse.json({ message: 'Check your password', success: false });
        }

        const token = JWT.sign({ _id: user._id }, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '7d' });

        const userDetails = {
            token: token,
            name: user.name,
            userId: user._id,
            phone: user.phone,
            email: user.email,
            isAdmin: user.isAdmin,
        };


        console.log(user)


        const userMessage = user.isAdmin === true ? "Admin access granted" : "Logged in successfully"

        return NextResponse.json({ message: userMessage, success: true, userDetails });
    } catch (error) {
        return NextResponse.json({ message: 'Error in logging in', success: false, error });
    }
}