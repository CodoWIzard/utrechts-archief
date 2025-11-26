import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'app', 'data', 'panorama-data.ts');

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
    const { pageIds } = await request.json();
    
    let fileContent = fs.readFileSync(dataPath, 'utf8');
    
    // Get current pages
    const pagesMatch = fileContent.match(/export const panoramaPages: PanoramaPage\[\] = (\[[\s\S]*?\]);/);
    if (!pagesMatch) {
      return NextResponse.json({ error: 'Could not parse pages data' }, { status: 500 });
    }
    
    const currentPages = eval(pagesMatch[1]);
    
    // Reorder pages based on pageIds array
    const reorderedPages = pageIds.map((id: string) => 
      currentPages.find((page: any) => page.id === id)
    ).filter(Boolean);
    
    // Replace the pages array in the file
    const newPagesString = `export const panoramaPages: PanoramaPage[] = ${JSON.stringify(reorderedPages, null, 2)};`;
    fileContent = fileContent.replace(
      /export const panoramaPages: PanoramaPage\[\] = \[[\s\S]*?\];/,
      newPagesString
    );
    
    fs.writeFileSync(dataPath, fileContent);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reorder pages' }, { status: 500 });
  }
}