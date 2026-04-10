import mongoose from "mongoose";

// 🔹 Schema Definition
const WhoIAmSchema = new mongoose.Schema({
  title: String,
  description: String, // इसमें subtitle जाएगा
  experience: String,
  projects: Number,
  technologies: [
    { name: String, icon: String }
  ]
},                                                
  { 
    timestamps: true // Ye automatically createdAt aur updatedAt fields bana dega
  }
);

// 🔹 Model Export
// Agar model pehle se bana hai to wahi use hoga, nahi to naya banega
export default mongoose.models.whoiam_details || mongoose.model("whoiam_details", WhoIAmSchema);