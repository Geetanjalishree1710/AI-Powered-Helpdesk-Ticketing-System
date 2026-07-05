const mongoose = require("mongoose");

const connectDB = async() => {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not set. Please update your .env file.");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        if (error && error.code === "ENOTFOUND") {
            throw new Error("MongoDB host not found. Verify the Atlas cluster hostname in MONGO_URI.");
        }

        throw error;
    }
};

module.exports = connectDB;