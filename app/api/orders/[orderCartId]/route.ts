import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest, { params }: any) {

    try {

        const orderCartId = params.orderCartId

        const orderItem = await CartModel.findById({ _id: orderCartId })

        if (!orderItem) {
            return NextResponse.json({ message: "error while getting ordered item", success: false })
        }

        return NextResponse.json({ message: "fetched order item", success: true, orderItem })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error while fetching order item ", success: false })
    }

}