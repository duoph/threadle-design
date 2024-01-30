import mongoose, { Schema, Document, models } from "mongoose";

interface userProps extends Document {
    email: string;
    password: string;
    name: string;
    address: string;
    phone: number;
    numberVerified: string;
    createdAt: Date;
}

const userSchema = new Schema<userProps>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    address: { type: String, required: false },
    numberVerified: { type: String }

}, { timestamps: true });


const userModel = models.user || mongoose.model<userProps>('user', userSchema);

export default userModel;