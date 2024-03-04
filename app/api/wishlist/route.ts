import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
    try {

        const tokenDecoded: any = getDataFromToken(req)

        const user = await userModel.findById({ _id: tokenDecoded._id })

        return NextResponse.json({ message: "Fetched user wishlist", success: true, wishlist: user.wishList })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Error while fetching wishlist", success: false })
    }
}