import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import HeadingImage from "@/model/heading_image_schema";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    await dbConnect();

    // 🔥 1. Mongoose se document dhoondo
    const imageDoc = await HeadingImage.findById(id);

    if (!imageDoc) {
      return NextResponse.json({ success: false, message: "Image not found" }, { status: 404 });
    }

    // 🔥 2. ImageKit se delete (Agar fileId exist karti hai)
    if (imageDoc.fileId) {
      try {
        await imagekit.deleteFile(imageDoc.fileId);
      } catch (ikError) {
        console.error("ImageKit Delete Failed:", ikError.message);
        // Kabhi kabhi image manually delete ho jati hai, 
        // isliye hum process ko stop nahi karenge database deletion ke liye.
      }
    }

    // 🔥 3. MongoDB se delete
    await HeadingImage.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Image deleted from ImageKit + DB ✅",
    });

  } catch (error) {
    console.error("DELETE_ERROR:", error);
    return NextResponse.json(
      { success: false, message: "Server error during deletion", error: error.message },
      { status: 500 }
    );
  }
}