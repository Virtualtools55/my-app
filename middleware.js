// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Agar token nahi hai, toh seedha login par bhej do
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    // Agar token hai, toh Next.js ko aage badhne do (Verification Page par hogi)
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};