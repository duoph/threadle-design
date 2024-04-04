import CartModel from '@/models/cartItemModel';
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const orders = await CartModel.find({ isPaid: true, isShipped: false });

        return NextResponse.json({ message: "FETCHED ALL ORDERED PRODUCTS", orders });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unknown error", error });
    }
}
