import { sendSMS } from "@/actions/actionSMS";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;


export async function GET() {

    try {
        connectMongoDB()
        const shippedOrders = await CartModel.find({ isPaid: true, isShipped: true, isDelivered: false })
        return NextResponse.json({ message: " fetched the shipped orders", shippedOrders });
    } catch (error) {
        console.error(error);
        return NextResponse.json(new Error("Error in fetching the shipped orders"));
    }
}


// mark as shipped
export async function POST(req: NextRequest) {
    try {
        connectMongoDB()

        const { cartId } = await req.json()

        if (!cartId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const cartItem = await CartModel.findByIdAndUpdate({ _id: cartId }, { isShipped: true, shippedDate: Date.now() }).sort({ orderedDate: -1 })

        sendSMS(cartItem.userId, `Threadle Designs: Your order "${cartItem?.title}" has been successfully shipped to your address. It will reach you within 2 days. Thank you for choosing Threadle Designs! `)


        return NextResponse.json({ message: "Marked all cart items as paid", success: true, cartItem });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while marking all cart items as paid", success: false, error });
    }
}


// cancel shipping
export async function PUT(req: NextRequest) {
    try {
        connectMongoDB()

        const { cartId } = await req.json()

        if (!cartId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const cartItem = await CartModel.findByIdAndUpdate({ _id: cartId }, { isShipped: false });

        return NextResponse.json({ message: "Marked all cart items as paid", success: true, cartItem });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while marking all cart items as paid", success: false, error });
    }
}

