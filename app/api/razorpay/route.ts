import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {

    // change this 
    const instance = new Razorpay({
        key_id: "rzp_test_rCILEJykWqLnh9",
        key_secret: "tuYdxKs4AxtLli0RRCGn8A3R",
    });

    try {
        const { totalAmount }: any = await req.json()

        const payment_capture = 1;
        const currency = "INR";
        const options = {
            amount: totalAmount * 100,
            payment_capture,
            currency,
        };

        const order = await instance.orders.create(options);
        return NextResponse.json({ msg: "success", order });
    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Failed to create Razorpay order"));
    }
}

