import mongoose from "mongoose";

const HeadingImageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: [true, "Image URL is mandatory"],
    },
    fileId: {
      type: String, 
      required: [true, "fileId is required for ImageKit"],
    },
    title: {
      type: String,
      default: "Untitled", // Agar title na mile toh ye save hoga
    },
  },
  { timestamps: true }
);

// Model export
export default mongoose.models.heading_images || mongoose.model("heading_images", HeadingImageSchema);