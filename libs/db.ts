import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const mongoURI = process.env.NEXT_PUBLIC_MONGO_URI;
        if (!mongoURI) {
            throw new Error("MongoDB URI is not provided. Please set NEXT_PUBLIC_MONGO_URI environment variable.");
        }

        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB.");
    } catch (error: any) {
        // Throw error for caller to handle
        throw new Error(`Error connecting to MongoDB: ${error.message}`);
    }
};

export default connectMongoDB;
