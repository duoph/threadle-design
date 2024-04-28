import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Initialize Twilio client with correct credentials
const client = twilio(process.env.NEXT_PUBLIC_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);

export async function GET(req: NextRequest) {
    try {
        const { phone } = await req.json();

        const otpCode = Math.floor(100000 + Math.random() * 900000);

        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 10); // Set expiration time to 10 minutes from now
        await userModel.findOneAndUpdate(
            { phone: phone },
            { otp: otpCode, otpExpiration: expirationTime },
            { new: true, upsert: true }
        );

        // Send the generated code via SMS
        const result = await client.messages.create({
            body: `Your OTP code is: ${otpCode}`,
            from: "+14697950137",
            to: phone,
        });

        return NextResponse.json({ result });

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
