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
    isCustom: boolean
    colors: string[]
}

export interface Category {
    _id: string
    categoryName: string;
    imageURLs?: string;
    slugifyName: string;
    name: string;
    UpdatedAt: Date;
    createdAt: Date;
}

export interface Cart {
    _id: string
    userId: string;
    productId: string;
    size: string;
    price: number;
    totalPrice: number;
    title: string;
    quantity: number;
    UpdatedAt: Date;
    createdAt: Date;
}


export interface User {
    __id: string;
    email: string;
    phone: number;
    address?: string;
    name: string;
    wishListIds: [];
    createdAt: Date;
    UpdatedAt: Date;
}