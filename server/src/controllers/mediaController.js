// controllers/mediaController.js
import { uploadMedia, deleteMedia } from '../services/mediaService.js';
import fs from 'fs/promises';
import path from 'path';

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded' 
      });
    }

    // Validate file type (photos only)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype)) {
      // Cleanup uploaded file
      await fs.unlink(file.path).catch(() => {}); // Silent fail for cleanup
      return res.status(400).json({
        success: false,
        error: 'Only image files are allowed (JPEG, PNG, WebP, GIF)'
      });
    }

    // Upload to Cloudinary
    const result = await uploadMedia(file.path);
    
    // Cleanup local temp file
    await fs.unlink(file.path).catch(err => {
      console.error('Failed to cleanup temp file:', err);
    });

    return res.status(200).json({ 
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        resourceType: result.resource_type,
        width: result.width,
        height: result.height,
        bytes: result.bytes
      }
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    
    // Cleanup temp file on error
    if (req.file?.path) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error during upload'
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { publicId } = req.body;
    
    if (!publicId || typeof publicId !== 'string') {
      return res.status(400).json({ 
        success: false,
        error: 'Missing or invalid publicId' 
      });
    }

    await deleteMedia(publicId);
    
    return res.status(200).json({ 
      success: true,
      message: 'Media deleted successfully' 
    });
    
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Failed to delete media'
    });
  }
};