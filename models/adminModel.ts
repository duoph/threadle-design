import mongoose, { Schema, Document } from "mongoose";

interface AdminProps extends Document {
    email: string;
    password: string;
    name: string;
    createdAt: Date;
}

const AdminSchema = new Schema<AdminProps>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
}, { timestamps: true });


const AdminModel = mongoose.model('admin') || mongoose.model<AdminProps>('admin', AdminSchema);

export default AdminModel;