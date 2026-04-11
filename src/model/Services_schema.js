import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  points: [{ type: String }], // Charo points array mein jayenge
}, { timestamps: true });

export default mongoose.models.Services || mongoose.model("Services", ServiceSchema);