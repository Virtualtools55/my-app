import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Check if the model already exists to prevent re-compilation errors in Next.js
const Admin = mongoose.models.admin_details || mongoose.model("admin_details", AdminSchema, "admin_details");

export default Admin;