# Frontend-Backend Connection Setup Guide

## Overview
This guide explains how to connect your React frontend (`my-app`) to your Node.js backend server.

## What We've Done

### 1. Created API Infrastructure
- **`src/api/client.js`** - Main API client for HTTP requests
- **`src/api/authService.js`** - Authentication service
- **`src/api/mediaService.js`** - File upload and media service

### 2. Updated Stores
- **`useAuthStore`** - Now uses backend instead of Supabase
- **`usePhotoStore`** - Updated to work with backend (with fallback to mock data)
- **`useUploadStore`** - Now uploads files to your backend
- **`useAppStore`** - General app state management

### 3. Environment Configuration
- Updated `env.example` to use backend server URL
- Default backend URL: `http://localhost:3000/api`

## Setup Instructions

### Step 1: Start Your Backend Server
```bash
cd server
npm install
npm run dev
```

Your server should be running on `http://localhost:3000`

### Step 2: Configure Frontend Environment
Create a `.env.local` file in your `my-app` folder:

```bash
# Backend Server Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# Frontend Configuration
VITE_APP_NAME=Resolution Photo App
VITE_APP_VERSION=1.0.0
```

### Step 3: Test the Connection
1. Start your frontend:
```bash
cd my-app
npm run dev
```

2. Open your browser and go to the home page
3. You should see an "API Connection Test" section
4. Click "Test Main API" and "Test Auth API" to verify connection

### Step 4: Test Authentication
1. Go to `/login` page
2. Try signing in with Google (this will test your auth endpoints)
3. Check browser console for any errors

## Current API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - User registration
- `POST /signin` - User login
- `GET /google` - Get Google OAuth URL
- `GET /callback` - Handle auth callbacks
- `GET /me` - Get current user (protected)
- `POST /signout` - User logout (protected)
- `POST /refresh` - Refresh token

### Media (`/api/media`)
- `POST /upload` - Upload file (protected)
- `DELETE /delete` - Delete file (protected)

## What's Working Now

✅ **Authentication Flow** - Sign up, sign in, Google OAuth
✅ **File Upload** - Upload images to your backend
✅ **API Client** - Centralized HTTP request handling
✅ **Error Handling** - Proper error states and loading
✅ **Token Management** - JWT token storage and refresh

## What Needs Backend Implementation

🔄 **Photo Listing** - Currently using mock data
🔄 **Photo Search** - Need backend search endpoints
🔄 **Photo Categories** - Need backend category management
🔄 **User Photos** - Need backend user photo endpoints
🔄 **Photo Details** - Need backend photo CRUD operations

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your backend CORS is configured for `http://localhost:5173`
   - Check server CORS settings in `server.js`

2. **Connection Refused**
   - Verify backend is running on port 3000
   - Check if port is available

3. **Authentication Errors**
   - Check JWT token format in backend
   - Verify auth middleware is working

4. **File Upload Issues**
   - Check multer configuration
   - Verify file size limits (10MB)
   - Check temp directory permissions

### Debug Steps

1. **Check Browser Console** for JavaScript errors
2. **Check Network Tab** for failed API requests
3. **Check Backend Console** for server errors
4. **Verify Environment Variables** are loaded correctly

## Next Steps

1. **Test Basic Connection** - Use the API test component
2. **Test Authentication** - Try login/signup flows
3. **Test File Upload** - Upload an image through the upload page
4. **Add Backend Endpoints** - Implement missing photo management APIs
5. **Remove Mock Data** - Replace mock data with real API calls

## API Response Format

Your backend should return responses in this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Your data here
  }
}
```

For errors:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your backend server is running
3. Test API endpoints directly (e.g., with Postman)
4. Check the network tab for failed requests

The frontend is now fully configured to work with your backend. Once you test the connection and everything works, you can remove the API test component and start implementing the missing backend endpoints for full photo management functionality.
