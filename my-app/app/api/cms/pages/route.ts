import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'app', 'data', 'panorama-data.ts');
const archivePath = path.join(process.cwd(), 'app', 'data', 'panorama-archive.ts');

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET() {
  try {
    delete require.cache[require.resolve('../../../data/panorama-data')];
    const { panoramaPages } = require('../../../data/panorama-data');
    return NextResponse.json({ pages: panoramaPages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read pages data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { pages } = await request.json();
    
    if (!Array.isArray(pages)) {
      return NextResponse.json({ error: 'Pages must be an array' }, { status: 400 });
    }
    
    let fileContent = fs.readFileSync(dataPath, 'utf8');
    
    // Replace the pages array in the file
    const newPagesString = `export const panoramaPages: PanoramaPage[] = ${JSON.stringify(pages, null, 2)};`;
    fileContent = fileContent.replace(
      /export const panoramaPages: PanoramaPage\[\] = \[[\s\S]*?\];/,
      newPagesString
    );
    
    fs.writeFileSync(dataPath, fileContent);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pages data' }, { status: 500 });
  }
}