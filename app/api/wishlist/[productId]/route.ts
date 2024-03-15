import jwt from 'jsonwebtoken';
import { getDataFromToken } from "@/helpers/getDataFromToken";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from '@/libs/db';
import { AnyARecord } from 'dns';


// adding product to the wishlist


export async function POST(req: NextRequest, { params }: any) {
    try {
        await connectMongoDB();

        const { userId }: any = await getDataFromToken(req);

        const productId = params.productId;

        if (!userId) {
            return NextResponse.json({ message: "Token is missing or invalid", success: false });
        }

        // Find the user based on userId from the token
        const user = await userModel.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found", success: false });
        }

        // Update user's wishlist by adding productId to the array
        await userModel.findByIdAndUpdate(
            userId,
            { $addToSet: { wishList: productId } },
            { new: true }
        );

        return NextResponse.json({ message: "Product added to wishlist", success: true });
    } catch (error: any) {
        console.error("Error:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false, error: error.message });
    }
}


// Remove product from the wishlist

export async function PUT(req: NextRequest, { params }: any) {
    try {
        await connectMongoDB();

        const productId = params.productId;
        const { userId }: any = await getDataFromToken(req);

        console.log(userId)

        if (!userId) {
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
