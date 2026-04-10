import dbConnect from "@/lib/db";
import Technology from "@/model/technology_schema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json(); // Admin panel se 'form.technologies' array aayega

    // Purana data delete karke naya daalna hai ya sirf add karna hai? 
    // Yahan hum naya data add kar rahe hain:
    const savedTechs = await Technology.create(body);

    return NextResponse.json({ 
      success: true, 
      message: "Technologies uploaded successfully!",
      data: savedTechs 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}