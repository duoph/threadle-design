import userModel from "@/models/userModel";
import twilio from "twilio";

const client = twilio(process.env.NEXT_PUBLIC_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);


export async function sendOTP(userId: string) {
    try {

        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const expirationTime = new Date(Date.now() + 3 * 60 * 1000);

        const user = await userModel.findOneAndUpdate(
            { _id: userId },
            { $push: { otp: { code: otpCode, expires: expirationTime } } },
            { new: true, upsert: true }
        );

        const result = await client.messages.create({
            body: `Your Threadle Designs OTP code is: ${user.otp}`,
            from: "+14697950137",
            to: user.phone,
        });


    } catch (error) {
        console.error("Error sending OTP:", error);
        return console.log({ message: "Error in sending OTP", success: false });
    }
}


export async function verifyOTP(userId: any, otp: any) {
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return { message: "User not found", success: false };
        }

        const currentTimestamp = new Date();

        const matchingOTP = user.otp.find(({ otpObj }: any) => otpObj.code === otp && otpObj.expires > currentTimestamp);

        if (matchingOTP) {
            // Update isVerify field to true
            await userModel.findByIdAndUpdate(userId, { isVerify: true });

            return { message: "OTP verified successfully", success: true };
        } else {
            return { message: "Invalid OTP or OTP has expired", success: false };
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return { message: "Error in verifying OTP", success: false };
    }
}
