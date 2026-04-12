import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // Aapki mongoose connection file
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || !text.trim()) {
      return NextResponse.json({
        success: false,
        message: "Heading text is required",
      }, { status: 400 });
    }

    // 1. 🔥 Mongoose se connect karein
    await dbConnect();

    // 2. Direct Collection use karein (Mongoose ke connection ke through)
    // Ye line client.db() ka sahi alternative hai Mongoose mein
    const db = mongoose.connection.db; 

    const result = await db.collection("heading_texts").insertOne({
      text: text.trim(),
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Heading added successfully",
      data: {
        _id: result.insertedId,
        text: text.trim()
      },
    });

  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({
      success: false,
      message: "Server Error",
      details: error.message
    }, { status: 500 });
  }
}