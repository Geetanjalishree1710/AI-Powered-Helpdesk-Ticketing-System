const jwt = require("jsonwebtoken");

// 🔐 Verify user login
exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.redirect("/login");
    }
};

// 🛡️ Check admin role
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.send("Access Denied");
    }
    next();
};