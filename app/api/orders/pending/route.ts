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

export async function POST(req: NextRequest) {
    try {

        const { cartId } = await req.json()

        if (!cartId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while marking is shipped", success: false });
        }

        const cartItem = await CartModel.findByIdAndUpdate({ _id: cartId }, { isShipped: true });

        return NextResponse.json({ message: "Marked as shipped", success: true, cartItem });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while marking is shipped", success: false, error });
    }
}