import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectMongoDB();
        console.log('MongoDB connected');

        const pendinggOrders = await CartModel.aggregate([
            {
                $match: {
                    isPaid: true,
                    isShipped: false,
                    isDelivered: false,
                    isCancel: false,
                },
            },
            {
                $sort: {
                    orderDate: -1,
                },
            },
        ]);

        console.log('Pending orders fetched:', pendinggOrders);

        return NextResponse.json({
            message: "Fetched the pending orders",
            success: true,
            pendinggOrders,
        });

    } catch (error) {
        console.error('Error fetching pending orders:', error);
        return NextResponse.json({
            error: "Error in fetching the pending orders",
            success: false,
        }, {
            status: 500,
        });
    }
}
