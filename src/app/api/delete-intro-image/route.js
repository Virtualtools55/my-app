import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import ImageKit from "imagekit";

// 🔥 ImageKit config
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
      return NextResponse.json(
        { success: false, message: "ID is required" },
        { status: 400 }
      );
    }

    // ✅ DB connect
    const client = await clientPromise;
    const db = client.db("portfolio");

    // 🔥 1. पहले data निकालो
    const imageDoc = await db.collection("heading_images").findOne({
      _id: new ObjectId(id),
    });

    if (!imageDoc) {
      return NextResponse.json(
        { success: false, message: "Image not found" },
        { status: 404 }
      );
    }

    // 🔥 IMPORTANT: तुमने save करते time ये field रखनी चाहिए
    // imageDoc.fileId (ImageKit का fileId)

    // 🔥 2. ImageKit से delete
    if (imageDoc.fileId) {
      await imagekit.deleteFile(imageDoc.fileId);
    }

    // 🔥 3. MongoDB से delete
    await db.collection("heading_images").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      message: "Image deleted from ImageKit + DB ✅",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}