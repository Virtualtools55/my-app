import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  let db;

  try {
    // 1️⃣ Body parse
    const body = await req.json();
    const { text } = body;

    // 2️⃣ Validation
    if (!text || text.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Heading text is required" },
        { status: 400 }
      );
    }

    // 3️⃣ DB Connection
    db = await connectDB();

    // 4️⃣ Insert Query
    const [result] = await db.execute(
      "INSERT INTO intro_headings (text) VALUES (?)",
      [text]
    );

    // 5️⃣ Inserted Data Return
    return NextResponse.json(
      {
        success: true,
        message: "Heading added successfully",
        data: {
          id: result.insertId,
          text: text
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Add Heading Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error",
        error: error.message
      },
      { status: 500 }
    );

  } finally {
    if (db) await db.end(); // 6️⃣ Close connection
  }
}