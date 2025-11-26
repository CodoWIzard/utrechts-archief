# Panorama van Utrecht CMS

This Content Management System (CMS) allows you to manage the panorama pages, including editing text, adding images, and reordering pages.

## Features

- **Secure Login**: Protected admin area with username/password authentication
- **Edit Pages**: Modify titles, descriptions, catalog numbers, and additional information
- **Image Management**: Upload new images or use existing URLs
- **Drag & Drop Reordering**: Change the order of pages by dragging and dropping
- **Add/Delete Pages**: Create new pages or remove existing ones

## Access

### CMS Login
- URL: `http://localhost:3000/cms/login`
- Default credentials:
  - Username: `admin`
  - Password: `admin123`

### Main CMS Dashboard
- URL: `http://localhost:3000/cms` (requires login)

## How to Use

### 1. Login
1. Navigate to `/cms/login`
2. Enter your credentials
3. Click "Login"

### 2. Managing Pages

#### Edit a Page
1. Click the "Edit" button on any page
2. Modify the fields:
   - **Title**: The page title
   - **Catalog Number**: Archive catalog number
   - **Description**: Page description text
   - **Image**: Either paste a URL or upload a new image
   - **Additional Info**: Optional extra information
3. Click "Save Changes"

#### Add a New Page
1. Click the "Add Page" button in the header
2. Fill in all required fields
3. Upload an image or provide an image URL
4. Click "Save Changes"

#### Delete a Page
1. Click the "Delete" button on any page
2. Confirm the deletion in the popup

#### Reorder Pages
1. Drag and drop pages to reorder them
2. Click "Save Order" to persist the changes

### 3. Image Management
- **Upload**: Use the file input to upload JPG, PNG, or WebP images
- **URL**: Paste an existing image URL
- **Preview**: See a thumbnail of the selected image

## Security

- The CMS is protected by authentication middleware
- Only authenticated users can access `/cms` routes
- Login sessions expire after 24 hours
- All CMS API endpoints require authentication

## Configuration

### Environment Variables
Edit `.env.local` to change:
- `ADMIN_USERNAME`: Admin username (default: admin)
- `ADMIN_PASSWORD`: Admin password (default: admin123)
- `JWT_SECRET`: Secret key for JWT tokens
- `NEXTAUTH_SECRET`: Secret for NextAuth

### File Storage
- Uploaded images are stored in `/public/images/`
- Page data is stored in `/app/data/panorama-data.ts`

## Development

### Starting the Development Server
```bash
npm run dev
```

### Building for Production
```bash
npm run build
npm start
```

## Important Notes

1. **No CMS Button on Main Site**: The CMS is only accessible via direct URL (`/cms/login`)
2. **Data Persistence**: All changes are saved to the file system
3. **Image Formats**: Supports JPG, PNG, and WebP formats
4. **Backup**: Consider backing up your data files before making major changes

## Troubleshooting

- **Can't login**: Check your credentials in `.env.local`
- **Images not uploading**: Ensure the `/public/images/` directory exists and is writable
- **Changes not saving**: Check browser console for errors and ensure you're authenticated
- **Session expired**: Re-login at `/cms/login`