import userModel from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: any) {

    try {
        const productId = params.productId

        const addToWishList = await userModel.find

        return NextResponse.json(productId)
    } catch (error) {
        console.log(error)
    }


} 