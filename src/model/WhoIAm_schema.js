import mongoose from "mongoose";

// 🔹 Schema Definition
const WhoIAmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title zaroori hai"], // Validation
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description zaroori hai"],
    },
    imageUrl: {
      type: String,
      default: "", // Image ka URL yahan ayega
    },
    skills: {
      type: [String], // Array of strings (e.g. ["Next.js", "Tailwind"])
      default: [],
    },
  },
  { 
    timestamps: true // Ye automatically createdAt aur updatedAt fields bana dega
  }
);

// 🔹 Model Export
// Agar model pehle se bana hai to wahi use hoga, nahi to naya banega
export default mongoose.models.WhoIAm || mongoose.model("WhoIAm", WhoIAmSchema);