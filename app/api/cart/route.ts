import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
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
        const { userId } = await getDataFromToken(req);

        if (!userId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const cartItems = await CartModel.find({ userId, isPaid: false });

        let message = cartItems.length === 0 ? "Your cart is empty" : "Fetched cart items";

        return NextResponse.json({ message, success: true, cartItems });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while getting cart items", success: false, error });
    }
}


export async function PUT(req: NextRequest) {
    try {
        const { userId } = await getDataFromToken(req);

        if (!userId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const cartItems = await CartModel.updateMany({ userId }, { isPaid: true });

        return NextResponse.json({ message: "Marked all cart items as paid", success: true, cartItems });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while marking all cart items as paid", success: false, error });
    }
}