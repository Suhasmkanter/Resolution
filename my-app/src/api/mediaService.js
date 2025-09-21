import { apiClient } from './client'

export const mediaService = {
  // Upload file
  async uploadFile(file, metadata = {}) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      // Add metadata if provided
      if (metadata.title) formData.append('title', metadata.title)
      if (metadata.category) formData.append('category', metadata.category)
      if (metadata.description) formData.append('description', metadata.description)
      if (metadata.tags) formData.append('tags', metadata.tags)
      
      return await apiClient.upload('/media/upload', formData)
    } catch (error) {
      throw error
    }
  },

  // Delete file
  async deleteFile(fileId) {
    try {
      return await apiClient.delete(`/media/delete?id=${fileId}`)
    } catch (error) {
      throw error
    }
  },

  // Get file info
  async getFileInfo(fileId) {
    try {
      return await apiClient.get(`/media/file/${fileId}`)
    } catch (error) {
      throw error
    }
  },

  // Get user files
  async getUserFiles() {
    try {
      return await apiClient.get('/media/user-files')
    } catch (error) {
      throw error
    }
  }
}
