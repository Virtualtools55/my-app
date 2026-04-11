import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/model/Services_schema";

export async function DELETE(req) {
  try {
    await dbConnect();
    
    // URL se ID nikalna (e.g., /api/services/delete?id=123)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Service Node Destroyed" });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}