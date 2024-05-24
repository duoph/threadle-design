import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req: NextRequest) {
    try {
        await connectMongoDB();


        const pendingOrders = await CartModel.aggregate([
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
                    userId: 1,    
                    orderDate: -1,
                },
            },
        ]);


        return NextResponse.json({
            message: "Fetched the pending orders",
            success: true,
            pendingOrders,
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
