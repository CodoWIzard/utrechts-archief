import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'app', 'data', 'panorama-data.ts');

export async function GET() {
  try {
    const fileContent = fs.readFileSync(dataPath, 'utf8');
    const pagesMatch = fileContent.match(/export const panoramaPages: PanoramaPage\[\] = (\[[\s\S]*?\]);/);
    
    if (!pagesMatch) {
      return NextResponse.json({ error: 'Could not parse pages data' }, { status: 500 });
    }

    // Simple parsing - in production, use a proper parser
    const pagesData = eval(pagesMatch[1]);
    return NextResponse.json({ pages: pagesData });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read pages data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {

  try {
    const { pages } = await request.json();
    
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