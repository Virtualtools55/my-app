import dbConnect from "@/lib/db"; // Aapka mongoose connection helper
import WhoIAm from "@/model/WhoIAm_schema";    // Schema import
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. Database connection check
    await dbConnect();

    // 2. Fetch Latest Document
    // Mongoose mein direct model par query chalti hai
    const data = await WhoIAm.findOne().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: data || null,
    }, { status: 200 });

  } catch (error) {
    console.error("DB_ERROR:", error);
    return NextResponse.json({
      success: false,
      message: "Data fetch karne mein error aaya",
      error: error.message,
    }, { status: 500 });
  }
}