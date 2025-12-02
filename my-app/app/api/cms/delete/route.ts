import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../../../lib/auth';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'app', 'data', 'panorama-data.ts');
const archivePath = path.join(process.cwd(), 'app', 'data', 'panorama-archive.ts');

function isAuthenticated(request: NextRequest): boolean {
  const token = request.cookies.get('auth-token')?.value;
  if (!token) {
    console.log('No auth token found');
    return false;
  }
  const verified = verifyToken(token);
  console.log('Token verification result:', verified);
  return verified !== null;
}

export async function POST(request: NextRequest) {
  const authResult = isAuthenticated(request);
  console.log('Authentication result:', authResult);
  if (!authResult) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { pageId, originalIndex } = await request.json();
    
    if (!pageId) {
      return NextResponse.json({ error: 'Page ID is required' }, { status: 400 });
    }
    
    // Check if files exist
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ error: 'Data file not found' }, { status: 500 });
    }
    
    if (!fs.existsSync(archivePath)) {
      // Create archive file if it doesn't exist
      const archiveTemplate = `export interface ArchivedPage {
  id: string;
  catalogNumber: string;
  title: string;
  description: string;
  imageUrl: string;
  additionalInfo?: string;
  additionalImages?: Array<{
    url: string;
    description: string;
  }>;
  deletedAt: string;
  deletedBy: string;
}

export const archivedPages: ArchivedPage[] = [];`;
      fs.writeFileSync(archivePath, archiveTemplate);
    }
    
    // Import current pages directly  
    delete require.cache[require.resolve('../../../data/panorama-data')];
    const { panoramaPages: currentPages } = require('../../../data/panorama-data');
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
      try {
        archivedPages = eval(archiveMatch[1]);
      } catch (evalError) {
        console.error('Error parsing archived pages:', evalError);
        archivedPages = [];
      }
    }

    const archivedPage = {
      ...pageToDelete,
      deletedAt: new Date().toISOString(),
      deletedBy: 'admin',
      originalIndex
    };
    
    archivedPages.push(archivedPage);
    
    // Update data file
    let dataFileContent = fs.readFileSync(dataPath, 'utf8');
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
    
    // Write files with error handling
    try {
      fs.writeFileSync(dataPath, dataFileContent);
      fs.writeFileSync(archivePath, archiveFileContent);
    } catch (writeError) {
      console.error('Error writing files:', writeError);
      return NextResponse.json({ error: 'Failed to save changes to disk' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, archivedPage });
  } catch (error) {
    console.error('Delete page error:', error);
    return NextResponse.json({ 
      error: 'Failed to delete page', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}