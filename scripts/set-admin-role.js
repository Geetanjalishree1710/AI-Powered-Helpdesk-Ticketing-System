require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../src/models/User");

const targetEmail = process.argv[2];

if (!targetEmail) {
    console.error("Usage: node scripts/set-admin-role.js <email>");
    process.exit(1);
}

(async() => {
    await mongoose.connect(process.env.MONGO_URI);

    const result = await User.updateOne({ email: targetEmail }, { $set: { role: "admin" } });

    const updated = await User.findOne({ email: targetEmail }, { email: 1, role: 1, name: 1 }).lean();

    console.log({
        matched: result.matchedCount,
        modified: result.modifiedCount,
        updated,
    });

    await mongoose.disconnect();
})().catch(async(error) => {
    console.error(error.message);
    try {
        await mongoose.disconnect();
    } catch {
        // no-op
    }
    process.exit(1);
});