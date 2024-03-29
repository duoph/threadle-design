import mongoose, { Schema, Model, Document } from "mongoose";

interface CartItemProps extends Document {
    productId: Schema.Types.ObjectId;
    quantity: number;
    userId: Schema.Types.ObjectId;
    color?: string;
    price: number;
    title: string;
    size: string;
    totalPrice: number;
    imageURL: string | undefined;
}

const cartItemSchema = new Schema<CartItemProps>({
    productId: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    color: { type: String, required: true },
    title: { type: String, required: true },
    size: { type: String, required: true },
    imageURL: { type: String || undefined, required: false },
    totalPrice: { type: Number, required: true },
    price: { type: Number, required: true }
}, { timestamps: true });

const CartModel = mongoose.models.cart || mongoose.model<CartItemProps>('cart', cartItemSchema);

export default CartModel;