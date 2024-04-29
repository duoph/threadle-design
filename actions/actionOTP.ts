import userModel from "@/models/userModel";
import twilio from "twilio";

const client = twilio(process.env.NEXT_PUBLIC_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);


export async function sendOTP(userId: string) {
    try {
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const expirationTime = new Date(Date.now() + 5 * 60 * 1000);

        const user = await userModel.findOneAndUpdate(
            { _id: userId },
            { otp: otpCode },
            { new: true, upsert: true }
        );

        const result = await client.messages.create({
            body: `Your Threadle Designs OTP code is: ${otpCode}`,
            from: "+14697950137",
            to: user.phone,
        });

        return { message: "OTP sent successfully", success: true };
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { message: "Error in sending OTP", success: false };
    }
}
