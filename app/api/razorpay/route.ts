import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { nanoid } from 'nanoid';

export async function POST(req: NextRequest) {
    // Load Razorpay credentials from environment variables
    const key_id = process.env.RAZORPAY_KEY_ID as string;
    const key_secret = process.env.RAZORPAY_KEY_SECRET as string;

    if (!key_id || !key_secret) {
        return NextResponse.json({ error: "Razorpay credentials are not set" }, { status: 500 });
    }

    const instance = new Razorpay({
        key_id,
        key_secret,
    });

    try {
        const { totalAmount } = await req.json();

        if (typeof totalAmount !== 'number' || totalAmount <= 0) {
            return NextResponse.json({ error: "Invalid total amount" }, { status: 400 });
        }

        const payment_capture = 1;
        const currency = "INR";
        const customOrderId = nanoid(); // Generate a unique order ID

        const options = {
            amount: totalAmount * 100, // amount in smallest currency unit (paise)
            currency,
            payment_capture,
            receipt: customOrderId, // Using the custom order ID as the receipt ID
        };

        const order = await instance.orders.create(options);
        return NextResponse.json({ msg: "success", order });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create Razorpay order" }, { status: 500 });
    }
}




// export async function POST(req: NextRequest) {
//     try {
//         const body = await req.json();
//         return NextResponse.json({ msg: body });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json(new Error("Failed to parse request body"));
//     }
// }
