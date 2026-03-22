import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import ImageKit from "imagekit";

// 🔹 ImageKit Setup
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// 🔹 MySQL Connection
async function getDBConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

// 🔹 POST API
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/portfolio_intro",
    });

    const imageUrl = result.url;

    // Save URL to MySQL
    const db = await getDBConnection();
    await db.execute(
      "INSERT INTO intro_images (image_url) VALUES (?)",
      [imageUrl]
    );
    await db.end();

    return NextResponse.json({
      success: true,
      message: "Image uploaded successfully",
      url: imageUrl,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}