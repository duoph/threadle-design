import CartModel from "@/models/cartItemModel";

import { NextResponse } from "next/server";


export async function GET() {
    try {
        const pendingOrders = await CartModel.find({
            isPaid: true,
            isShipped: false,
            isDelivered: false,
            isCancel: false
        }).sort({ orderDate: -1 });

        return NextResponse.json({ message: "Fetched the shipped orders", pendingOrders });
    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Error in fetching the shipped orders"));
    }
}