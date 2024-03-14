import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {

        const { userId } = await getDataFromToken(req)

        if (!userId) {
            return NextResponse.json({ message: "User Id not found", success: false });
        }

        const user = await userModel.findById({ _id: userId }).populate('wishList')


        return NextResponse.json({ message: "Fetched user wishlist", success: true, user });

    } catch (error: any) {
        console.error('Error while fetching wishlist:', error);
        return NextResponse.json({ message: "Error while fetching wishlist", success: false, error: error.message });
    }
}