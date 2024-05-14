import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import { sendSMS } from "@/actions/actionSMS";
import { differenceInMinutes } from "date-fns";

function generateRandomCode(): string {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min + '';
}


export async function GET(req: NextRequest, { params }: any) {
    try {
        const phone = params.phone;

        const securityCode = generateRandomCode();

        const user = await userModel.findOneAndUpdate(
            { phone: phone },
            { otp: securityCode, otpCreatedDate: Date.now() },
            { new: true }
        );

        sendSMS(user._id, "Threadle Designs: Your OTP Is " + securityCode);

        if (!user) {
            return NextResponse.json({ message: "Account not found", success: false });
        }

        return NextResponse.json({ message: "OTP has been sent to your number", success: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while generating OTP", error }, { status: 500 });
    }
}


export async function PUT(req: NextRequest, { params, body }: any) {
    try {
        const phone = params.phone;
        const otp = body.otp;

        const user = await userModel.findOne({ phone: phone });

        if (!user) {
            return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
        }

        // Check if OTP exists and matches
        if (user.otp !== otp) {
            return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
        }

        // Check if OTP is expired (more than 5 minutes old)
        const otpCreateDate = user.otpCreateDate;
        const currentTime = new Date();
        const minutesDifference = differenceInMinutes(currentTime, otpCreateDate);

        if (minutesDifference > 5) {
            return NextResponse.json({ message: "Expired OTP" }, { status: 400 });
        }

        // Here you can add additional logic to handle successful OTP verification,
        // such as resetting the OTP or updating other user data.

        return NextResponse.json({ message: "OTP verified successfully" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while verifying OTP", error }, { status: 500 });
    }
}
