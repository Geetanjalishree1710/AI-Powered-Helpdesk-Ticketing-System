const mongoose = require("mongoose");

// Reuse connection across serverless invocations.
let cachedConnectionPromise = null;

const connectDB = async() => {
    let mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        if (process.env.NODE_ENV === 'production') {
            throw new Error("MONGO_URI is not set. Please update your .env file.");
        }

        console.warn("MONGO_URI is not set. Falling back to local MongoDB at mongodb://127.0.0.1:27017/helpdesk for development.");
        mongoUri = "mongodb://127.0.0.1:27017/helpdesk";
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (cachedConnectionPromise) {
        return cachedConnectionPromise;
    }

    try {
        cachedConnectionPromise = mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
            socketTimeoutMS: 10000,
            maxPoolSize: 10,
            minPoolSize: 1,
        });

        await cachedConnectionPromise;
        console.log("MongoDB Connected");
        return mongoose.connection;
    } catch (error) {
        cachedConnectionPromise = null;

        if (error && error.code === "ENOTFOUND") {
            throw new Error("MongoDB host not found. Verify the Atlas cluster hostname in MONGO_URI.");
        }

        if (error && error.name === "MongooseServerSelectionError") {
            throw new Error("MongoDB unreachable. Check Atlas Network Access and MONGO_URI credentials.");
        }

        throw error;
    }
};

module.exports = connectDB;