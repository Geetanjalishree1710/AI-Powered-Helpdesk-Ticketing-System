const express = require("express");
const router = express.Router();

// ✅ correct imports
const ctrl = require("../controllers/ticketController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// routes
router.post("/tickets", auth.isAuthenticated, ctrl.createTicket);
router.get("/all-tickets", auth.isAuthenticated, ctrl.getAllTickets);
router.get("/stats", auth.isAuthenticated, role("admin"), ctrl.getStats);
router.post("/tickets/resolve/:id", auth.isAuthenticated, role("admin"), ctrl.resolveTicket);

module.exports = router;