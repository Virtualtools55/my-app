import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await connectDB();

    // Database से data fetch
    const [rows] = await db.execute("SELECT id, image_url FROM intro_images");

    // JSON response return
    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}