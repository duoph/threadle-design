import { uploadFileToS3 } from '@/actions/awsS3Upload';
import connectMongoDB from '@/libs/db';
import CategoryModel from '@/models/categoryModel';
import ProductModel from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';



// getting all products based on its category

export async function GET(req: NextRequest, { params }: any) {
    try {
        connectMongoDB()

        const categoryId = params.categoryId


        const category = await CategoryModel.findOne({ _id: categoryId })

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

export async function PUT(req: NextRequest, { params }: any) {
    try {
        connectMongoDB(); // Connect to MongoDB (Make sure you have a valid connection function)

        const categoryId = params.categoryId;

        const formdata = await req.formData();

        const title = formdata.get("title");
        const coverURL = formdata.get("imageURL");
        const file = formdata.get("file") as Blob || undefined;

        let imageUrl;

        if (file) { // Change from coverImage to file
            // If file is provided, upload and get the new imageUrl
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);
            const aws = await uploadFileToS3(buffer, title as string); // Assuming you have an upload function
            imageUrl = aws?.s3Url;
        } else {
            imageUrl = coverURL
        }


        const slugifyCategoryName = slugify(title as string, { lower: true });


        // Update the CategoryModel (Assuming you have a CategoryModel with a method like updateCategory)

        const updatedCategory = await CategoryModel.findByIdAndUpdate({ _id: categoryId }, { categoryName: title, slugifyName: slugifyCategoryName, imageURL: imageUrl }, { new: true });

        
        return NextResponse.json({ message: 'Category updated successfully', success: true, updatedCategory });


    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error', success: false });

    }
}