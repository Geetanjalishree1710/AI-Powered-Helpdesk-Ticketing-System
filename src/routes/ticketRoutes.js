const express = require("express");
const router = express.Router();

// ✅ correct imports
const ctrl = require("../controllers/ticketController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

// routes
router.post("/tickets", auth.isAuthenticated, ctrl.createTicket);
router.get("/all-tickets", auth.isAuthenticated, ctrl.getAllTickets);
router.get("/admin/panel", auth.isAuthenticated, role("admin"), ctrl.getAdminPanelPage);
router.get("/user/panel", auth.isAuthenticated, ctrl.getUserPanelPage);
router.post("/admin/tickets/:id/status", auth.isAuthenticated, role("admin"), ctrl.updateTicketStatus);
router.get("/stats", auth.isAuthenticated, role("admin"), ctrl.getStats);
router.post("/tickets/resolve/:id", auth.isAuthenticated, role("admin"), ctrl.resolveTicket);

module.exports = router;