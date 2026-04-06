import mongoose, { Schema, model, models } from "mongoose";

const HeadingTextSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true,
    // 🚨 Ye line confirm karti hai ki Mongoose 'headings_text' table hi dekhe
   
  }
);

// FIX: models.headings_text check karo, warna model("headings_text", ...) banao
const HeadingText = models.heading_texts || model("heading_texts", HeadingTextSchema);

export default HeadingText;