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
}

const userSchema = new Schema<userProps>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String },
    isAdmin: { type: Boolean, default: false },
    numberVerified: { type: String },
    wishList: [{ type: mongoose.Types.ObjectId, ref: "product" }]
}, { timestamps: true });


const userModel = models.user || mongoose.model<userProps>('user', userSchema);

export default userModel;