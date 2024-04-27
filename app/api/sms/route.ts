import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";


const client = twilio("AC29990a0e90bbcfa4df6643ac542e2c4b", "e9761c1ad759c2d45044c797b756065b");

export async function POST(req: NextRequest) {
    try {
        const { phone, message } = await req.json();

        // const accountId = process.env.NEXT_PUBLIC_ACCOUNT_SID;
        // const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;


        const result = await client.messages.create({
            body: message,
            from: "+14697950137",
            to: phone,
        });

        return NextResponse.json({ result });

    } catch (error) {
        console.error("Error sending SMS:", error);
        return NextResponse.json({ message: "error in sms" });
    }
}