
import connectMongoDB from '@/libs/db';
import ProductModel from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';



// fetchig  single product details

export async function GET({ params }: any) {
    try {
        connectMongoDB();

        const productId = params.singleProduct

        const product = await ProductModel.findOne({ _id: productId })

        return NextResponse.json({ product, message: "single Product Fetched", success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, message: "error while fetching single Product ", success: false })
    }
}


// deleting single product 

export async function DELETE(req: NextRequest, { params }: any) {

    try {
        connectMongoDB();

        const productId = params.singleProduct

        await ProductModel.findByIdAndDelete({ _id: productId })

        return NextResponse.json({ message: "Product deleted successfully", success: true })
    } catch (error) {
        return NextResponse.json({ message: "Error while deleting product", success: false })
    }
}