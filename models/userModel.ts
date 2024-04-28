import mongoose, { Schema, Document, models } from "mongoose";

interface userProps extends Document {
    password: string;
    name: string;
    address: string;
    phone: number;
    numberVerified: string;
    createdAt: Date;
    isAdmin: boolean;
    wishList: mongoose.Types.ObjectId[]
    securityCode: number;
    whatsAppNumber: number;
    otp: number;
    isNumberVerified: boolean;
}

const userSchema = new Schema<userProps>({
    password: { type: String, required: true },
    whatsAppNumber: { type: Number },
    name: { type: String, required: true },
    phone: { type: Number },
    address: { type: String },
    isAdmin: { type: Boolean, default: false },
    numberVerified: { type: String },
    securityCode: { type: Number },
    isNumberVerified: { type: Boolean, default: false },
    otp: { type: Number },
    wishList: [{ type: mongoose.Types.ObjectId, ref: "product" }]
}, { timestamps: true });


const userModel = models.user || mongoose.model<userProps>('user', userSchema);

export default userModel;