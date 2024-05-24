import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest, params: any) {

    try {

        connectMongoDB()

        const { userId } = await req.json()

        // const userId = params.userId;

        console.log(userId)

        if (!userId) {
            return NextResponse.json({ message: "error while fetching user orders no userID found", success: false })
        }

        const userOrders = await CartModel.find({ userId: userId, isPaid: true })


        return NextResponse.json({ message: "Fetched user orders", success: true, userOrders })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error while fetching user orders", success: false })
    }
}