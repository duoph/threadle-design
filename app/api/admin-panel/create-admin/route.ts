import connectMongoDB from "@/libs/db";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


// Creating a new admin 
export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();

        const { email } = await req.json();

        const checkEmailisAlreadyAdmin = await userModel.findOne({ email });

        if (checkEmailisAlreadyAdmin && checkEmailisAlreadyAdmin.isAdmin === true) {
            return NextResponse.json({
                message: `${email} is already an admin`,
                success: true
            });
        }

        await userModel.findOneAndUpdate(
            { email },
            { $set: { isAdmin: true } },
            { new: true }
        );

        return NextResponse.json({
            message: `${email} is admin now`,
            success: true
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "An error occurred while processing your request.",
            success: false,
            error
        });
    }
}