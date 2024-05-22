import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";

import { NextResponse } from "next/server";


export async function GET() {
    try {

        connectMongoDB()

        const pendingOrders = await CartModel.aggregate([
            {
                $match: {
                    isPaid: true,
                    isShipped: false,
                    isDelivered: false,
                    isCancel: false
                }
            },
            {
                $sort: {
                    orderDate: -1,
                    userId: 1,
                }
            }
        ]);

        return NextResponse.json({
            message: "Fetched the pending orders",
            pendingOrders,
        }, {
            headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Error in fetching the shipped orders"));
    }
}
