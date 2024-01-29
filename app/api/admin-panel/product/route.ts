// import connectMongoDB from "@/libs/db";
// import { NextRequest, NextResponse } from "next/server";
// import { uploadFileToS3 } from "@/actions/awsS3Upload";
// import ProductModel from "@/models/productModel"; // Replace with the actual model

// export async function POST(req: NextRequest): Promise<NextResponse> {
//     try {
//         // Connect to MongoDB
//         connectMongoDB();

//         // Assuming you have a form data object in the request
//         const formData = await req.formData();

//         // Extract product data from the form data
//         const title = formData.get("title") as string;
//         const category = formData.get("category") as string;
//         const inStock = formData.get("inStock") as string;
//         // ... add more fields as needed

//         // Validate data (add more validation if needed)

//         // Upload cover image to S3
//         const coverImageFile = formData.get("coverImage") as File;
//         const coverImageBuffer = await coverImageFile.arrayBuffer();
//         const coverImageS3Response = await uploadFileToS3(coverImageBuffer, "cover-image.jpg");

//         // Upload more images to S3
//         const moreImagesFiles = formData.getAll("moreImages") as File[];
//         const moreImagesS3Responses = await Promise.all(
//             moreImagesFiles.map(async (file, index) => {
//                 const buffer = await file.arrayBuffer();
//                 return uploadFileToS3(buffer, `more-image-${index + 1}.jpg`);
//             })
//         );

//         // Save data to MongoDB
//         await ProductModel.create({
//             title,
//             category,
//             inStock,
//             coverImageURL: coverImageS3Response?.s3Url,
//             moreImagesURLs: moreImagesS3Responses.map((response) => response?.s3Url),
//         });

//         // Respond with success message
//         return NextResponse.json({ success: true, message: "Product added successfully" });
//     } catch (error) {
//         // Handle errors
//         console.error("Error adding product:", error);
//         return NextResponse.json({ success: false, message: "Failed to add product", error });
//     }
// }
