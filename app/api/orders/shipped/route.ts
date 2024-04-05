import CartModel from "@/models/cartItemModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const deliveredOrders = await CartModel.find({ isPaid: true, isShipped: true, isDelivered: false })
        return NextResponse.json({ message: " fetched the delivered orders", deliveredOrders });

    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Error in fetching the delivered orders"));
    }
}