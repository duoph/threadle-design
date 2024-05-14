import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";
import { sendSMS } from "@/actions/actionSMS";
import { differenceInMinutes } from "date-fns";

function generateRandomCode(): string {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min + '';
}



// sending otp
export async function GET(req: NextRequest, { params }: any) {
    try {
        const phone = params.phone;

        const user = await userModel.findOne({ phone: phone });

        if (user) {
            const otpCreateDate = user.otpCreatedDate;
            const currentTime = new Date();
            const minutesDifference = differenceInMinutes(currentTime, otpCreateDate);

            if (minutesDifference < 5) {
                const timeLeft = 5 - minutesDifference;
                return NextResponse.json({ message: `Please wait ${timeLeft} more minutes before requesting a new OTP`, success: true });
            }
        }

        const securityCode = generateRandomCode();

        await userModel.findOneAndUpdate(
            { phone: phone },
            { otp: securityCode, otpCreatedDate: Date.now() },
            { new: true }
        );

        sendSMS(user._id, "Threadle Designs: Your OTP Is " + securityCode);

        return NextResponse.json({ message: "OTP has been sent to your number", success: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while generating OTP", error }, { status: 500 });
    }
}


// otp verify
export async function POST(req: NextRequest, { params }: any) {
    try {
        const phone = params.phone;
        const { otp } = await req.json();

        const user = await userModel.findOne({ phone: phone });

        console.log(user)
        console.log(user.otp)
        console.log(otp)

        const otpCreateDate = user.otpCreatedDate;
        const currentTime = new Date();
        const minutesDifference = differenceInMinutes(currentTime, otpCreateDate);


        if (minutesDifference > 5) {
            return NextResponse.json({ message: "OTP Expired", success: false });
        }

        // Check if OTP exists and matches
        if (user.otp !== otp) {
            return NextResponse.json({ message: "Invalid OTP", success: false, user });
        }

        if (user.otp === otp && minutesDifference < 5) {
            return NextResponse.json({ message: "OTP verified successfully", success: true });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while verifying OTP", success: false });
    }
}



// change password
export async function PUT(req: NextRequest, { params }: any) {
    try {
        const phone = params.phone;
        const { password } = await req.json();

        const hashedPassword = await bcrypt.hash(password as string, 10);

        await userModel.findOneAndUpdate(
            { phone: phone },
            { password: hashedPassword },
            { new: true }
        );

        return NextResponse.json({
            message: "Password Updated", success: true
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while Password Updating", success: false });
    }

}

