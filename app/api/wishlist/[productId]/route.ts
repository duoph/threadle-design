import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


// adding product to the wishlist

export async function GET(req: NextRequest, { params }: any) {
    try {
        const userId = getDataFromToken(req);
        const productId = params.productId;

        console.log(userId)

        if (!userId) {
            // Token is missing or invalid
            return NextResponse.json({ message: "Token is missing or invalid", success: false });
        }

        // Find the user based on userId from the token
        const user = await userModel.findById({ _id: userId });

        if (!user) {
            // User not found
            return NextResponse.json({ message: "User not found", success: false });
        }

        // Update user's wishlist by adding productId to the array
        await userModel.findByIdAndUpdate(user._id, { $addToSet: { wishList: productId } });

        return NextResponse.json({ message: "Product added to wishlist", success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false });
    }
}


// Remove product from the wishlist

export async function PUT(req: NextRequest, { params }: any) {
    try {
        const userId = getDataFromToken(req);
        const productId = params.productId;

        console.log(userId)

        if (!userId) {
            // Token is missing or invalid
            return NextResponse.json({ message: "Token is missing or invalid", success: false });
        }

        // Find the user based on userId from the token
        const user = await userModel.findById(userId);

        if (!user) {
            // User not found
            return NextResponse.json({ message: "User not found", success: false });
        }

        // Update user's wishlist by removing productId from the array
        await userModel.findByIdAndUpdate(userId, { $pull: { wishList: productId } });

        return NextResponse.json({ message: "Product removed from wishlist", success: true });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false });
    }
}
