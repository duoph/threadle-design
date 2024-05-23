import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        connectMongoDB()
        const orders = await CartModel.find()
        return NextResponse.json({ message: " fetched all orders", orders });
    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Error in fetching all orders"));
    }
}
