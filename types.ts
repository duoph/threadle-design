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
    tags: string;
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
    toAddress: string;
    imageURL: string
    userId: string;
    productId: string;
    customerName: string;
    size: string;
    isShipped: boolean;
    isPaid: boolean;
    isDelivered: boolean;
    price: number;
    totalPrice: number;
    title: string;
    pincode: number;
    phoneNumber: string;
    whatsAppNumber: string;
    quantity: number;
    deliverySlipURL: string;
    UpdatedAt: Date;
    createdAt: Date;
}


export interface User {
    __id: string;
    phone: number;
    whatsAppNumber: string;
    address?: string;
    name: string;
    pincode: number;
    wishListIds: [];
    createdAt: Date;
    UpdatedAt: Date;
}