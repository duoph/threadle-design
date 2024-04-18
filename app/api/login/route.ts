import userModel from '@/models/userModel';
import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { email, password } = await req.json();

        const lowerCaseEmail = email.toLowerCase()

        if (!email || !password) {
            return NextResponse.json({ message: 'Enter valid credentials', success: false });
        }

        const user = await userModel.findOne({ email: lowerCaseEmail });

        if (!user) {
            return NextResponse.json({ message: 'Check your email or password', success: false });
        }

        const passCompare = await bcrypt.compare(password, user.password);

        if (!passCompare) {
            return NextResponse.json({ message: 'Check your password', success: false });
        }


        const tokenData = {
            userId: user._id,
            phone: user.phone,
            email: user.email,
            isAdmin: user.isAdmin,
        }

        const token = JWT.sign(tokenData, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '7d' });

        const userDetails = {
            token: token,
            name: user.name,
            userId: user._id,
            phone: user.phone,
            email: user.email,
            address: user.address,
            isAdmin: user.isAdmin,
        };


        const userMessage = user.isAdmin === true ? "Admin access granted" : "Logged in successfully"

        const response = NextResponse.json({ message: userMessage, success: true, userDetails });

        response.cookies.set('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        });
        return response

    } catch (error) {
        return NextResponse.json({ message: 'Error in logging in', success: false, error });
    }
}