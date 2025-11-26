import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';
import fs from 'fs';
import path from 'path';

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Create unique filename
    const timestamp = Date.now();
    const extension = path.extname(file.name);
    const filename = `${timestamp}${extension}`;
    
    // Save to public/images directory
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    const filePath = path.join(uploadDir, filename);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    fs.writeFileSync(filePath, buffer);
    
    // Return the public URL
    const imageUrl = `/images/${filename}`;
    
    return NextResponse.json({ imageUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}