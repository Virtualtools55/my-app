import { NextResponse } from "next/server";
import dbConnect from "@/lib/db"; // Mongoose connection helper
import WhoIAm from "@/model/WhoIAm_schema";
import ImageKit from "imagekit";

// 🔹 ImageKit Setup
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// 🔹 Helper: Upload base64 icon
async function uploadIcon(iconBase64, techName) {
  if (!iconBase64 || !iconBase64.startsWith("data:")) return null;
  try {
    const upload = await imagekit.upload({
      file: iconBase64,
      fileName: `${techName}-${Date.now()}.png`,
      folder: "/whoiam-icons",
    });
    return upload.url;
  } catch (err) {
    console.error(`ImageKit upload failed for ${techName}:`, err);
    return null;
  }
}

// 🔹 POST handler (Schema Level)
export async function POST(req) {
  try {
    await dbConnect(); // Mongoose connection
    const body = await req.json();
    const { title, subtitle, experience, projects, technologies } = body;

    // 1. ImageKit Upload Logic (Same as before)
    const uploadedTech = await Promise.all(
      (technologies || []).map(async (tech) => ({
        name: tech.name,
        icon: await uploadIcon(tech.icon, tech.name),
      }))
    );

    // 2. Mongoose Model Se Save Karna
    // Ye method automatically data validation check karega
    const result = await WhoIAm.create({
      title,
      subtitle,
      experience,
      projects,
      technologies: uploadedTech,
    });

    return NextResponse.json({
      success: true,
      message: "WhoIAm data saved successfully",
      data: result._id, // Mongoose mein _id hota hai
    }, { status: 201 });

  } catch (err) {
    console.error("UPLOAD_WHOIAM_ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Error saving data", error: err.message },
      { status: 500 }
    );
  }
}