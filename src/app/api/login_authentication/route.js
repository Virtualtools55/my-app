import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

export async function POST(req) {
  const { email, password } = await req.json();

  const db = await connectDB();
  const [rows] = await db.execute(
    "SELECT * FROM admin_users WHERE email = ? AND password = ?",
    [email, password]
  );

  if (rows.length === 0) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const response = NextResponse.json(
    { message: "Login successful" },
    { status: 200 }
  );

  // ✅ Cookie set कर रहे हैं
  response.cookies.set("admin", "true", {
    httpOnly: true,
    path: "/",
  });

  return response;
}