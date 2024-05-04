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
    shippedDate: Date;
    toAddress: string;
    phoneNumber: string;
    whatsAppNumber: string;
    customerName: string;
    isCancel: boolean;
    deliverySlipURL: string;
    pincode: number;
}

const cartItemSchema = new Schema<CartItemProps>({
    productId: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    address: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, required: true },
    color: { type: String, required: true },
    title: { type: String, required: true },
    toAddress: { type: String, required: false },
    customerName: { type: String, required: false },
    size: { type: String, required: true },
    imageURL: { type: String || undefined, required: false },
    totalPrice: { type: Number, required: true },
    price: { type: Number, required: true },
    whatsAppNumber: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    orderedDate: { type: Date, required: false },
    shippedDate: { type: Date, required: false },
    isCancel: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false, required: true },
    isShipped: { type: Boolean, default: false, required: true },
    isDelivered: { type: Boolean, default: false, required: true },
    razorpay_order_id: { type: String, required: false, default: undefined },
    razorpay_payment_id: { type: String, required: false, default: undefined },
    razorpay_signature: { type: String, required: false, default: undefined },
    pincode: { type: Number },
    deliverySlipURL: { type: String || undefined, required: false }
}, { timestamps: true });

const CartModel = mongoose.models.cart || mongoose.model<CartItemProps>('cart', cartItemSchema);

export default CartModel;