import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {

        connectMongoDB()

        const { userId } = await getDataFromToken(req)

        const userOrders = await CartModel.find({ userId: userId })

        return NextResponse.json({ message: "Fetched user orders", success: true, userOrders })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error while fetching user orders", success: false })
    }
}