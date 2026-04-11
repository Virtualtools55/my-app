import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import WhoIAm from "@/model/WhoIAm_schema"; 
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

    // 1. Destructuring mein 'subtitle' ko pakdein (kyunki frontend yahi bhej raha hai)
    const { title, subtitle, experience, projects, technologies } = body;

    const uploadedTech = await Promise.all(
      (technologies || []).map(async (tech) => {
        let iconUrl = tech.icon;
        if (tech.icon && tech.icon.startsWith("data:")) {
          const uploadRes = await imagekit.upload({
            file: tech.icon,
            fileName: `${tech.name}-${Date.now()}.png`,
            folder: "/whoiam-icons",
          });
          iconUrl = uploadRes.url;
        }
        return { name: tech.name, icon: iconUrl };
      })
    );

    // 2. Mongoose create mein mappings check karein
    const newEntry = await WhoIAm.create({
      title,
      subtitle: subtitle || "", // Frontend ka 'subtitle' schema ke 'description' mein jayega
      experience: String(experience || ""), 
      projects: String(projects || ""),  // Ab koi Cast Error nahi aayega
      technologies: uploadedTech,
    });

    return NextResponse.json({ success: true, data: newEntry }, { status: 201 });

  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}