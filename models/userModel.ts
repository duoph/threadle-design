import mongoose, { Schema, Document, models } from "mongoose";

interface userProps extends Document {
    password: string;
    name: string;
    address: string;
    phone: string;
    numberVerified: string;
    createdAt: Date;
    isAdmin: boolean;
    wishList: mongoose.Types.ObjectId[]
    securityCode: number;
    whatsAppNumber: string;
    otp: number;
    otpExpire: Date;
    pincode: number;
    isNumberVerified: boolean;
}

const userSchema = new Schema<userProps>({
    password: { type: String, required: true },
    whatsAppNumber: { type: String },
    name: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    isAdmin: { type: Boolean, default: false },
    numberVerified: { type: String },
    securityCode: { type: Number },
    pincode: { type: Number },
    isNumberVerified: { type: Boolean, default: false },
    otp: { type: Number, expires: 600000 },
    otpExpire: { type: Date },
    wishList: [{ type: mongoose.Types.ObjectId, ref: "product" }]
}, { timestamps: true });


const userModel = models.user || mongoose.model<userProps>('user', userSchema);

export default userModel;