import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import ImageKit from "imagekit";

// 🔹 ImageKit Configuration
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file found in request" },
        { status: 400 }
      );
    }

    // 1. File को Buffer में बदलें (ImageKit के लिए)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. ImageKit पर Specific Folder में अपलोड करें
    const uploadResponse = await imagekit.upload({
      file: buffer, // Required
      fileName: file.name || "upload.jpg", // Required
      folder: "/portfolio_intro", // यहाँ आपका फोल्डर नाम (Path) आएगा
      useUniqueFileName: true, // ताकी एक ही नाम की फाइल्स आपस में न टकराएं
    });

    const imageUrl = uploadResponse.url;
    const fileId = uploadResponse.fileId; // भविष्य में डिलीट करने के लिए काम आता है

    // 3. MongoDB Connection
    // नोट: यहाँ await clientPromise का उपयोग करें, यह Singleton पैटर्न होना चाहिए
    const client = await clientPromise;
    const db = client.db("portfolio");

    // 4. Database में URL और Meta Data सेव करें
    const result = await db.collection("heading_images").insertOne({
      image_url: imageUrl,
      image_id: fileId, // Best practice: ID भी सेव करें ताकि बाद में ImageKit से डिलीट कर सकें
      folder: "/portfolio_intro",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Image stored in folder and URL saved to DB",
      url: imageUrl,
      dbId: result.insertedId
    });

  } catch (error) {
    console.error("UPLOAD_ERROR:", error);
    
    // अगर SSL एरर (Alert 80) आ रहा है, तो चेक करें कि Mongo Atlas में IP Whitelisted है या नहीं
    return NextResponse.json(
      { 
        success: false, 
        message: "Server error during upload", 
        details: error.message 
      },
      { status: 500 }
    );
  }
}