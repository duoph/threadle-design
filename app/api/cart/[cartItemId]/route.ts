import { getDataFromToken } from "@/helpers/getDataFromToken";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";

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


         console.log(cartItemId)

        const cart = await CartModel.find({ _id: cartItemId })

        const updateCart = await CartModel.findByIdAndUpdate({ _id: cartItemId }, { quantity }, { new: true })

        if (!updateCart) {
            return NextResponse.json({ message: "Cart not found to update", success: false, cart })
        }

        return NextResponse.json({ message: "Updated Quantity ", success: true })


    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error while updating cart item ", success: false, error })
    }
}