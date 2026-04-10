import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }, // Base64 or ImageKit URL
}, { timestamps: true });

export default mongoose.models.Technologys || mongoose.model("Technologys", TechnologySchema);