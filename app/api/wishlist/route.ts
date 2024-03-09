import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { userId }: any = await getDataFromToken(req);

        const user = await userModel.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        await user.populate('wishList')

        const wishList = user.wishList || [];
        const wishListIds = user.wishList.map((item: any) => item._id);

        return NextResponse.json({ message: "Fetched user wishlist", success: true, wishList, wishListIds });
    } catch (error) {
        console.error('Error while fetching wishlist:', error);
        return NextResponse.json({ message: "Error while fetching wishlist", success: false });
    }
}
