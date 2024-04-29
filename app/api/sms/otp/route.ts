import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest) {
    try {
        const { userId, otp } = await req.json();

        const user = await userModel.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found", success: false });
        }

        if (user.otp === otp) {
            return NextResponse.json({ message: "Invalid OTP or OTP has expired", success: false });
        }


        await userModel.findByIdAndUpdate(userId, { isNumberVerified: true, otp: null });

        return NextResponse.json({ message: "OTP verified successfully", success: true });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ message: "Error in verifying OTP", success: false });
    }
}
