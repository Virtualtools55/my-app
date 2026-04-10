import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/model/MyProjects_schema';

export async function GET() {
  await dbConnect();
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}