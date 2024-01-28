import connectMongoDB from "@/libs/db";
import CategoryModel from "@/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import { originalPathname } from "next/dist/build/templates/app-page";


// Assuming that you have AWS credentials and region set in environment variables
const region = process.env.NEXT_PUBLIC_AWS_S3_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
    throw new Error("AWS S3 credentials are missing.");
}

const s3ClientConfig: S3ClientConfig = {
    region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
};

const s3Client = new S3Client(s3ClientConfig);


function sanitizeFileName(originalFileName: string) {
    const sanitizedFileName = originalFileName.replace(/\s+/g, '-');
    const cleanedFileName = sanitizedFileName.replace(/[^a-zA-Z0-9-]/g, '');

    return cleanedFileName;
}

function generateUniqueFileName(originalFileName: string) {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(7);
    const sanitizedFileName = sanitizeFileName(originalFileName);
    const uniqueFileName = `${timestamp}_${randomString}_${sanitizedFileName}`;
    return uniqueFileName;
}


async function uploadFileToS3(file: Buffer, originalFileName: string) {
    try {
        const fileBuffer = file;
        const uniqueFileName = generateUniqueFileName(originalFileName);

        const params = {
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
            Key: `images/${uniqueFileName}`,
            Body: fileBuffer,
            ContentType: "image/jpg"
        };

        const command = new PutObjectCommand(params);

        await s3Client.send(command);

        const s3Url = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/images/${uniqueFileName}`;

        console.log(s3Url);

        return { fileName: uniqueFileName, s3Url };
    } catch (error) {
        console.log(error)
    }
}


export async function POST(request: NextRequest) {
    try {
        connectMongoDB();
        const formData = await request.formData();
        const title = formData.get("title");
        const file = formData.get("file");

        if (!file || !(file instanceof File)) {
            throw new Error("File is missing or invalid");
        }

        const fileBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(fileBuffer);

        const slugifyCategoryName = slugify(title as string, { lower: true });

        const aws = await uploadFileToS3(buffer, title as string);

        console.log(aws);

        // Ensure the uploadFileToS3 operation has completed before proceeding
        await CategoryModel.create({
            categoryName: title,
            slugifyName: slugifyCategoryName,
            imageURL: aws?.s3Url
        });

        console.log("Category created successfully");

        return NextResponse.json({ data: title, message: slugifyCategoryName });
    } catch (error) {
        console.error("Error creating new category:", error);
        return NextResponse.json({ message: "Error in creating new category", success: false, error });
    }
}