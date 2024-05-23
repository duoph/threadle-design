import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        const orders = await CartModel.find();
        console.log('Orders fetched from DB:', orders); // Logging for debugging

        const response = NextResponse.json({ message: "Fetched all orders", orders });
        response.headers.set('Cache-Control', 'no-store'); // Disable caching
        return response;
    } catch (error) {
        console.error('Error in fetching all orders:', error);
        return NextResponse.json(new Error("Error in fetching all orders"));
    }
}
