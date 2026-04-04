import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb"; // 🔥 MUST

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID required",
      });
    }

    const client = await clientPromise;
    const db = client.db("portfolio"); // 🔥 वही DB जो add में use की थी

    const result = await db.collection("headings_text").deleteOne({
      _id: new ObjectId(id), // 🔥 MOST IMPORTANT
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "Heading not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Heading deleted successfully",
    });

  } catch (error) {
    console.error("DELETE HEADING ERROR:", error); // 🔥 console check करो

    return NextResponse.json({
      success: false,
      message: "Server error",
    });
  }
}