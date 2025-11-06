import "dotenv/config.js";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Service from "../models/Service.js";

const core = [
  { service_id:101, service_name:"Periodic Car Service", price:1999 },
  { service_id:102, service_name:"Basic Service", price:1499 },
  { service_id:103, service_name:"Standard Service", price:2499 },
  { service_id:104, service_name:"Comprehensive Service", price:3999 },
  { service_id:201, service_name:"Engine Repair" },
  { service_id:202, service_name:"Clutch & Body Parts Repair" },
  { service_id:203, service_name:"Suspension Work" },
  { service_id:204, service_name:"Steering Repair" },
  { service_id:205, service_name:"Transmission / Gearbox Repair" },
  { service_id:206, service_name:"Brake Repair" },
  { service_id:301, service_name:"AC Service" },
  { service_id:302, service_name:"AC Gas Refill" },
  { service_id:303, service_name:"AC Filter Cleaning" },
  { service_id:304, service_name:"Cooling Coil Replacement" },
  { service_id:401, service_name:"Full Body Paint" },
  { service_id:402, service_name:"Panel Painting" },
  { service_id:403, service_name:"Bumper Paint" },
  { service_id:404, service_name:"Alloy Wheel Paint" },
  { service_id:405, service_name:"Car Wash" },
  { service_id:406, service_name:"Interior Vacuum Cleaning" },
  { service_id:407, service_name:"Exterior Rubbing & Polishing" },
  { service_id:408, service_name:"Interior Deep Cleaning" },
  { service_id:409, service_name:"Complete Detailing" }
];

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Service.deleteMany({});
    await Service.insertMany(core);
    console.log("✅ Services seeded");
    await mongoose.disconnect();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
