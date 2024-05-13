export interface Category {
    _id: string
    categoryName: string;
    imageURL?: string;
    slugifyName: string;
    name: string;
    UpdatedAt: Date;
    createdAt: Date;
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
    regularPrice: number | undefined;
    salePrice?: number | undefined;
    desc: string
    isCustom: boolean
    colors: string[]
    isFeatured: boolean;
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
    razorpay_order_id: string
    razorpay_payment_id: string
    razorpay_signature: string
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