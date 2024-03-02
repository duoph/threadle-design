import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextRequest, NextResponse } from "next/server";

interface MyToken extends JwtPayload {
    _id: string; // Assuming _id is of type string
    // Add other properties if they exist in your token
}

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.headers.get("Authorization");
        const decodedToken = jwt.verify(token as string, process.env.NEXT_PUBLIC_JWT_SECRET as string) as MyToken;

        return decodedToken._id

    } catch (error) {
        console.error("Error decoding JWT token:", error);
    }
};

