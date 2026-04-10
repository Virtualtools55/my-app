import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/model/MyProjects_schema';

export async function DELETE(request) {
  await dbConnect();
  try {
    const { id } = await request.json();
    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Project deleted" });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}