import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";







export async function GET() {
    const instance = new Razorpay({
        key_id: "rzp_test_P87Egz0sqn2O7K",
        key_secret: "vvTFUjAryByN3Z6vKdXlNayM",
    });
    try {
        const payment_capture = 1;
        const amount = 1 * 100; // amount in paisa. In our case it's INR 1
        const currency = "INR";
        const options = {
            amount: amount.toString(),
            currency,
            payment_capture
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
