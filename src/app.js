require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

db();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "views");

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/ticketRoutes"));

// pages
app.get("/", (req, res) => res.redirect("/login"));
app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.render("register"));

// dashboard
app.get("/dashboard", async(req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect("/login");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Directly call the stats function instead of making HTTP request
        const Ticket = require("./models/Ticket");
        const total = await Ticket.countDocuments();
        const open = await Ticket.countDocuments({ status: "Open" });
        const resolved = await Ticket.countDocuments({ status: "Resolved" });
        const stats = { total, open, resolved };

        // Fetch recent tickets (limit to 6 for dashboard)
        const tickets = await Ticket.find().sort({ createdAt: -1 }).limit(6);

        console.log("STATS:", stats); // 👈 DEBUG

        res.render("dashboard", {
            user: decoded,
            stats: stats,
            tickets: tickets
        });

    } catch (err) {
        console.log("DASHBOARD ERROR:", err.message);

        res.render("dashboard", {
            user: { role: "user" },
            stats: { total: 0, open: 0, resolved: 0 },
            tickets: []
        });
    }
});

// tickets page
app.get("/tickets", async(req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect("/login");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const Ticket = require("./models/Ticket");
        const tickets = await Ticket.find();
        res.render("tickets", { tickets: tickets, user: decoded });
    } catch (err) {
        console.log("TICKETS ERROR:", err.message);
        res.render("tickets", { tickets: [], user: {} });
    }
});

app.get("/create-ticket", async(req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect("/login");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.render("createTicket", { user: decoded });
    } catch (err) {
        console.log("CREATE-TICKET PAGE ERROR:", err.message);
        res.redirect("/login");
    }
});

module.exports = app;