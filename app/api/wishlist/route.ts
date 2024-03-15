import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    try {

        const { email } = await getDataFromToken(req)

        if (!email) {
            console.log("user id not found")
            return NextResponse.json({ message: "User Id not found", success: false });
        }

        const user = await userModel.findOne({ email: email }).populate('wishList');

        if (!user) {
            return NextResponse.json({ message: "User not found", success: false });
        }

        return NextResponse.json({ message: "Fetched user wishlist", success: true, user });

    } catch (error: any) {
        console.error('Error while fetching wishlist:', error);
        return NextResponse.json({ message: "Error while fetching wishlist", success: false, error: error.message });
    }
}
