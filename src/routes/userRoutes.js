const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const ctrl = require("../controllers/userController");

router.get("/users", auth.isAuthenticated, role("admin"), ctrl.listUsersPage);
router.post("/users/:id/role", auth.isAuthenticated, role("admin"), ctrl.updateUserRole);

module.exports = router;