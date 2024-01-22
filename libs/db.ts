import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        console.log(process.env.NEXT_PUBLIC_MONGO_URI)
        await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGO_URI}`);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.log(error);
    }
};

export default connectMongoDB;