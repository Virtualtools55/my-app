import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    // DB Connection
    const client = await clientPromise;
    const db = client.db("portfolio");

    // Headings Fetch (MongoDB)
    const rows = await db
      .collection("headings_text")
      .find({})
      .sort({ _id: -1 }) // latest first (id DESC जैसा)
      .toArray();

    return NextResponse.json({
      success: true,
      headings: rows,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching headings",
      },
      { status: 500 }
    );
  }
}