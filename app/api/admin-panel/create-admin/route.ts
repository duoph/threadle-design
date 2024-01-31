import connectMongoDB from "@/libs/db";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { findDOMNode } from "react-dom";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB(); // Make sure to await the connection

        const { email } = await req.json(); // Make sure to await the body parsing


        const checkEmailisAlreadyAdmin = await userModel.findOne({ email })

        if (checkEmailisAlreadyAdmin.isAdmin === true) {
            return NextResponse.json({
                message: `${email} is already an admin`, success: true
            });
        }

        await userModel.findOneAndUpdate({
            email, isAdmin: true
        })

        return NextResponse.json({
            message: `${email} is admin now`, success: true
        });

    } catch (error) {
        console.error(error); // Use console.error for logging errors
        return NextResponse.json({
            message: "An error occurred while processing your request.", success: false
        });
    }
}
