const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.send("Name, email and password are required");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.send("User already exists with this email");
        }

        const safeRole = role === "admin" ? "admin" : "user";
        const hashed = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashed,
            role: safeRole
        });

        return res.redirect("/login");
    } catch (error) {
        console.error("REGISTER_ERROR:", error);
        return res.status(500).send("Could not register user");
    }
};

exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.send("Wrong password");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.cookie("token", token);

    if (user.role === "admin") {
        return res.redirect("/admin/panel");
    }

    return res.redirect("/user/panel");
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};