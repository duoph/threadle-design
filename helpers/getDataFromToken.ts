import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

export const getDataFromToken = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || ""
        console.log("this is the cookies", req.cookies.get("token")?.value)
        const decodedToken: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET!);

        return decodedToken;
    } catch (error) {
        console.error("Error decoding JWT token:", error);
        return null; // Return null or handle the error as appropriate in your application
    }
};