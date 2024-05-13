import connectMongoDB from "@/libs/db";
import ProductModel from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";

// get all products from db
export async function GET(req: NextRequest) {
    try {

        connectMongoDB();

        const featuredProducts = await ProductModel.find({ isFeatured: true }).sort({ updatedAt: -1 })

        return NextResponse.json({ featuredProducts, success: true, message: "fetched featured products" });
    } catch (error) {
        console.error("error fetching all products:", error);
        return NextResponse.json({ message: "Error fetching featured products", success: false, error });
    }
}
