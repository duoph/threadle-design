import { getDataFromToken } from "@/helpers/getDataFromToken";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const pendingOrders = await CartModel.find({ isPaid: true, isShipped: false })
        
        if (pendingOrders) {

            return NextResponse.json({ message: " fetched the delivered orders", success: true, pendingOrders });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: " fetched the delivered orders", success: false });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { userId } = await getDataFromToken(req);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

        if (!userId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const cartItems = await CartModel.updateMany({ userId }, { isPaid: true, razorpay_order_id, razorpay_payment_id, razorpay_signature });

        return NextResponse.json({ message: "Marked all cart items as paid", success: true, cartItems });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while marking all cart items as paid", success: false, error });
    }
}