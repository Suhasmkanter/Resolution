import cloudinary from '../config/cloudinary.js';

export const uploadMedia = async (filePath, folder = 'resolution-uploads') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: "auto",
      // Add optimization for photos
      transformation: [
        { quality: "auto", fetch_format: "auto" }
      ]
    });
    return result;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

export const deleteMedia = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto"
    });
    
    if (result.result !== 'ok') {
      throw new Error(`Failed to delete media with publicId: ${publicId}`);
    }
    
    return result;
  } catch (error) {
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};