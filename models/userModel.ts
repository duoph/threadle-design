import mongoose, { Schema, Document, models } from "mongoose";

interface userProps extends Document {
    email: string;
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
}

const userSchema = new Schema<userProps>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    whatsAppNumber: { type: Number },
    name: { type: String, required: true },
    phone: { type: Number },
    address: { type: String },
    isAdmin: { type: Boolean, default: false },
    numberVerified: { type: String },
    securityCode: { type: Number },
    wishList: [{ type: mongoose.Types.ObjectId, ref: "product" }]
}, { timestamps: true });


const userModel = models.user || mongoose.model<userProps>('user', userSchema);

export default userModel;