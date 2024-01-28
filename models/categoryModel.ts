import mongoose, { Schema, Document } from "mongoose";

interface CategoryProps extends Document {
    categoryName: string;
    imageURL: string;
    slugifyName: string;
    name: string;
    createdAt: Date;
}

const CategorySchema = new Schema<CategoryProps>({
    categoryName: { type: String, unique: true, required: true },
    slugifyName: { type: String, unique: true, required: true },
    imageURL: { type: String, required: true },
}, { timestamps: true });


const CategoryModel =  mongoose.model<CategoryProps>('category', CategorySchema);

export default CategoryModel;