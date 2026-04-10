import dbConnect from "@/lib/db";
import Technology from "@/model/technology_schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // Saari technologies fetch karo (Latest pehle)
    const techs = await Technology.find().sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      data: techs 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}