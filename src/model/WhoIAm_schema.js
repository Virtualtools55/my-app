import mongoose from "mongoose";

// 🔹 Schema Definition
// model/WhoIAm_schema.js
const WhoIAmSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  experience: { type: String }, 
  projects: { type: String }, // Yeh String hona chahiye
  technologies: [{ name: String, icon: String }]
}, { timestamps: true });

// 🔹 Model Export
// Agar model pehle se bana hai to wahi use hoga, nahi to naya banega
export default mongoose.models.whoiam_details || mongoose.model("whoiam_details", WhoIAmSchema);