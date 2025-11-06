import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// GET /api/analytics/service-popularity
router.get("/service-popularity", async (req, res) => {
  const agg = await Booking.aggregate([
    { $group: { _id: { id: "$service_id", name: "$service_name" }, total: { $sum: 1 } } },
    { $project: { service_id: "$_id.id", service_name: "$_id.name", total: 1, _id: 0 } },
    { $sort: { total: -1 } }
  ]);
  res.json(agg);
});

// GET /api/analytics/car-models
router.get("/car-models", async (req, res) => {
  const agg = await Booking.aggregate([
    { $group: { _id: "$car_model", total: { $sum: 1 } } },
    { $project: { car_model: "$_id", total: 1, _id: 0 } },
    { $sort: { total: -1 } }
  ]);
  res.json(agg);
});

// GET /api/analytics/trend
router.get("/trend", async (req, res) => {
  const agg = await Booking.aggregate([
    { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$booking_date" } }, total: { $sum: 1 } } },
    { $project: { day: "$_id", total: 1, _id: 0 } },
    { $sort: { day: 1 } }
  ]);
  res.json(agg);
});

export default router;
