import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Technology from "@/model/technology_schema";

export async function DELETE(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }

    await Technology.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}