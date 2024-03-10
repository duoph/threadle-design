import { getDataFromToken } from "@/helpers/getDataFromToken";
import CartModel from "@/models/cartItemModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: any) {
    try {

        const { userId } = await getDataFromToken(req)

        if (!userId) {
            return NextResponse.json({ message: "UnAuthenticated Access Error", success: false })
        }

        const { productId, price, quantity, size, color } = await req.json()

        const cart = await CartModel.create({
            userId, productId, price, quantity, size, color
        })

        return NextResponse.json({ message: "Cart created successfully", success: true, cart })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error while creating cart", success: false, error })
    }
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = getDataFromToken(req)

        if (!userId) {
            return NextResponse.json({ message: "UnAuthenticated Access Error while fetching the cart items", success: false })
        }

        const cartItems = await CartModel.find({ userId })

        return NextResponse.json({ message: "Error while getting cart items", success: true, cartItems })

    } catch {
        console.log(error)
        return NextResponse.json({ message: "Error while getting cart items ", success: false, error })
    }
}
