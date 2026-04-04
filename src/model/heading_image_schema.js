import mongoose from "mongoose";

const headingImageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  publicId: {
    type: String, // Cloudinary / ImageKit delete ke liye
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.HeadingImage || mongoose.model("HeadingImage", headingImageSchema);