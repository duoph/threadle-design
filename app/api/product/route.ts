import { uploadFileToS3 } from "@/actions/awsS3Upload";
import ProductModel from "@/models/productModel";
import { TIMEOUT } from "dns";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const title = formData.get("title");
        const desc = formData.get("desc");
        const regularPrice = formData.get("regularPrice");
        const category = formData.get("category");
        const coverImage = formData.get("coverImage") as File;
        const image1 = formData.get("image1") as File;
        const image2 = formData.get("image2") as File;
        const image3 = formData.get("image3") as File;
        const image4 = formData.get("image4") as File;
        const salePrice = formData.get("salePrice") || undefined;

        console.log(title, desc, regularPrice);

        if (!coverImage || !(coverImage instanceof File)) {
            throw new Error("Cover image is missing or invalid");
        }

        if (!title || !desc || !category || !coverImage) {
            throw new Error("Missing required fields");
        }

        const coverImageBuffer = await coverImage.arrayBuffer();
        const coverImageBufferArray = Buffer.from(coverImageBuffer);

        const slugifyProductName = slugify(title as string, { lower: true });

        const coverImageURL = await uploadFileToS3(coverImageBufferArray, slugifyProductName);



        const imageUrls = await Promise.all([
            uploadFileToS3(Buffer.from(await image1.arrayBuffer()), slugifyProductName + "-image1"),
            uploadFileToS3(Buffer.from(await image2.arrayBuffer()), slugifyProductName + "-image2"),
            uploadFileToS3(Buffer.from(await image3.arrayBuffer()), slugifyProductName + "-image3"),
            uploadFileToS3(Buffer.from(await image4.arrayBuffer()), slugifyProductName + "-image4"),
        ]);

        console.log(title, desc, regularPrice, coverImageURL, imageUrls, slugifyProductName);

        await ProductModel.create({
            title: title,
            desc: desc,
            regularPrice: regularPrice,
            coverImageURL: coverImageURL?.s3Url,
            salePrice: salePrice,
            category: category,
            slugifyProductName: slugifyProductName,
            inStock: true,
            moreImagesURLs: imageUrls.map((result: any) => result.s3Url),
        }, { TIMEOUT: 100000 });

        return NextResponse.json({ message: "Product created successfully", success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unknown error", error });
    }
}



// get all products from db

export async function GET() {

    try {
        const allProducts = await ProductModel.find({})
        return NextResponse.json({ allProducts, success: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }

}