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


        const tokenData = {
            userId: user._id,
            phone: user.phone,
            email: user.email,
            isAdmin: user.isAdmin,
        }

        const token = JWT.sign(tokenData, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '3d' });

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

        const response = NextResponse.json({ message: "Logged In Succesfully", success: true, userDetails });

        response.cookies.set("token", token, { httpOnly: true })

        return response

    } catch (error) {
        return NextResponse.json({ message: 'Error in logging in', success: false, error });
    }
}