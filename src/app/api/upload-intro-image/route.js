import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import HeadingImage from "@/model/heading_image_schema";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function POST(req) {
  try {
    await dbConnect(); // Mongoose connection call

    const formData = await req.formData();
    const file = formData.get("image");
    const title = formData.get("title") || "Intro Background";

    if (!file) {
      return NextResponse.json({ success: false, message: "No file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadResponse = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/portfolio_intro",
    });

    // Mongoose Model usage (No .db() call)
    const savedEntry = await HeadingImage.create({
      imageUrl: uploadResponse.url,
      fileId: uploadResponse.fileId,
      title: title,
    });

    return NextResponse.json({ success: true, data: savedEntry });

  } catch (error) {
    console.error("UPLOAD_ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}