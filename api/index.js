const app = require("../src/app");
const connectDB = require("../src/config/db");

let dbReady = false;

module.exports = async(req, res) => {
    try {
        if (!dbReady) {
            await connectDB();
            dbReady = true;
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is missing in Vercel environment variables");
        }

        if (!dbInitPromise) {
            dbInitPromise = connectDB();
        }

        await dbInitPromise;

        return app(req, res);
    } catch (error) {
        dbInitPromise = null;
        console.error("VERCEL_RUNTIME_ERROR:", error.message);
        const safeMessage = String(error && error.message ? error.message : "Unknown runtime error")
            .replace(/mongodb\+srv:\/\/[^\s]+/gi, "[REDACTED_MONGO_URI]")
            .slice(0, 220);

        return res.status(500).send(`Server configuration error: ${safeMessage}`);
    }
};