// 🛡️ Check role middleware
module.exports = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            if (req.accepts("html")) {
                return res.redirect("/dashboard");
            }

            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};