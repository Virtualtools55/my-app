import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  points: [
    { type: String }
  ], 
  bgImage: { 
    type: String // 👈 Yeh add karna zaroori tha image URL store karne ke liye
  }
}, { timestamps: true });

// Check karein ki model pehle se register toh nahi hai
const Service = mongoose.models.Services || mongoose.model("Services", ServiceSchema);
export default Service;