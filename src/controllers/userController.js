const User = require("../models/User");

exports.listUsersPage = async(req, res) => {
    try {
        const users = await User.find({}, { name: 1, email: 1, role: 1 }).sort({ createdAt: -1 });

        res.render("users", {
            user: req.user,
            users,
            message: req.query.message || "",
        });
    } catch (error) {
        console.error("LIST_USERS_PAGE_ERROR:", error);
        res.status(500).send("Could not load users page");
    }
};

exports.updateUserRole = async(req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        if (!["user", "admin"].includes(role)) {
            return res.redirect("/users?message=Invalid role selected");
        }

        await User.findByIdAndUpdate(id, { role });
        return res.redirect("/users?message=Role updated successfully");
    } catch (error) {
        console.error("UPDATE_USER_ROLE_ERROR:", error);
        return res.redirect("/users?message=Could not update role");
    }
};