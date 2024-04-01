import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";

function generateRandomCode(): string {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min + ''; // Convert to string
}

export async function POST(req: NextRequest) {
    try {
        const userId = getDataFromToken(req); // Assuming this retrieves user ID from token
        const user = await userModel.findById(userId); // Assuming you have a User model and findById function

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Generate a unique security code
        const securityCode = generateRandomCode(); // Generate a 6-digit random code

        // Save the security code in the user document in MongoDB
        user.securityCode = securityCode;
        await user.save();

        // Send the security code to the user via email or SMS (not implemented here)

        return NextResponse.json({ message: "Security code generated and sent to your email" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while generating security code", error }, { status: 500 });
    }
}
