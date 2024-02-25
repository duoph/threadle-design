import mongoose, { Mongoose, Schema } from "mongoose";

interface CartItemProps {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    userId: mongoose.Types.ObjectId;
    color?: string
    price: number
}

const cartItemSchema = new Schema<CartItemProps>({

})