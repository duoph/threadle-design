import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {
    try {
        connectMongoDB()

        const cancelOrders = await CartModel.find({ isCancel: true })
        return NextResponse.json({ message: " fetched the cancelled orders", cancelOrders });

    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Error in fetching the cancelled orders"));
    }
}

export async function POST(req: NextRequest) {
    try {
        connectMongoDB()

        const { cartId } = await req.json()

        if (!cartId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const cartItems = await CartModel.findByIdAndUpdate({ _id: cartId }, { isCancel: true, isDelivered: false, isPaid: false, isShipped: false });

        return NextResponse.json({ message: "Marked the product order as  cancelled", success: true, cartItems });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while marking order cancelled", success: false, error });
    }
}


export async function PUT(req: NextRequest) {
    try {

        const { cartId } = await req.json()

        if (!cartId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const cartItem = await CartModel.findByIdAndUpdate({ _id: cartId }, { isCancel: false });

        return NextResponse.json({ message: "Marked the product order as not cancelled", success: true, cartItem });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while marking order as not cancelled", success: false, error });
    }
}

