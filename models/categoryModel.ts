import mongoose, { Schema, Document } from "mongoose";
import { models } from "mongoose";

interface CategoryProps extends Document {
    categoryName: string;
    imageURL: string | undefined;
    slugifyName: string;
    name: string;
    createdAt: Date;
}

const CategorySchema = new Schema<CategoryProps>({
    categoryName: { type: String, unique: true, required: true },
    slugifyName: { type: String, unique: true, required: true },
    imageURL: { type: String || undefined, required: false },
}, { timestamps: true });


const CategoryModel = models.category || mongoose.model<CategoryProps>('category', CategorySchema);

export default CategoryModel;