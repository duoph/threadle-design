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
        const categoryId = formData.get("categoryId");
        const categoryName = formData.get("categoryName");
        const isCustom = formData.get("isCustom");
        const tags = formData.get("tags");
        const inStock = formData.get('inStock');
        const isFeatured = formData.get('isFeatured');
        const file = formData.get("coverImage") as Blob;
        const image1 = formData.get("image1") as Blob;
        const image2 = formData.get("image2") as Blob;
        const image3 = formData.get("image3") as Blob;
        const image4 = formData.get("image4") as Blob;
        const image5 = formData.get("image5") as Blob;
        const image6 = formData.get("image6") as Blob;
        const image7 = formData.get("image7") as Blob;
        const image8 = formData.get("image8") as Blob;
        const image9 = formData.get("image9") as Blob;
        const image10 = formData.get("image10") as Blob;

        const salePrice = formData.get("salePrice") || undefined;

        const colorCodesString: any = formData.get("colorCodes") || '';

        const colorCodes = colorCodesString.split(',');

        console.log(colorCodes)


        let aws;

        if (file instanceof Blob) {
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);
            aws = await uploadFileToS3(buffer, title as string);
        }

        const slugifyProductName = slugify(title as string, { lower: true });

        const imageUrls = [];

        const imageBlobs = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

        for (let i = 0; i < imageBlobs.length; i++) {
            const imageBlob = imageBlobs[i] as Blob;
            if (imageBlob instanceof Blob) {
                const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());
                const imageUrl: any = await uploadFileToS3(imageBuffer, `${slugifyProductName}-image${i + 1}`);
                imageUrls.push(imageUrl.s3Url);
            }
        }

        console.log("Image URLs:", imageUrls);


        await ProductModel.create({
            title,
            desc,
            regularPrice,
            coverImageURL: aws?.s3Url || undefined,
            salePrice,
            categoryId,
            categoryName,
            tags,
            isCustom: isCustom === "true" ? true : false,
            slugifyProductName,
            moreImagesURLs: imageUrls?.map((result: any) => result),
            colors: colorCodes || [],
            inStock: inStock === "yes" ? true : false,
            isFeatured: isFeatured === "yes" ? true : false
        });

        return NextResponse.json({ message: "Product created successfully", success: true });
    } catch (error) {
        console.error(error);
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