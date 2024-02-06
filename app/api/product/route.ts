import { uploadFileToS3 } from "@/actions/awsS3Upload";
import connectMongoDB from "@/libs/db";
import ProductModel from "@/models/productModel";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(req: NextRequest) {
    try {
        connectMongoDB();
        const formData = await req.formData();
        const title = formData.get("title");
        const desc = formData.get("desc");
        const regularPrice = formData.get("regularPrice");
        const category = formData.get("category");
        const file = formData.get("coverImage") as File;
        const image1 = formData.get("image1") as File;
        const image2 = formData.get("image2") as File;
        const image3 = formData.get("image3") as File;
        const image4 = formData.get("image4") as File;
        const salePrice = formData.get("salePrice") || undefined;

        let aws; // Declare aws variable outside the if block

        if (file instanceof Blob) {
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);
            aws = await uploadFileToS3(buffer, title as string);
        }


        const slugifyProductName = slugify(title as string, { lower: true });

        // const coverImageURL = await uploadFileToS3(coverImageBufferArray, slugifyProductName);

        const imageUrls = [];
        if (image1 instanceof File) {
            imageUrls.push(
                await uploadFileToS3(Buffer.from(await image1.arrayBuffer()), slugifyProductName + "-image1")
            );
        }
        if (image2 instanceof File) {
            imageUrls.push(
                await uploadFileToS3(Buffer.from(await image2.arrayBuffer()), slugifyProductName + "-image2")
            );
        }
        if (image3 instanceof File) {
            imageUrls.push(
                await uploadFileToS3(Buffer.from(await image3.arrayBuffer()), slugifyProductName + "-image3")
            );
        }
        if (image4 instanceof File) {
            imageUrls.push(
                await uploadFileToS3(Buffer.from(await image4.arrayBuffer()), slugifyProductName + "-image4")
            );
        }

        // Create a new product document
        await ProductModel.create({
            title,
            desc,
            regularPrice,
            coverImageURL: aws?.s3Url,
            salePrice,
            category,
            inStock: true,
            slugifyProductName,
            moreImagesURLs: imageUrls?.map((result: any) => result.s3Url),
        });

        return NextResponse.json({ message: "Product created successfully", success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unknown error", error });
    }
}




// get all products from db
export async function GET(request: NextRequest) {
    try {
        connectMongoDB();

        const tdProduct = await ProductModel.find({})

        return NextResponse.json({ tdProduct, success: true });
    } catch (error) {
        console.error("error fetching all products:", error);
        return NextResponse.json({ message: "Error fetching all categories", success: false, error });
    }
}