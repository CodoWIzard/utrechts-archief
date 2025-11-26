# Panorama van Utrecht 1859 - Interactive Leporello

An interactive web application showcasing the historic Panorama of Utrecht from 1859. This 5.82-meter long leporello provides a virtual walk around the center of Utrecht with changing views from the canals.

## Features

- **Interactive Panorama Viewer**: Horizontal scrolling through the complete panorama
- **Multilingual Support**: Dutch and English translations
- **Clickable Pages**: Detailed information modals for each panorama section
- **Auto-play Mode**: Automatic scrolling through the panorama
- **Zoom Controls**: Zoom in/out functionality with percentage display
- **Drag Navigation**: Mouse and touch support for panorama navigation
- **Additional Images**: Extra historical images for selected pages
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Framework**: Next.js 16.0.1 with React
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Images**: Local image optimization
- **Authentication**: JWT-based CMS authentication

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## CMS Access

- Visit `/cms/login` to access the content management system
- Default credentials: `admin` / `admin123`
- Features: Page reordering, content editing, image upload

## Project Structure

- `app/page.tsx` - Main panorama viewer
- `app/data/panorama-data.ts` - Panorama page data
- `app/data/panorama-translations.ts` - English translations
- `app/translations/index.ts` - UI translations
- `app/cms/` - Content management system
- `public/images/` - Panorama and additional images

## Historical Context

The Panorama of Utrecht was created in 1859 by J. Bos, printed by P.W. van de Weijer, and published by Wed. Herfkens en zoon. It consists of four connected, zigzag-folded sheets showing a complete walk around Utrecht's city center from the perspective of the canals.

## License

This project showcases historical content from Het Utrechts Archief (Utrecht Archives).