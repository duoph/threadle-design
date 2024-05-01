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


        let existingCartItem = await CartModel.findOne({ userId, productId, size, color });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            existingCartItem.totalPrice += totalPrice;
            await existingCartItem.save();
            return NextResponse.json({ message: "updated in cart", success: true, cart: existingCartItem });
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
                customerName: user.name,
                toAddress: user.address,
                phoneNumber: user.phone,
                whatsAppNumber: user.whatsAppNumber,
            });

            return NextResponse.json({ message: "Cart created successfully", success: true, cart });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while creating/updating cart", success: false, error });
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

        if (!userId) {
            return NextResponse.json({ message: "Unauthenticated Access Error while fetching the cart items", success: false });
        }

        const cartItems = await CartModel.updateMany({ userId }, { isPaid: true });

        return NextResponse.json({ message: "Marked all cart items as paid", success: true, cartItems });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error while marking all cart items as paid", success: false, error });
    }
}