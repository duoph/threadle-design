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