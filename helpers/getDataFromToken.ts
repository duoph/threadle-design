import jwt from 'jsonwebtoken';
import { NextRequest } from "next/server";

export const getDataFromToken = async (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value

        const decodedToken = jwt.verify(token as string, process.env.NEXT_PUBLIC_JWT_SECRET!);

        return decodedToken;
    } catch (error) {
        console.error("Error decoding JWT token:", error);
        return null; // Return null or handle the error as appropriate in your application
    }
};