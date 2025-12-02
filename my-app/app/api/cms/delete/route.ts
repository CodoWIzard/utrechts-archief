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

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { pageId } = await request.json();
    
    // Get current pages
    let dataFileContent = fs.readFileSync(dataPath, 'utf8');
    const pagesMatch = dataFileContent.match(/export const panoramaPages: PanoramaPage\[\] = (\[[\s\S]*?\]);/);
    
    if (!pagesMatch) {
      return NextResponse.json({ error: 'Could not parse pages data' }, { status: 500 });
    }

    const currentPages = eval(pagesMatch[1]);
    const pageToDelete = currentPages.find((page: any) => page.id === pageId);
    
    if (!pageToDelete) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Remove from current pages
    const updatedPages = currentPages.filter((page: any) => page.id !== pageId);
    
    // Add to archive
    let archiveFileContent = fs.readFileSync(archivePath, 'utf8');
    const archiveMatch = archiveFileContent.match(/export const archivedPages: ArchivedPage\[\] = (\[[\s\S]*?\]);/);
    
    let archivedPages = [];
    if (archiveMatch) {
      archivedPages = eval(archiveMatch[1]);
    }

    const archivedPage = {
      ...pageToDelete,
      deletedAt: new Date().toISOString(),
      deletedBy: 'admin'
    };
    
    archivedPages.push(archivedPage);
    
    // Update both files
    const newPagesString = `export const panoramaPages: PanoramaPage[] = ${JSON.stringify(updatedPages, null, 2)};`;
    dataFileContent = dataFileContent.replace(
      /export const panoramaPages: PanoramaPage\[\] = \[[\s\S]*?\];/,
      newPagesString
    );
    
    const newArchiveString = `export const archivedPages: ArchivedPage[] = ${JSON.stringify(archivedPages, null, 2)};`;
    archiveFileContent = archiveFileContent.replace(
      /export const archivedPages: ArchivedPage\[\] = \[[\s\S]*?\];/,
      newArchiveString
    );
    
    fs.writeFileSync(dataPath, dataFileContent);
    fs.writeFileSync(archivePath, archiveFileContent);
    
    return NextResponse.json({ success: true, archivedPage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete page' }, { status: 500 });
  }
}