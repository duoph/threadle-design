import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";



const instance = new Razorpay({
    key_id: "rzp_test_P87Egz0sqn2O7K",
    key_secret: process.env.RAZORPAY_API_SECRET,
});



export async function GET() {
    try {
        const payment_capture = 1;
        const amount = 1 * 100; // amount in paisa. In our case it's INR 1
        const currency = "INR";
        const options = {
            amount: amount.toString(),
            currency,
            payment_capture,
            notes: {
                paymentFor: "testingDemo",
                userId: "100",
                productId: 'P100'
            }
        };

        const order = await instance.orders.create(options);
        return NextResponse.json({ msg: "success", order });
    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Failed to create Razorpay order"));
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        return NextResponse.json({ msg: body });
    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Failed to parse request body"));
    }
}
