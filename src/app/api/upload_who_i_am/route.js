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

    // Frontend के fields को यहाँ निकालें
    const { title, subtitle, experience, projects, technologies } = body;

    // 1. Technologies के Icons को ImageKit पर अपलोड करना
    const uploadedTech = await Promise.all(
      (technologies || []).map(async (tech) => {
        let iconUrl = tech.icon;
        
        // अगर icon base64 format में है, तभी अपलोड करें
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

    // 2. Mongoose में सेव करना 
    // (सुनिश्चित करें कि आपके Schema में ये fields मौजूद हैं)
    const newEntry = await WhoIAm.create({
      title,
      description: subtitle, // यहाँ 'subtitle' को 'description' की जगह यूज़ कर रहे हैं
      experience,
      projects: Number(projects),
      technologies: uploadedTech,
    });

    return NextResponse.json({ success: true, data: newEntry }, { status: 201 });

  } catch (error) {
    console.error("API ERROR:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}