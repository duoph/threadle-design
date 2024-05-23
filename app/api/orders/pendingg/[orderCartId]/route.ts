import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: any) {
    try {

        connectMongoDB()

        const orderCartId = params.params.orderCartId

        const cartItem = await CartModel.findById({ _id: orderCartId })

        return NextResponse.json({ message: "cart item fetched", success: true, cartItem });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while getting cart item", success: false, error });
    }
}