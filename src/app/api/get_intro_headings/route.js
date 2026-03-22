import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// DB Connection Function
async function getDBConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

//  GET API
export async function GET() {
  try {
    const db = await getDBConnection();

    // Headings Fetch
    const [rows] = await db.execute(
      "SELECT id, text FROM intro_headings ORDER BY id DESC"
    );

    await db.end();

    return NextResponse.json({
      success: true,
      headings: rows,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Error fetching headings",
      },
      { status: 500 }
    );
  }
}