
import connectMongoDB from '@/libs/db';
import ProductModel from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';



// fetchig  single product details

export async function GET({ params }: any) {
    try {
        connectMongoDB();

        const productId = params.productId

        const product = await ProductModel.findOne({ _id: productId })

        return NextResponse.json({ product, message: "single Product Fetched", success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, message: "error while fetching Product ", success: false })
    }
}



// editing  product
export async function PUT(req: NextRequest, { params }: any) {
    try {
        connectMongoDB();

        const pid = params.productId;

        const formData = await req.formData();

        const title = formData.get('title');
        const desc = formData.get('desc');
        const salePrice = formData.get('salePrice') || undefined;
        const regularPrice = formData.get('regularPrice');
        const inStock = formData.get('inStock');

        // Update the product document
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            { _id: pid },
            {
                title: title,
                desc: desc,
                salePrice: salePrice,
                regularPrice: regularPrice,
                inStock: inStock,
            },
            { new: true }
        );

        return NextResponse.json({ message: "Product Updated", success: true, updatedProduct });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error while editing product", success: false });
    }
}




// deleting single product 

export async function DELETE(req: NextRequest, { params }: any) {

    try {
        connectMongoDB();

        const productId = params.productId

        await ProductModel.findByIdAndDelete({ _id: productId })

        return NextResponse.json({ message: "Product deleted successfully", success: true })
    } catch (error) {
        return NextResponse.json({ message: "Error while deleting product", success: false })
    }
}