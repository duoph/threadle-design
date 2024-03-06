export interface Category {
    categoryName: string;
    imageURL: string;
    slugifyName: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    category: string;
    inStock: boolean;
    coverImageURL: string;
    moreImagesURLs: string[];
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    regularPrice: number;
    salePrice?: number;
    desc: string
}

export interface Category {
    _id: string
    categoryName: string;
    imageURLs?: string;
    slugifyName: string;
    name: string;
    createdAt: Date;
}