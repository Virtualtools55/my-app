import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import WhoIAm from "@/model/MyProjects_schema"; 
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, imageUrl, projectLink } = body;

    let finalImageUrl = imageUrl;

    // Check agar imageUrl base64 string hai (file upload ki gayi hai)
    if (imageUrl && imageUrl.startsWith("data:")) {
      const uploadRes = await imagekit.upload({
        file: imageUrl, // base64 string
        fileName: `project-${Date.now()}.png`,
        folder: "/MyProjects_background_image", // <--- ImageKit folder name
      });
      finalImageUrl = uploadRes.url;
    }

    const newProject = await WhoIAm.create({
      title,
      description: "Project", // Aapke schema ke requirements ke hisab se
      imageUrl: finalImageUrl,
      projectLink,
    });

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}