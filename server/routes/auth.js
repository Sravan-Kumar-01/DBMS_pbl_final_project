import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// seed admin if missing (called at server start)
export async function ensureAdmin() {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return;
  const exists = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!exists) {
    const hash = await User.hash(process.env.ADMIN_PASSWORD);
    await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      phone: "0000000000",
      password: hash,
      role: "admin"
    });
    console.log("👑 Admin created:", process.env.ADMIN_EMAIL);
  }
}

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    if (!name || !password || (!email && !phone)) {
      return res.status(400).json({ status: "error", message: "Missing fields" });
    }
    const hash = await User.hash(password);
    const user = await User.create({ name, email, phone, password: hash, role: "user" });
    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ status: "success", token, user: { name: user.name, role: user.role } });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    const query = email ? { email } : { phone };
    const user = await User.findOne(query);
    if (!user) return res.status(404).json({ status: "error", message: "User not found" });

    const ok = await user.comparePassword(password || "");
    if (!ok) return res.status(401).json({ status: "error", message: "Invalid credentials" });

    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ status: "success", token, user: { name: user.name, role: user.role } });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

export default router;
