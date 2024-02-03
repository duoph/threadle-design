import connectMongoDB from "@/libs/db";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


interface updateProps {
    name: string;
    email: string;
    phone: number;
    address: string

}



export async function PUT(req: NextRequest, { params }: any) {

    try {

        connectMongoDB()

        const userId = params.userId
        const formData = await req.formData()

        const name = formData.get('name')
        const email = formData.get('email')
        const phone = formData.get('phone')
        const address = formData.get('address')


        if (name || email || phone || address) {

            const updatedUser = await userModel.findByIdAndUpdate(
                { _id: userId },
                {
                    name,
                    email,
                    phone,
                    address,
                },
                { new: true }
            );

            console.log("User updated successfully:", updatedUser);
        }

        return NextResponse.json({ message: "User updated successfully", success: true });

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Error while updating user", success: false });
    }
}


