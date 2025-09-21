import { create } from 'zustand'
import { mediaService } from '../api/mediaService'

const useUploadStore = create((set, get) => ({
  // State
  uploadedFile: null,
  preview: null,
  formData: {
    title: "",
    category: "",
    tags: "",
    description: ""
  },
  isUploading: false,
  uploadProgress: 0,
  uploadError: null,
  uploadSuccess: false,

  // File handling
  setUploadedFile: (file) => {
    set({ uploadedFile: file })
    
    // Create preview if file is an image
    if (file && file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file)
      set({ preview: previewUrl })
    }
  },

  removeFile: () => {
    const { preview } = get()
    
    // Clean up preview URL
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    
    set({ 
      uploadedFile: null, 
      preview: null 
    })
  },

  // Form data handling
  updateFormData: (field, value) => {
    set(state => ({
      formData: {
        ...state.formData,
        [field]: value
      }
    }))
  },

  setFormData: (data) => {
    set({ formData: data })
  },

  resetFormData: () => {
    set({
      formData: {
        title: "",
        category: "",
        tags: "",
        description: ""
      }
    })
  },

  // Upload process
  startUpload: () => {
    set({ 
      isUploading: true, 
      uploadProgress: 0, 
      uploadError: null,
      uploadSuccess: false 
    })
  },

  updateUploadProgress: (progress) => {
    set({ uploadProgress: progress })
  },

  uploadSuccess: () => {
    set({ 
      isUploading: false, 
      uploadProgress: 100, 
      uploadSuccess: true 
    })
  },

  uploadError: (error) => {
    set({ 
      isUploading: false, 
      uploadError: error,
      uploadSuccess: false 
    })
  },

  resetUpload: () => {
    const { preview } = get()
    
    // Clean up preview URL
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    
    set({
      uploadedFile: null,
      preview: null,
      formData: {
        title: "",
        category: "",
        tags: "",
        description: ""
      },
      isUploading: false,
      uploadProgress: 0,
      uploadError: null,
      uploadSuccess: false
    })
  },

  // Upload file to backend
  uploadFile: async () => {
    const { uploadedFile, formData } = get()
    
    if (!uploadedFile) {
      throw new Error('No file selected')
    }

    try {
      set({ 
        isUploading: true, 
        uploadProgress: 0, 
        uploadError: null,
        uploadSuccess: false 
      })

      // Simulate progress (you can implement real progress tracking)
      const progressInterval = setInterval(() => {
        set(state => ({ 
          uploadProgress: Math.min(state.uploadProgress + 10, 90) 
        }))
      }, 200)

      // Upload to backend
      const response = await mediaService.uploadFile(uploadedFile, formData)
      
      clearInterval(progressInterval)
      set({ uploadProgress: 100, uploadSuccess: true })
      
      // Reset form after successful upload
      setTimeout(() => {
        get().resetUpload()
      }, 2000)

      return response
    } catch (error) {
      console.error('Upload failed:', error)
      set({ 
        isUploading: false, 
        uploadError: error.message,
        uploadSuccess: false 
      })
      throw error
    } finally {
      set({ isUploading: false })
    }
  },

  // Delete uploaded file
  deleteFile: async (fileId) => {
    try {
      const response = await mediaService.deleteFile(fileId)
      return response
    } catch (error) {
      console.error('Delete failed:', error)
      throw error
    }
  },

  // Getters
  getUploadedFile: () => get().uploadedFile,
  getPreview: () => get().preview,
  getFormData: () => get().formData,
  getIsUploading: () => get().isUploading,
  getUploadProgress: () => get().uploadProgress,
  getUploadError: () => get().uploadError,
  getUploadSuccess: () => get().uploadSuccess
}))

export default useUploadStore 