const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/authMiddleware");

// HOME
router.get("/", (req, res) => {
  res.redirect("/login");
});

// LOGIN PAGE
router.get("/login", (req, res) => {
  res.render("login", {
    error: req.query.error,
    success: req.query.success
  });
});

// REGISTER PAGE
router.get("/register", (req, res) => {
  res.render("register", {
    error: req.query.error,
    success: req.query.success
  });
});

// DASHBOARD (PROTECTED)
router.get("/dashboard", auth, (req, res) => {
  res.render("dashboard", { user: req.user });
});

// REGISTER USER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // 🔴 Validation
  if (!name || !email || !password) {
    return res.redirect("/register?error=All fields are required");
  }

  if (password.length < 6) {
    return res.redirect("/register?error=Password must be at least 6 characters");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.redirect("/register?error=Email already registered");
  }

  const user = new User({ name, email, password });
  await user.save();

  res.redirect("/login?success=Registration successful. Please login.");
});

// LOGIN USER
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // 🔴 Validation
  if (!email || !password) {
    return res.redirect("/login?error=All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.redirect("/login?error=Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.redirect("/login?error=Invalid email or password");
  }

  // 🔐 JWT
  const token = jwt.sign(
    { id: user._id, role: user.role },
   process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.cookie("token", token, { httpOnly: true });
  res.redirect("/dashboard");
});

// LOGOUT
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login?success=Logged out successfully");
});

module.exports = router;
