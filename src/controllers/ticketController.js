const Ticket = require("../models/Ticket");

exports.createTicket = async(req, res) => {
    try {
        const ticket = await Ticket.create({
            title: req.body.title,
            description: req.body.description,
            createdBy: req.user.id,
        });

        // If called from an HTML form, redirect to dashboard
        const isFormSubmission = req.is("application/x-www-form-urlencoded");
        if (isFormSubmission) {
            return res.redirect("/dashboard");
        }

        res.status(201).json({ message: "Ticket created", ticket });
    } catch (err) {
        console.error("CREATE_TICKET_ERROR:", err);
        res.status(500).json({ message: "Could not create ticket", error: err.message });
    }
};

exports.getAllTickets = async(req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (err) {
        console.error("GET_ALL_TICKETS_ERROR:", err);
        res.status(500).json({ message: "Could not fetch tickets", error: err.message });
    }
};

exports.getStats = async(req, res) => {
    try {
        const total = await Ticket.countDocuments();
        const open = await Ticket.countDocuments({ status: "Open" });
        const resolved = await Ticket.countDocuments({ status: "Resolved" });

        res.json({ total, open, resolved });
    } catch (err) {
        console.error("GET_STATS_ERROR:", err);
        res.status(500).json({ message: "Could not fetch stats", error: err.message });
    }
};

exports.resolveTicket = async(req, res) => {
    try {
        await Ticket.findByIdAndUpdate(req.params.id, { status: "Resolved" });

        const isFormSubmission = req.is("application/x-www-form-urlencoded");
        if (isFormSubmission) {
            return res.redirect("/tickets");
        }

        res.json({ message: "Ticket resolved" });
    } catch (err) {
        console.error("RESOLVE_TICKET_ERROR:", err);
        res.status(500).json({ message: "Could not resolve ticket", error: err.message });
    }
};