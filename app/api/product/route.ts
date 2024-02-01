import { uploadFileToS3 } from "@/actions/awsS3Upload";
import ProductModel from "@/models/productModel";
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

        if (!coverImage || !(coverImage instanceof File)) {
            throw new Error("Cover image is missing or invalid");
        }

        const coverImageBuffer = await coverImage.arrayBuffer();
        const coverImageBufferArray = Buffer.from(coverImageBuffer);

        const slugifyProductName = slugify(title as string, { lower: true });

        // Upload cover image to S3
        const coverImageURL = await uploadFileToS3(coverImageBufferArray, slugifyProductName);

        // Upload additional images to S3
        const imageUrls = await Promise.all([
            uploadFileToS3(Buffer.from(await image1.arrayBuffer()), slugifyProductName + "-image1"),
            uploadFileToS3(Buffer.from(await image2.arrayBuffer()), slugifyProductName + "-image2"),
            uploadFileToS3(Buffer.from(await image3.arrayBuffer()), slugifyProductName + "-image3"),
            uploadFileToS3(Buffer.from(await image4.arrayBuffer()), slugifyProductName + "-image4"),
        ]);
        // Create a new product document
        const newProduct = await ProductModel.create({
            title,
            desc,
            regularPrice,
            coverImageURL: coverImageURL?.s3Url,
            salePrice,
            category,
            slugifyProductName,
            inStock: true,
            moreImagesURLs: imageUrls.map((result: any) => result.s3Url),
        });

        return NextResponse.json(newProduct.toJSON()); // You can customize the response as needed
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unknown error", error });
    }
}