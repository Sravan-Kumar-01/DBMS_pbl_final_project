import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: String,                // denormalized for convenience (optional)
  phone: String,               // denormalized
  service_id: Number,          // numeric id
  service_name: String,        // denormalized (optional; we also can join by service_id)
  car_model: String,
  latitude: String,
  longitude: String,
  booking_date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
