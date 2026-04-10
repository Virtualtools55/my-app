import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import WhoIAm from "@/model/WhoIAm_schema";

export async function DELETE() {
  try {
    await dbConnect();

    // Saara data delete karne ke liye (kyoki ye single profile hai)
    await WhoIAm.deleteMany({}); 

    return NextResponse.json({ 
      success: true, 
      message: "Profile data deleted successfully" 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}