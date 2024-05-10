import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

// Initialize Twilio client with correct credentials
const client = twilio(process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID, process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN);

export async function POST(req: NextRequest) {
    try {
        const { phone, message } = await req.json();

        const result = await client.messages.create({
            body: message,
            from: "+12183955775",
            to: phone,
        });

        return NextResponse.json({ result });

    } catch (error) {
        console.error("Error sending SMS:", error);
        return NextResponse.json({ message: "Error in sending SMS" });
    }
}
