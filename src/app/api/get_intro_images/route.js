import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import heading_images from "@/model/heading_image_schema";

export async function GET() {
  try {
    // 1. Database connection ensure karein
    await dbConnect();

    // 2. Saare documents fetch karein (Sorted by newest first optional)
    const images = await heading_images.find({}).sort({ createdAt: -1 });

    // 3. Agar data nahi milta
    if (!images || images.length === 0) {
      return NextResponse.json(
        { success: true, message: "No images found", data: [] },
        { status: 200 }
      );
    }

    // 4. Success Response
    return NextResponse.json(
      {
        success: true,
        count: images.length,
        data: images,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("GET_IMAGES_ERROR:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch images", 
        error: error.message 
      },
      { status: 500 }
    );
  }
}