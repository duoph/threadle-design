import userModel from '@/models/userModel';
import connectMongoDB from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { email, phone, password } = await req.json();

        // Check if email or phone and password are provided
        if ((!phone && !email) || !password) {
            return NextResponse.json({ message: 'Enter valid credentials', success: false });
        }

        let user;

        if (phone) {
            // Find user by phone
            user = await userModel.findOne({ phone: phone });
        } else if (email) {
            // Find user by email
            const lowerCaseEmail = email.toLowerCase();
            user = await userModel.findOne({ email: lowerCaseEmail });
        }

        // If user not found
        if (!user) {
            return NextResponse.json({ message: 'User not found', success: false });
        }

        // Compare passwords
        const passCompare = await bcrypt.compare(password, user.password);

        if (!passCompare) {
            return NextResponse.json({ message: 'Invalid password', success: false });
        }

        // Generate JWT token
        const tokenData = {
            userId: user._id,
            phone: user.phone,
            email: user.email,
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
            email: user.email,
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
