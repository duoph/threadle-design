import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest, params: any) {
    try {

        connectMongoDB()

        const cartItemId = params.cartItemId

        const cartItem = await CartModel.findById({ _id: "6613031d1721033a28a5b7c7" })

        return NextResponse.json({ message: "cart item fetched", success: true, cartItem });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while getting cart item", success: false, error });
    }
}


export async function DELETE(req: NextRequest, { params }: any) {

    try {

        const cartItemId = params.cartItemId

        const cartItemDelete = await CartModel.findByIdAndDelete({ _id: cartItemId })

        if (!cartItemDelete) {
            return NextResponse.json({ message: "error while removing cart item", success: false })
        }

        return NextResponse.json({ message: "Item removed from cart ", success: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Item removed from cart ", success: true })
    }

}

export async function PUT(req: NextRequest, { params }: any) {

    try {

        const cartItemId = params.cartItemId
        const { quantity } = await req.json()


        const cart = await CartModel.findById({ _id: cartItemId })

        const totalPrice = quantity * cart.price


        const updateCart = await CartModel.findByIdAndUpdate({ _id: cartItemId }, { quantity, totalPrice }, { new: true })

        if (!updateCart) {
            return NextResponse.json({ message: "Cart not found to update", success: false, cart })
        }

        return NextResponse.json({ message: "Updated Quantity ", success: true })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error while updating cart item ", success: false, error })
    }
}