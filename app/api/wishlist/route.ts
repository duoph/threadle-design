import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {

        connectMongoDB()

        const { userId } = await getDataFromToken(req);

        const user: any = await userModel.find(userId).populate('wishList')

        if (!user) {
            throw new Error('User not found');
        }

        const wishList = user?.wishList || [];
        const wishListIds = user?.wishList?.map((item: any) => item._id);

        return NextResponse.json({ message: "Fetched user wishlist", success: true, wishList, wishListIds });
    } catch (error: any) {
        console.error('Error while fetching wishlist:', error);
        return NextResponse.json({ message: "Error while fetching wishlist", success: false, error: error.message });
    }
}
