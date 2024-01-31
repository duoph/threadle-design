export interface Category {
    categoryName: string;
    imageURL: string;
    slugifyName: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    categoryId: string;
    inStock: boolean;
    coverImageURL: string;
    moreImagesURLs: [];
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    regularPrice: number;
    salePrice?: number;
    desc: string
}