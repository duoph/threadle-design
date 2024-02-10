import { models } from 'mongoose';
import mongoose, { Document, Schema } from 'mongoose';

interface ProductDocument extends Document {
    title: string;
    desc: string
    category: mongoose.Types.ObjectId;
    inStock: string;
    coverImageURL: string | undefined;
    isCustom: boolean;
    regularPrice: number;
    salePrice: number | undefined;
    slugifyProductName: string;
    moreImagesURLs: string[];
}

const productSchema = new Schema<ProductDocument>({
    title: { type: String, required: true },
    inStock: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'category', required: true },
    desc: { type: String, required: true },
    coverImageURL: { type: String || undefined, required: false },
    slugifyProductName: { type: String, required: true },
    isCustom: { type: Boolean },
    regularPrice: { type: Number },
    salePrice: { type: Number || undefined },
    moreImagesURLs: [{ type: String }],
}, { timestamps: true });

const ProductModel = models.product || mongoose.model<ProductDocument>('product', productSchema);

export default ProductModel;
