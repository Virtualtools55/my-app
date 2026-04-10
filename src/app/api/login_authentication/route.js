import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Admin from "@/model/authentication_schema";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();

    const { email, password } = body;

    // 🔥 1. Manual Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "सारे field जरूरी हैं" },
        { status: 400 }
      );
    }

    // Email format check (regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email सही format में नहीं है" },
        { status: 400 }
      );
    }

    // Password length check
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password कम से कम 6 characters का होना चाहिए" },
        { status: 400 }
      );
    }

    await dbConnect();

    // 🔥 2. User check
    const user = await Admin.findOne({ email });

    const genericError = "ईमेल या पासवर्ड गलत है";

    if (!user) {
      return NextResponse.json({ error: genericError }, { status: 401 });
    }

    // 🔥 3. Password match
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: genericError }, { status: 401 });
    }

    // 🔥 4. Success response
    const response = NextResponse.json({
      success: true,
      message: "सफलतापूर्वक लॉगिन हुआ",
    });

    // 🔥 5. Cookie set
    response.cookies.set("admin_session", "secure_token_here", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 5, // 60 सेकंड * 5 मिनट = 300 सेकंड
    });

    return response;

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "सर्वर में समस्या है" },
      { status: 500 }
    );
  }
}