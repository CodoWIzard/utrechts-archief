import { PanoramaPage } from './panorama-data';

export interface ArchivedPage extends PanoramaPage {
  deletedAt: string;
  deletedBy?: string;
}

export const archivedPages: ArchivedPage[] = [];