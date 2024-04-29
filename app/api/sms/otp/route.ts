import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const client = twilio(process.env.NEXT_PUBLIC_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);

export async function PUT(req: NextRequest) {
    try {
        const { phone } = await req.json();

        const existingUser = await userModel.findOne({ phone: phone });

        if (existingUser && existingUser.otp && existingUser.otpExpiration > new Date()) {
            const result = await client.messages.create({
                body: `Your Threadle Designs OTP code is: ${existingUser.otp}`,
                from: "+14697950137",
                to: phone,
            });

            return NextResponse.json({ result, expTime: existingUser.otpExpiration });
        } else {
            const otpCode = Math.floor(100000 + Math.random() * 900000);
            const expirationTime = new Date();
            expirationTime.setMinutes(expirationTime.getMinutes() + 5);

            const user = await userModel.findOneAndUpdate(
                { phone: phone },
                { otp: otpCode, otpExpiration: expirationTime },
                { new: true, upsert: true }
            );

            const result = await client.messages.create({
                body: `Your Threadle Designs OTP code is: ${otpCode}`,
                from: "+14697950137",
                to: phone,
            });

            return NextResponse.json({ result, expTime: user.otpExpiration });
        }
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json({ message: "Error in sending OTP", success: false });
    }
}



export async function POST(req: NextRequest) {
    try {
        const { phone, otp } = await req.json();

        const user = await userModel.findOne({ phone: phone });

        if (user && user.otp === otp && user.otpExpiration > new Date()) {

            return NextResponse.json({ message: "OTP verified successfully", success: true });
        } else {
            return NextResponse.json({ message: "Invalid OTP or OTP has expired" }, { status: 400 });
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ message: "Error in verifying OTP" }, { status: 500 });
    }
}
