import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import userModel from "@/models/userModel";

function generateRandomCode(): string {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min + '';
}


export async function PUT(req: NextRequest) {
    try {
        const userId = getDataFromToken(req);
        const user = await userModel.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const securityCode = generateRandomCode();
        user.securityCode = securityCode;
        await user.save();


        return NextResponse.json({ message: "Security code generated and sent to your email" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while generating security code", error }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const userId = getDataFromToken(req);
        const user = await userModel.findById(userId);

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const securityCode = generateRandomCode();
        user.securityCode = securityCode;
        await user.save();


        return NextResponse.json({ message: "Security code generated and sent to your email" });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while generating security code", error }, { status: 500 });
    }
}
