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
    _id: string;
    toAdress: string;
    imageURL: string
    userId: string;
    productId: string;
    size: string;
    isShipped: boolean;
    isPaid: boolean;
    isDelivered: boolean;
    price: number;
    totalPrice: number;
    title: string;
    phoneNumber: number;
    quantity: number;
    UpdatedAt: Date;
    createdAt: Date;
}


export interface User {
    __id: string;
    phone: number;
    whatsAppNumber: number;
    address?: string;
    name: string;
    wishListIds: [];
    createdAt: Date;
    UpdatedAt: Date;
}