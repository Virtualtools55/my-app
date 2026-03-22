import { NextResponse } from "next/server";
// import { db } from "@/lib/db"; // अपने Database कनेक्शन को यहाँ इम्पोर्ट करें

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    // 🔹 Database से डिलीट करने का असली कोड यहाँ आएगा
    // await db.heading.delete({ where: { id: id } });

    console.log(`Heading with ID ${id} deleted successfully`);

    return NextResponse.json({ success: true, message: "Heading deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}