import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGO) {
            console.log(process.env.MONGO);

            throw new Error('Mongo not defined in the environment variables.');
        }

        await mongoose.connect(process.env.MONGO);
        console.log('MongoDB connected...');
    } catch (error: any) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;