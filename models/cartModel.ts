import { Mongoose, Schema } from "mongoose";

interface CartProps {
    productId: string;
    quantity: number;
    userId: string;
}

const cartSchema = new Schema({
    
})