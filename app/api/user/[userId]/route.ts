import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import userModel from "@/models/userModel";
import { User } from "@/types";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: any) {
    try {

        const userId = params.userId

        const { name, email, phone, address, pincode, whatsAppNumber }: any = await req.json()


        console.log(name, email, phone, address, pincode)

        const phoneExist: any = await userModel.find({ phone: phone })

        console.log(phoneExist)

        if (phoneExist.phone && phoneExist._id !== userId) {
            return NextResponse.json({ message: "Phone already in use", success: false });
        }

        if (!userId) {
            console.log("user id not found")
            return NextResponse.json({ message: "User Id not found", success: false });
        }

        let user;

        if (name || email || phone || address || whatsAppNumber) {
            let user = await userModel.findByIdAndUpdate(
                { _id: userId },
                { name, email, phone: phone, address, pincode, whatsAppNumber: whatsAppNumber || phone },
                { new: true }
            );
            console.log("User updated successfully:", user);
        }

        return NextResponse.json({ message: "Profile updated successfully", success: true, user });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while updating profile", success: false });
    }
}


// get user through userId

export async function GET(req: NextRequest, { params }: any) {
    try {

        connectMongoDB();

        const userId = params.userId

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

