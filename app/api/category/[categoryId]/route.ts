import connectMongoDB from '@/libs/db';
import CategoryModel from '@/models/categoryModel';
import ProductModel from '@/models/productModel';
import { NextPageContext } from 'next';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';

import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: any) {
    try {
        connectMongoDB()

        const categoryId = params.categoryId

        const products = await ProductModel.find({
            category: categoryId
        })
        return NextResponse.json({ products, message: "fetched all products", success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, success: false })

    }
}

export async function DELETE(req: NextRequest, { params }: any) {
    try {
        connectMongoDB()

        const categoryId = params.categoryId

        const category = await CategoryModel.findByIdAndDelete({ _id: categoryId })



        return NextResponse.json({ message: "Category deleted successfully", success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error, success: false })

    }
}