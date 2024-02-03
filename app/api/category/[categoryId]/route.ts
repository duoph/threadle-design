import connectMongoDB from '@/libs/db';
import CategoryModel from '@/models/categoryModel';
import ProductModel from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';



// getting all products based on its category

export async function GET(req: NextRequest, { params }: any) {
    try {
        connectMongoDB()

        const categoryId = params.categoryId


        const category = await CategoryModel.find({ _id: categoryId })

        const products = await ProductModel.find({
            category: categoryId
        })
        return NextResponse.json({ category, products, message: "fetched all products by category", success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, success: false })

    }
}



// deleting a category will also delete all its products


export async function DELETE(req: NextRequest, { params }: any) {
    try {
        connectMongoDB();

        const categoryId = params.categoryId;


        // set null calue to category ids without deleting products

        // const products = await ProductModel.updateMany(
        //     { category: categoryId },
        //     { $set: { category: null } }
        // );


        // delete all the products in the category

        await ProductModel.deleteMany({
            category: categoryId
        })

        // Delete the category
        const category = await CategoryModel.findByIdAndDelete(categoryId);

        if (!category) {
            return NextResponse.json({ message: 'Category not found', success: false });
        }

        return NextResponse.json({ message: 'Category deleted successfully', success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error', success: false });
    }
}


// edit category 
