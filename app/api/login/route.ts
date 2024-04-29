import userModel from '@/models/userModel';
import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import { sendOTP } from '@/actions/actionOTP';

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { phone, password } = await req.json();




        // Check if email or phone and password are provided
        if (!phone || !password) {
            return NextResponse.json({ message: 'Enter valid credentials', success: false });
        }



        const user = await userModel.findOne({ phone: "+91" + phone });

        if (!user) {
            return NextResponse.json({ message: 'User not found', success: false });
        }

        const passCompare = await bcrypt.compare(password, user.password);

        if (!passCompare) {
            return NextResponse.json({ message: 'Invalid password', success: false });
        }

        if (user.isNumberVerified === false) {
            sendOTP(user._id)
            return NextResponse.json({ message: 'User is not verified', isNumberVerified: false, userId: user._id });
        }

        // Generate JWT token
        const tokenData = {
            userId: user._id,
            phone: user.phone,
            isAdmin: user.isAdmin,
            isVeridied: user.isVerified,
        }

        const token = JWT.sign(tokenData, process.env.NEXT_PUBLIC_JWT_SECRET as string, { expiresIn: '7d' });

        // Prepare user details to send back
        const userDetails = {
            token: token,
            name: user.name,
            userId: user._id,
            phone: user.phone,
            address: user.address,
            isVeridied: user.isVerified,
            isAdmin: user.isAdmin,
        };

        const userMessage = user.isAdmin ? "Admin access granted" : "Logged in successfully";

        // Create response with user details
        const response = NextResponse.json({ message: userMessage, success: true, userDetails });

        // Set JWT token in cookie
        response.cookies.set('token', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        })
        response.cookies.set('isAdmin', user.isAdmin ? "1" : "0", {
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ message: 'Error in logging in', success: false, error: error.message });
    }
}
