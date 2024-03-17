import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: any) {
    try {

        const userId = params.userId

        const { name, email, phone, address }: any = await req.json()


        console.log(name, email, phone, address)

        if (!userId) {
            console.log("user id not found")
            return NextResponse.json({ message: "User Id not found", success: false });
        }

        let user;

        if (name || email || phone || address) {
            let user = await userModel.findByIdAndUpdate(
                { _id: userId },
                { name, email, phone, address },
                { new: true }
            );
            console.log("User updated successfully:", user);
        }

        return NextResponse.json({ message: "User updated successfully", success: true, user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while updating user", success: false });
    }
}


// get user through userId

export async function GEt(req: NextRequest, { params }: any) {
    try {
        connectMongoDB();

        const { userId } = getDataFromToken(req);

        if (!userId) {
            console.log("user id not found")
            return NextResponse.json({ message: "User Id not found", success: false });
        }

        const user = await userModel.findById(userId);

        return NextResponse.json({ message: "User found", success: true, user });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error while getting user' });
    }
}

