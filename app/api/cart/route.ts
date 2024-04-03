import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

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
            userId, productId, price, quantity, size, color, imageURL, title, totalPrice
        })

        return NextResponse.json({ message: "Cart created successfully", success: true, cart })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error while creating cart", success: false, error })
    }
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = await getDataFromToken(req)

        if (!userId) {
            return NextResponse.json({ message: "UnAuthenticated Access Error while fetching the cart items", success: false })
        }

        const cartItems = await CartModel.find({ userId: userId })

        let message;

        if (cartItems.length === 0) {
            let message = "Your cart is empty"
        } else {
            let message = " fetched cart items"
        }

        return NextResponse.json({ message: message, success: true, cartItems })

    } catch {
        console.log(error)
        return NextResponse.json({ message: "Error while getting cart items ", success: false, error })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { userId } = await getDataFromToken(req)

        if (!userId) {
            return NextResponse.json({ message: "UnAuthenticated Access Error while fetching the cart items", success: false })
        }

        const cartItems = await CartModel.deleteMany({ userId: userId })

        return NextResponse.json({ message: "Deleted all cart items", success: true, cartItems })

    } catch {
        console.log(error)
        return NextResponse.json({ message: "Error while deleting all cart items ", success: false, error })
    }
}

