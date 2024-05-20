import connectMongoDB from "@/libs/db";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: any) {
    try {
        connectMongoDB()

        const userId = params.userId;

        // Destructuring request body
        const { name, phone, address, pincode, whatsAppNumber }: any = await req.json();

        // Check if phone number already exists
        const phoneExist: any = await userModel.findOne({ phone: phone });

        console.log(phoneExist);

        // If phone number exists and belongs to the diff user
        if (phoneExist && phoneExist._id.toString() !== userId) {
            return NextResponse.json({ message: "Phone already in use", success: false });
        }

        // If userId is not provided
        if (!userId) {
            console.log("user id not found");
            return NextResponse.json({ message: "User Id not found", success: false });
        }

        // Update user profile if any of the fields are provided
        if (name || phone || address || whatsAppNumber) {
            // Using findOneAndUpdate instead of findByIdAndUpdate
            let user = await userModel.findOneAndUpdate(
                { _id: userId },
                { name, phone, address, pincode, whatsAppNumber: whatsAppNumber || phone },
                { new: true }
            );
            console.log("User updated successfully:", user);
        }

        return NextResponse.json({ message: "Profile updated successfully", success: true });
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

