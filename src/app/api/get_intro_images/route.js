import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    // DB Connection
    const client = await clientPromise;
    const db = client.db("portfolio");

    // Database से data fetch
    const rows = await db
      .collection("heading_images")
      .find({})
      .toArray();

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