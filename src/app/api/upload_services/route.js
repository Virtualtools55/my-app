
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/model/Services_schema";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function POST(req) {
  try {
    await dbConnect();
    const { title, points, bgImage } = await req.json();

    let imageUrl = "";
    // ImageKit Upload Logic
    if (bgImage && bgImage.startsWith("data:")) {
      const uploadRes = await imagekit.upload({
        file: bgImage,
        fileName: `service-${Date.now()}.png`,
        folder: "/services-bg",
      });
      imageUrl = uploadRes.url;
    }

    const newService = await Service.create({
      title,
      points, 
      bgImage: imageUrl,
    });

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}