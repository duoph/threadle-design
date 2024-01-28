import mongoose, { Schema, Document, models } from "mongoose";

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


const AdminModel = models.admin || mongoose.model<AdminProps>('admin', AdminSchema);

export default AdminModel;