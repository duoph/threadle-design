import { models } from 'mongoose';
import mongoose, { Document, Schema } from 'mongoose';

interface ProductDocument extends Document {
    title: string;
    desc: string
    categoryId: Schema.Types.ObjectId;
    inStock: boolean;
    coverImageURL: string | undefined;
    categoryName: string;
    isCustom: boolean;
    regularPrice: number | undefined;
    salePrice: number | undefined;
    slugifyProductName: string;
    moreImagesURLs: string[];
    isFeatured: boolean;
    colors: string;
    tags: string;

}

const productSchema = new Schema<ProductDocument>({
    title: { type: String, required: true },
    inStock: { type: Boolean, required: true },
    categoryId: { type: mongoose.Types.ObjectId, ref: 'category', required: true },
    categoryName: { type: String, required: true },
    desc: { type: String, required: true, default: "" },
    coverImageURL: { type: String || undefined, required: false },
    slugifyProductName: { type: String, required: true },
    isCustom: { type: Boolean },
    regularPrice: { type: Number || undefined },
    salePrice: { type: Number || undefined },
    moreImagesURLs: [{ type: String }],
    colors: [{ type: String }],
    tags: { type: String },
    isFeatured: { type: Boolean },
}, { timestamps: true });

const ProductModel = models.product || mongoose.model<ProductDocument>('product', productSchema);

export default ProductModel;
