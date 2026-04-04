import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || !text.trim()) {
      return NextResponse.json({
        success: false,
        message: "Heading text is required",
      });
    }

    // 🔥 Mongo connect
    const client = await clientPromise;
    const db = client.db("portfolio"); // 👉 DB name change कर सकते हो

    const result = await db.collection("headings_text").insertOne({
      text: text.trim(),
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Server Error",
    });
  }
}