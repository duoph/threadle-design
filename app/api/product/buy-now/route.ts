import { sendSMS } from "@/actions/actionSMS";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        // Connect to MongoDB
        connectMongoDB();

        const { userId } = await getDataFromToken(req);

        if (!userId) {
            return NextResponse.json({ message: "Login to use cart", success: false });
        }

        const { productId, price, quantity, size, color, imageURL, title, razorpay_payment_id, razorpay_order_id, razorpay_signature } = await req.json();

        // Calculate total price
        const totalPrice = quantity * price;

        console.log(totalPrice);


        const user = await userModel.findById(userId)


        // Create cart item
        const cart = await CartModel.create({
            userId,
            productId,
            price,
            quantity,
            size,
            color,
            imageURL,
            title,
            totalPrice,
            isPaid: true,
            customerName: user.name,
            orderedDate: new Date(),
            toAddress: user.address,
            pincode: user.pincode,
            phoneNumber: user.phone,
            whatsAppNumber: user.whatsAppNumber,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature
        });

        sendSMS(userId, `Threadles Designs : Your Order of ${title} Have Been Placed Succesfully`)

        // Return success response
        return NextResponse.json({ message: "Product Ordered Successfully", success: true, cart: { _id: cart._id } });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while buying product", success: false, error });
    }
}
