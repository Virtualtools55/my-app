import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Admin from "@/model/authentication_schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // JWT import karein

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "सारे field जरूरी हैं" },
        { status: 400 }
      );
    }

    await dbConnect();

    // 2. User check
    const user = await Admin.findOne({ email });
    const genericError = "ईमेल या पासवर्ड गलत है";

    if (!user) {
      return NextResponse.json({ success: false, message: genericError }, { status: 401 });
    }

    // 3. Password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: genericError }, { status: 401 });
    }

    // 4. 🔥 JWT Token Generate Karein
    // Ensure karein ki aapne .env mein JWT_SECRET set kiya hai
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_secret_key", 
      { expiresIn: "1h" }
    );

    // 5. Success response
    const response = NextResponse.json({
      success: true,
      message: "सफलतापूर्वक लॉगिन हुआ",
    });

    // 6. 🔥 Cookie Set (Naam 'token' rakhein jo middleware dhoond raha hai)
    response.cookies.set("token", token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 ghanta (Testing ke liye better hai)
    });

    return response;

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { success: false, message: "सर्वर में समस्या है" },
      { status: 500 }
    );
  }
}