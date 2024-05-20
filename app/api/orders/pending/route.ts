import { sendSMS } from "@/actions/actionSMS";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import connectMongoDB from "@/libs/db";
import CartModel from "@/models/cartItemModel";
import userModel from "@/models/userModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {

        connectMongoDB()

        const pendingOrders = await CartModel.find({ isPaid: true, isShipped: false, isDelivered: false, isCancel: false })

        if (pendingOrders) {

            return NextResponse.json({ message: " fetched the delivered orders", success: true, pendingOrders });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: " fetched the delivered orders", success: false });
    }
}




// this is not in use
// export async function POST(req: NextRequest) {
//     try {

//         connectMongoDB()

//         const { userId } = getDataFromToken(req)

//         const { cartId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

//         if (!cartId) {
//             return NextResponse.json({ message: "Unauthenticated Access Error while marking is shipped", success: false });
//         }

//         const user = await userModel.findById(userId)

//         const cartItem = await CartModel.updateMany({ isPaid: false }, {
//             isPaid: true,
//             customerName: user.name,
//             toAddress: user.address,
//             phoneNumber: user.phone,
//             whatsAppNumber: user.whatsAppNumber,
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature
//         });
//         return NextResponse.json({ message: "Marked as shipped", success: true, cartItem });
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ message: "Error while marking is shipped", success: false, error });
//     }
// }