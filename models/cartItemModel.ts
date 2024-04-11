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
    orderedDate: Date;
    toAddress: string;
}

const cartItemSchema = new Schema<CartItemProps>({
    productId: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    address: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, required: true },
    color: { type: String, required: true },
    title: { type: String, required: true },
    toAddress: { type: String, required: true },
    size: { type: String, required: true },
    imageURL: { type: String || undefined, required: false },
    totalPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    orderedDate: { type: Date, required: false },
    isPaid: { type: Boolean, default: false, required: true },
    isShipped: { type: Boolean, default: false, required: true },
    isDelivered: { type: Boolean, default: false, required: true },
    razorpay_order_id: { type: String, required: false, default: undefined },
    razorpay_payment_id: { type: String, required: false, default: undefined },
    razorpay_signature: { type: String, required: false, default: undefined },
}, { timestamps: true });

const CartModel = mongoose.models.cart || mongoose.model<CartItemProps>('cart', cartItemSchema);

export default CartModel;