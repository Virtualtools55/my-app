import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // Mongoose connection helper
import Heading from "@/model/heading_text_schema";    // Aapka Heading Schema

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "ID required",
      }, { status: 400 });
    }

    // 1. Database se connect karein
    await dbConnect();

    // 2. Mongoose ka findByIdAndDelete use karein
    // Ye method internally String ID ko ObjectId mein convert kar deta hai
    const deletedHeading = await Heading.findByIdAndDelete(id);

    if (!deletedHeading) {
      return NextResponse.json({
        success: false,
        message: "Heading not found",
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Heading deleted successfully from DB",
    });

  } catch (error) {
    console.error("DELETE HEADING ERROR:", error);

    return NextResponse.json({
      success: false,
      message: "Server error",
      error: error.message,
    }, { status: 500 });
  }
}