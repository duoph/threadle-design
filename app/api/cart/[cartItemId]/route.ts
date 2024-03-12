import { getDataFromToken } from "@/helpers/getDataFromToken";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: any) {

    try {
        const { userId } = getDataFromToken(req)

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