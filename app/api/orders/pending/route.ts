import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";

import { NextResponse } from "next/server";


export async function GET() {
    try {

        connectMongoDB()

        const pendingOrders = await CartModel.find({ isPaid: true, isShipped: false, isCancel: false })

        return NextResponse.json({
            message: "Fetched the pending orders",
            pendingOrders,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Error in fetching the shipped orders"));
    }
}
