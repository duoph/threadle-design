import { getDataFromToken } from "@/helpers/getDataFromToken"
import connectMongoDB from "@/libs/db"
import CartModel from "@/models/cartItemModel"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {

        connectMongoDB()

        const { userId } = await getDataFromToken(req)

        if (!userId) {
            return NextResponse.json({ message: "Login to use cart", success: false })
        }

        const { productId, price, quantity, size, color, imageURL, title } = await req.json()

        const totalPrice = await quantity * price

        console.log(totalPrice)

        const cart = await CartModel.create({
            userId, productId, price, quantity, size, color, imageURL, title, totalPrice, isPaid: true
        })

        return NextResponse.json({ message: "Product Ordered Successfully", success: true, cart })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error while buying product", success: false, error })
    }
}