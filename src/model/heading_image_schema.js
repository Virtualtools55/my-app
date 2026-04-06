import mongoose from "mongoose";

const HeadingImageSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    fileId: {
      type: String, // ImageKit ki unique file ID
      required: [true, "fileId is required to handle deletions"],
    },
    title: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.heading_images || mongoose.model("heading_images", HeadingImageSchema);