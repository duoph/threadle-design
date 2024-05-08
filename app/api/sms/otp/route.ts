import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const { userId, otp } = await req.json();

        const user = await userModel.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found", success: false });
        }

        // Ensure that otp is converted to a number
        const otpNumber = parseInt(otp);

        // Check if otpNumber is NaN, indicating that it's not a valid number
        if (isNaN(otpNumber)) {
            return NextResponse.json({ message: "Invalid OTP format", success: false });
        }

        // Compare OTP values
        if (user.otp === otpNumber) {
            await userModel.findByIdAndUpdate(userId, { isNumberVerified: true, otp: null }, { new: true });
            return NextResponse.json({ message: "OTP verified successfully", success: true });
        }

        return NextResponse.json({ message: "Invalid OTP or OTP has expired", success: false });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ message: "Error in verifying OTP", success: false });
    }
}