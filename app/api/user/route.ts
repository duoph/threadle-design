import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: any) {
    try {
        connectMongoDB();

        const { userId } = getDataFromToken(req);

        if (!userId) {
            console.log("user id not found")
            return NextResponse.json({ message: "User Id not found", success: false });
        }

        const { name, email, phone, address }: any = req.body; // Assuming you're using Next.js 12+ or using body-parser middleware

        if (name || email || phone || address) {
            const user = await userModel.findByIdAndUpdate(
                { _id: userId },
                { name, email, phone, address },
                { new: true }
            );
            console.log("User updated successfully:", user);
        }

        return NextResponse.json({ message: "User updated successfully", success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while updating user", success: false });
    }
}


// get user through userId

export async function GET(req: NextRequest, { params }: any) {
    try {
        connectMongoDB();

        const { userId } = getDataFromToken(req);

        if (!userId) {
            console.log("user id not found")
            return NextResponse.json({ message: "User Id not found", success: false });
        }

        const user = await userModel.findById(userId);

        return NextResponse.json(user);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error while getting user' });
    }
}

