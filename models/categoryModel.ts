import mongoose, { Schema, Document } from "mongoose";

interface CategoryProps extends Document {
    categoryName: string;
    imageURL: string;
    name: string;
    createdAt: Date;
}

const CategorySchema = new Schema<CategoryProps>({
    categoryName: { type: String, unique: true, required: true },
    imageURL: { type: String, required: true },
}, { timestamps: true });


const CategoryModel = mongoose.model('admin') || mongoose.model<CategoryProps>('admin', CategorySchema);

export default CategoryModel;