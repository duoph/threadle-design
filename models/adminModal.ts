import mongoose, { Schema, Document } from "mongoose";

interface AdminProps extends Document {
    email: string;
    password: string;
}

const AdminSchema = new Schema<AdminProps>({
    email: { type: String, required: true },
    password: { type: String, required: true },
});


const AdminModal = mongoose.model<AdminProps>('User', AdminSchema);

export default AdminModal;