import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; 
import Heading from "@/model/heading_text_schema";

export async function GET() {
  try {
    await dbConnect();

    // Latest data pehle laane ke liye sort use kiya hai
    const rows = await Heading.find({}).sort({ createdAt: -1 });

    console.log("Fetched Data Count:", rows.length); // Terminal mein check karein kitne aaye

    return NextResponse.json({
      success: true,
      headings: rows, // Isme _id aur text dono milenge
    }, { status: 200 });

  } catch (error) {
    console.error("FETCH_HEADINGS_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching headings", error: error.message },
      { status: 500 }
    );
  }
}