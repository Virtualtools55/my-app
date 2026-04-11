import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/model/Services_schema";

export async function GET() {
  try {
    await dbConnect();
    
    // Sabse latest services pehle dikhane ke liye sort kiya hai
    const services = await Service.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ 
      success: true, 
      data: services 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}