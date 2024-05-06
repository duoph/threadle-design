import { uploadFileToS3 } from "@/actions/awsS3Upload";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: any) {
    try {
        connectMongoDB();

        const orderCartId = params.orderCartId;

        const formdata = await req.formData();

        const file = formdata.get("file") as Blob || undefined;
        const title = formdata.get("title");

        let imageUrl;

        if (file) {
            const fileBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(fileBuffer);
            const aws = await uploadFileToS3(buffer, title as string);
            imageUrl = aws?.s3Url;
        }

        const updateOrder = await CartModel.findByIdAndUpdate(orderCartId, {
            deliverySlipURL: imageUrl
        }, { new: true });

        return NextResponse.json({ message: 'Image uploaded to cloud successfully', success: true, updateOrder });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error', success: false, message: error.message });
    }
}



// this is deleting the delivery slip image from the db

export async function DELETE(req: NextRequest, { params }: any) {
    try {
        const orderCartId = params.orderCartId;

        const deleteDeliverySlipURL = await CartModel.findByIdAndUpdate(orderCartId, {
            deliverySlipURL: null
        }, { new: true });
        return NextResponse.json({ message: 'Image Deleted', success: true, deleteDeliverySlipURL });
    } catch (error) {
        return NextResponse.json({ message: 'Error while deleting image', success: false });
    }
}