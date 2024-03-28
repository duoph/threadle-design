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

        const madeAdmin = await userModel.findOneAndUpdate(
            { email },
            { $set: { isAdmin: true } },
            { new: true }
        );


        if (madeAdmin) {
            return NextResponse.json({
                message: `${email} is admin now`,
                success: true
            });
        }

        return NextResponse.json({
            message: `error unable to create admin`,
            success: false
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


// get admin acc's

export async function GET(req: NextRequest) {
    try {
        connectMongoDB()
        const admins = await userModel.find({ isAdmin: true })
        return NextResponse.json({ message: "fetched all admins", success: true, admins })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "error while fetching admins", success: false })
    }
}