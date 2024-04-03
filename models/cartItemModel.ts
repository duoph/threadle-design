import mongoose, { Schema, Document } from "mongoose";

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
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    isPaid: boolean;
    isShipped: boolean;
    isDelivered: boolean;
    address: string;
}

const cartItemSchema = new Schema<CartItemProps>({
    productId: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    address: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, required: true },
    color: { type: String, required: true },
    title: { type: String, required: true },
    size: { type: String, required: true },
    imageURL: { type: String || undefined, required: false },
    totalPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    razorpay_order_id: { type: String, required: false },
    razorpay_payment_id: { type: String, required: false },
    razorpay_signature: { type: String, required: false },
}, { timestamps: true });

const CartModel = mongoose.models.cart || mongoose.model<CartItemProps>('cart', cartItemSchema);

export default CartModel;