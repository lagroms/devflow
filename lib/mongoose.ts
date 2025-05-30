import mongoose, { Mongoose } from "mongoose";
import logger from "./logger";
import "@/database"; //LOADING ALL MODELS

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
}

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

declare global {
    var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Mongoose> => {
    if (cached.conn) {
        logger.info("MongoDB already connected");
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, { dbName: "devflow" })
            .then((result) => {
                logger.info("Connected to MongoDB");
                return result;
            })
            .catch((error) => {
                logger.error("Error connecting to MongoDB", error);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default dbConnect;
