import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const { userId, otp } = await req.json(); // Retrieve userId and otp from request body

        const user = await userModel.findById(userId);

        if (!user) {
            return { message: "User not found", success: false };
        }

        const currentTimestamp = new Date();

        const matchingOTP = user.otp.find(({ otpObj }: any) => otpObj.code === otp && otpObj.expires > currentTimestamp);

        if (matchingOTP) {
            // Update isVerify field to true
            await userModel.findByIdAndUpdate(userId, { isVerify: true });

            return NextResponse.json({ message: "OTP verified successfully", success: true });
        } else {
            return NextResponse.json({ message: "Invalid OTP or OTP has expired", success: false });
        }

        return NextResponse.json({ message: "Invalid OTP or OTP has expired", success: false });


    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { message: "Error in verifying OTP", success: false };
    }
}
