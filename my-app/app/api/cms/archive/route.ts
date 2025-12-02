import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';
import fs from 'fs';
import path from 'path';

const archivePath = path.join(process.cwd(), 'app', 'data', 'panorama-archive.ts');

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const fileContent = fs.readFileSync(archivePath, 'utf8');
    const archiveMatch = fileContent.match(/export const archivedPages: ArchivedPage\[\] = (\[[\s\S]*?\]);/);
    
    if (!archiveMatch) {
      return NextResponse.json({ archivedPages: [] });
    }

    const archivedPages = eval(archiveMatch[1]);
    return NextResponse.json({ archivedPages });
  } catch (error) {
    return NextResponse.json({ archivedPages: [] });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { pageId } = await request.json();
    
    let fileContent = fs.readFileSync(archivePath, 'utf8');
    const archiveMatch = fileContent.match(/export const archivedPages: ArchivedPage\[\] = (\[[\s\S]*?\]);/);
    
    let archivedPages = [];
    if (archiveMatch) {
      archivedPages = eval(archiveMatch[1]);
    }

    // Find the archived page to restore
    const pageToRestore = archivedPages.find((page: any) => page.id === pageId);
    if (!pageToRestore) {
      return NextResponse.json({ error: 'Page not found in archive' }, { status: 404 });
    }

    // Remove from archive
    const updatedArchive = archivedPages.filter((page: any) => page.id !== pageId);
    
    // Update archive file
    const newArchiveString = `export const archivedPages: ArchivedPage[] = ${JSON.stringify(updatedArchive, null, 2)};`;
    fileContent = fileContent.replace(
      /export const archivedPages: ArchivedPage\[\] = \[[\s\S]*?\];/,
      newArchiveString
    );
    
    fs.writeFileSync(archivePath, fileContent);

    // Remove archive-specific properties
    const { deletedAt, deletedBy, ...restoredPage } = pageToRestore;
    
    return NextResponse.json({ restoredPage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to restore page' }, { status: 500 });
  }
}