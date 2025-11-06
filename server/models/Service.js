import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  service_id: { type: Number, unique: true, required: true }, // keep your numeric IDs (101, 102, ...)
  service_name: { type: String, required: true },
  description: String,
  price: Number
}, { timestamps: true });

export default mongoose.model("Service", ServiceSchema);
