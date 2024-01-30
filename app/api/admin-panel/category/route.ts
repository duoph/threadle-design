import { uploadFileToS3 } from "@/actions/awsS3Upload";
import connectMongoDB from "@/libs/db";
import CategoryModel from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";



export async function POST(request: NextRequest) {
    try {
        console.error("1");
        connectMongoDB();
        const formData = await request.formData();
        const title = formData.get("title");
        const file = formData.get("file");


        console.error("2");
  


        if (!file || !(file instanceof File)) {
            throw new Error("File is missing or invalid");
        }
        console.error("3");

        const fileBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);
        console.error("4");


        const slugifyCategoryName = slugify(title as string, { lower: true });

        const aws = await uploadFileToS3(buffer, title as string);
        console.error("5");


        console.log(aws);
        console.error("6");

        await CategoryModel.create({
            categoryName: title,
            slugifyName: slugifyCategoryName,
            imageURL: aws?.s3Url
        });
        console.error("7");


        console.log("Category created successfully");

        return NextResponse.json({ data: title, message: slugifyCategoryName });
    } catch (error) {
        console.error("Error creating new category:", error);
        return NextResponse.json({ message: "Error in creating new category", success: false, error });
    }
}