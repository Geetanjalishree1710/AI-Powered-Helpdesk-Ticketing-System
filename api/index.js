const app = require("../src/app");
const connectDB = require("../src/config/db");

let dbReady = false;

module.exports = async(req, res) => {
    try {
        if (!dbReady) {
            await connectDB();
            dbReady = true;
        }

        return app(req, res);
    } catch (error) {
        console.error("VERCEL_RUNTIME_ERROR:", error.message);
        return res.status(500).send("Server configuration error. Please check deployment environment variables.");
    }
};