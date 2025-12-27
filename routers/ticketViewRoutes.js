
const router = require("express").Router();
const Ticket = require("../models/Ticket");
const User = require("../models/user");

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

// ================= ADMIN DASHBOARD =================
router.get("/admin", auth, admin, async (req, res) => {
  const total = await Ticket.countDocuments();
  const open = await Ticket.countDocuments({ status: "Open" });
  const inProgress = await Ticket.countDocuments({ status: "In Progress" });
  const resolved = await Ticket.countDocuments({ status: "Resolved" });
  const closed = await Ticket.countDocuments({ status: "Closed" });

  res.render("adminDashboard", {
    total,
    open,
    inProgress,
    resolved,
    closed
  });
});

// ================= ADMIN: VIEW & MANAGE TICKETS =================
router.get("/admin/tickets", auth, admin, async (req, res) => {
  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const tickets = await Ticket.find(filter)
    .populate("createdBy", "name email")
    .populate("assignedTo", "name email")
    .sort({ createdAt: -1 });

  const admins = await User.find({ role: "admin" });

  res.render("adminTickets", {
    tickets,
    admins,
    selectedStatus: req.query.status || ""
  });
});

// ================= ADMIN: ASSIGN TICKET =================
router.post("/admin/tickets/:id/update", auth, admin, async (req, res) => {
  const { status, assignedTo } = req.body;

  await Ticket.findByIdAndUpdate(req.params.id, {
    status,
    assignedTo: assignedTo || null
  });

  res.redirect("/admin/tickets");
});


// ================= USER: RAISE TICKET =================
router.get("/tickets/new", auth, (req, res) => {
  res.render("raiseTicket");
});

// ================= USER: CREATE TICKET =================
router.post("/tickets", auth, async (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !description) {
    return res.redirect("/tickets/new?error=All fields are required");
  }

  await Ticket.create({
    title,
    description,
    priority,
    createdBy: req.user.id
  });

  res.redirect("/my-tickets?success=Ticket raised successfully");
});

// ================= USER: MY TICKETS =================
router.get("/my-tickets", auth, async (req, res) => {
  const tickets = await Ticket.find({ createdBy: req.user.id })
    .populate("assignedTo", "name");

  res.render("myTickets", { tickets });
});

module.exports = router;
