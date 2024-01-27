import mongoose, { Schema, Document } from "mongoose";

interface AdminProps extends Document {
    email: string;
    password: string;
}

const AdminSchema = new Schema<AdminProps>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});


const AdminModel = mongoose.model('admin') || mongoose.model<AdminProps>('admin', AdminSchema);

export default AdminModel;