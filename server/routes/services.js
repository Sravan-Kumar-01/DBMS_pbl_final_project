import express from "express";
import Service from "../models/Service.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// GET /api/services
router.get("/", async (req, res) => {
  const services = await Service.find().sort({ service_id: 1 });
  res.json(services);
});

// POST /api/services (admin only)
router.post("/", requireAuth, requireAdmin, async (req, res) => {
  try {
    const svc = await Service.create(req.body);
    res.json({ status: "success", service: svc });
  } catch (e) {
    res.status(400).json({ status: "error", message: e.message });
  }
});

export default router;
