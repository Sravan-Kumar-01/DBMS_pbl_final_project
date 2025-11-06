import express from "express";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Service from "../models/Service.js";

const router = express.Router();

// POST /api/bookings   (from book.html)
router.post("/", async (req, res) => {
  try {
    const { name, phone, service_id, car_model, latitude, longitude, service_name } = req.body;
    if (!name || !phone || !service_id || !car_model) {
      return res.status(400).json({ status: "error", message: "Missing required fields" });
    }

    // find or create user by phone
    let user = await User.findOne({ phone });
    if (!user) {
      const hash = await User.hash(Math.random().toString(36).slice(2, 10)); // random password
      user = await User.create({ name, phone, password: hash, role: "user" });
    } else if (!user.name && name) {
      user.name = name;
      await user.save();
    }

    // lookup service name if not provided
    let svcName = service_name;
    if (!svcName) {
      const svc = await Service.findOne({ service_id: Number(service_id) });
      svcName = svc?.service_name || "";
    }

    const booking = await Booking.create({
      user_id: user._id,
      name,
      phone,
      service_id: Number(service_id),
      service_name: svcName,
      car_model,
      latitude,
      longitude
    });

    res.json({ status: "success", booking_id: booking._id });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message });
  }
});

// GET /api/bookings   (used by admin_dashboard)
router.get("/", async (req, res) => {
  const list = await Booking.find().sort({ booking_date: -1 });
  res.json(list);
});

export default router;
