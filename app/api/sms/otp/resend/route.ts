import { sendOTP } from "@/actions/actionSMS";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await req.json();

        await sendOTP(userId);

        return NextResponse.json({ message: "OTP sent successfully", success: true });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json({ message: "Error in sending OTP", success: false });
    }
}