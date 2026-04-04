import mongoose from "mongoose";

const headingSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Heading ||
  mongoose.model("Heading", headingSchema);