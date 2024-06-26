import userModel from "@/models/userModel";
import twilio from "twilio";



const client = twilio(process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);


export async function sendOTP(userId: string) {
    try {
        const otpCode = Math.floor(100000 + Math.random() * 900000);
        const otpExpire = new Date();
        otpExpire.setMinutes(otpExpire.getMinutes() + 10);

        const user = await userModel.findOneAndUpdate(
            { _id: userId },
            { otp: otpCode, otpExpire: otpExpire },
            { new: true, upsert: true }
        );

        await client.messages.create({
            body: `Your Threadle Designs OTP code is: ${otpCode}`,
            from: "+12183955775",
            to: `+91${user.phone}`,
        });

        return { message: "OTP sent successfully", success: true };
    } catch (error) {
        console.error("Error sending OTP:", error);
        return { message: "Error in sending OTP", success: false };
    }
}



export async function sendSMS(userId: string, message: string) {
    try {
        console.log(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

        const user = await userModel.findById(userId)

        await client.messages.create({
            body: message,
            from: "+12183955775",
            to: `+91${user.phone}`,
        });

        return { message: "SMS sent successfully", success: true };
    } catch (error) {
        console.error("Error sending SMS:", error);
        return { message: "Error in sending SMS", success: false };
    }
}
