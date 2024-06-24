import { uploadFileToS3 } from "@/actions/awsS3Upload";
import connectMongoDB from "@/libs/db";
import ProductModel from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();

        const formData = await req.formData();
        const title = formData.get("title")?.toString() || '';
        const desc = formData.get("desc")?.toString() || '';
        const regularPrice = formData.get("regularPrice")?.toString() || '';
        const categoryId = formData.get("categoryId")?.toString() || '';
        const categoryName = formData.get("categoryName")?.toString() || '';
        const isCustom = formData.get("isCustom")?.toString() || 'false';
        const tags = formData.get("tags")?.toString() || '';
        const inStock = formData.get('inStock')?.toString() || 'no';
        const isFeatured = formData.get('isFeatured')?.toString() || 'no';
        const salePrice = formData.get("salePrice")?.toString() || undefined;
        const colorCodesString = formData.get("colorCodes")?.toString() || '';
        const colorCodes = colorCodesString.split(',');

        const file = formData.get("coverImage") as Blob;
        const imageBlobs: Blob[] = [
            formData.get("image1") as Blob,
            formData.get("image2") as Blob,
            formData.get("image3") as Blob,
            formData.get("image4") as Blob,
            formData.get("image5") as Blob,
            formData.get("image6") as Blob,
            formData.get("image7") as Blob,
            formData.get("image8") as Blob,
            formData.get("image9") as Blob,
            formData.get("image10") as Blob
        ];

        let aws;
        if (file instanceof Blob) {
            const fileBuffer = Buffer.from(await file.arrayBuffer());
            aws = await uploadFileToS3(fileBuffer, title);
        }

        const slugifyProductName = slugify(title, { lower: true });
        const imageUrls: string[] = [];

        for (let i = 0; i < imageBlobs.length; i++) {
            const imageBlob = imageBlobs[i];
            if (imageBlob instanceof Blob) {
                const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());
                const imageUrl = await uploadFileToS3(imageBuffer, `${slugifyProductName}-image${i + 1}`);
                if (imageUrl?.s3Url) {
                    imageUrls.push(imageUrl.s3Url);
                }
            }
        }

        await ProductModel.create({
            title,
            desc,
            regularPrice,
            coverImageURL: aws?.s3Url || undefined,
            salePrice,
            categoryId,
            categoryName,
            tags,
            isCustom: isCustom === "true",
            slugifyProductName,
            moreImagesURLs: imageUrls,
            colors: colorCodes,
            inStock: inStock === "yes",
            isFeatured: isFeatured === "yes"
        });

        return NextResponse.json({ message: "Product created successfully", success: true });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ message: "Unknown error", error, success: false });
    }
}



// get all products from db
export async function GET(req: NextRequest) {
    try {
        connectMongoDB();

        const tdProduct = await ProductModel.find({}).sort({ updatedAt: -1 })

        return NextResponse.json({ tdProduct, success: true });
    } catch (error) {
        console.error("error fetching all products:", error);
        return NextResponse.json({ message: "Error fetching all categories", success: false, error });
    }
}