import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import bcrypt from "bcryptjs"; // bcryptjs का उपयोग करना सुरक्षित है

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // 1. Database Connection
    const client = await clientPromise;
    const db = client.db("portfolio");

    // 2. Find User
    const user = await db.collection("admin_details").findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // 3. Password Verification
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Wrong password" }, { status: 401 });
    }

    // 4. Create Response
    const response = NextResponse.json({ 
      success: true, 
      message: "Logged in successfully" 
    });

    // 5. Setting Cookie with Security
    response.cookies.set("admin", "true", {
      httpOnly: true, // ताकी JS से एक्सेस न हो सके (XSS सुरक्षा)
      secure: process.env.NODE_ENV === "production", // केवल HTTPS पर काम करे
      sameSite: "strict", // CSRF सुरक्षा के लिए
      path: "/",
      maxAge: 60 * 60 * 24, // 1 दिन
    });

    return response;

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message }, 
      { status: 500 }
    );
  }
}