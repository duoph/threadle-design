import CartModel from "@/models/cartItemModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const shippedOrders = await CartModel.find({ isPaid: true, isShipped: true, isDelivered: false })
        return NextResponse.json({ message: " fetched the delivered orders", shippedOrders });
    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Error in fetching the delivered orders"));
    }
}
 


export async function PUT(req: NextRequest) {
    try {
        const { userId } = await getDataFromToken(req);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

        console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature)

        if (!userId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const cartItems = await CartModel.updateMany({ userId }, { isShipped: true);

        return NextResponse.json({ message: "Marked all cart items as paid", success: true, cartItems });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while marking all cart items as paid", success: false, error });
    }
}

