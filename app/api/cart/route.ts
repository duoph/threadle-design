import { sendSMS } from "@/actions/actionSMS";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import userModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        connectMongoDB();

        const { userId } = await getDataFromToken(req);

        if (!userId) {
            return NextResponse.json({ message: "Login to use cart", success: false });
        }

        const { productId, price, quantity, size, color, imageURL, title } = await req.json();

        const user = await userModel.findById(userId)

        const totalPrice = quantity * price;


        let existingCartItem = await CartModel.findOne({ userId, productId, size, color, isPaid: false });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            existingCartItem.totalPrice += totalPrice;
            await existingCartItem.save();
            return NextResponse.json({ message: "Updated in cart", success: true, cart: existingCartItem });
        } else {
            // If not exists, create a new cart item
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
            });

            return NextResponse.json({ message: "Added to cart", success: true, cart });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while updating cart", success: false, error });
    }
}





export async function GET(req: NextRequest) {
    try {
        const { userId } = await getDataFromToken(req);

        if (!userId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const cartItems = await CartModel.find({ userId, isPaid: false });

        let message = cartItems.length === 0 ? "Your cart is empty" : "Fetched cart items";

        return NextResponse.json({ message, success: true, cartItems });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while getting cart items", success: false, error });
    }
}





export async function PUT(req: NextRequest) {
    try {
        const { userId } = await getDataFromToken(req);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

        if (!userId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const user = await userModel.findById(userId)


        const cartItem = await CartModel.updateMany({ isPaid: false }, {
            isPaid: true,
            customerName: user.name,
            orderedDate: new Date(),
            toAddress: user.address,
            pincode: user.pincode,
            phoneNumber: user.phone,
            whatsAppNumber: user.whatsAppNumber,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        });

        sendSMS(userId, "Threadles Designs : Your Order Have Been Placed Succesfully we will inform you when its shipped")


        return NextResponse.json({ message: "Marked all cart items as paid", success: true, cartItem });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while marking all cart items as paid", success: false, error });
    }
}