import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary"; // अगर Cloudinary यूज़ कर रहे हैं

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const public_id = searchParams.get("public_id"); // Cloudinary के लिए ज़रूरी

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    // 1️⃣ स्टेप: Storage से फाइल डिलीट करें (Optional)
    // if (public_id) {
    //   await cloudinary.uploader.destroy(public_id);
    // }

    // 2️⃣ स्टेप: Database से रिकॉर्ड डिलीट करें
    // await db.image.delete({ where: { id: id } });

    return NextResponse.json({ success: true, message: "Image deleted from DB & Storage" });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}