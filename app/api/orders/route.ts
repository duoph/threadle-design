import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextResponse } from "next/server";

export const revalidate = 1000

export async function GET() {
    try {
        await connectMongoDB();
        const orders = await CartModel.find();
        console.log('Orders fetched from DB:', orders);

        const response = NextResponse.json({ message: "Fetched all orders", orders });
        response.headers.set('Cache-Control', 'no-store');
        response.headers.set('Pragma', 'no-cache');
        return response;
    } catch (error) {
        console.error('Error in fetching all orders:', error);
        return NextResponse.json(new Error("Error in fetching all orders"));
    }
}
