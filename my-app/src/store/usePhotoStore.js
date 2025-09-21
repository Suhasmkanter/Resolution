import { create } from 'zustand'
import { mediaService } from '../api/mediaService'

const usePhotoStore = create((set, get) => ({
  // State
  allPhotos: [],
  userPhotos: [],
  latestPhotos: [],
  trendingPhotos: [],
  categories: [
    "Nature", "Architecture", "Urban", "Art", "Interior", 
    "Portrait", "Travel", "Food", "Technology", "Sports"
  ],
  selectedCategory: null,
  searchQuery: "",
  loading: false,
  currentPhoto: null,
  error: null,

  // Actions
  setAllPhotos: (photos) => set({ allPhotos: photos }),
  
  setUserPhotos: (photos) => set({ userPhotos: photos }),
  
  setLatestPhotos: (photos) => set({ latestPhotos: photos }),
  
  setTrendingPhotos: (photos) => set({ trendingPhotos: photos }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setLoading: (loading) => set({ loading }),
  
  setCurrentPhoto: (photo) => set({ currentPhoto: photo }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  // Load photos from backend
  loadPhotos: async () => {
    try {
      set({ loading: true, error: null })
      
      // For now, we'll use mock data since your backend doesn't have photo listing endpoints yet
      // You can replace this with actual API calls when you add those endpoints
      const mockPhotos = [
        {
          id: 1,
          title: "Beautiful Sunset",
          category: "Nature",
          uploader: "photographer1",
          imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
          likes: 45,
          uploadDate: "2024-01-15"
        },
        {
          id: 2,
          title: "Urban Architecture",
          category: "Architecture",
          uploader: "photographer2",
          imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
          likes: 32,
          uploadDate: "2024-01-14"
        },
        {
          id: 3,
          title: "Street Photography",
          category: "Urban",
          uploader: "photographer3",
          imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=500",
          likes: 28,
          uploadDate: "2024-01-13"
        },
        {
          id: 4,
          title: "Abstract Art",
          category: "Art",
          uploader: "photographer4",
          imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500",
          likes: 56,
          uploadDate: "2024-01-12"
        }
      ]

      set({ 
        allPhotos: mockPhotos,
        latestPhotos: mockPhotos.slice(0, 4),
        trendingPhotos: mockPhotos.slice(0, 4),
        loading: false 
      })

      return mockPhotos
    } catch (error) {
      console.error('Error loading photos:', error)
      set({ 
        loading: false, 
        error: error.message 
      })
      throw error
    }
  },

  // Load user photos from backend
  loadUserPhotos: async () => {
    try {
      set({ loading: true, error: null })
      
      // Try to get user photos from backend
      try {
        const response = await mediaService.getUserFiles()
        if (response.success) {
          set({ 
            userPhotos: response.data || [],
            loading: false 
          })
          return response.data
        }
      } catch (apiError) {
        console.log('Backend user photos endpoint not available yet, using mock data')
      }

      // Fallback to mock data
      const mockUserPhotos = [
        {
          id: 1,
          title: "My First Photo",
          category: "Nature",
          imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500",
          uploadDate: "2024-01-15"
        }
      ]

      set({ 
        userPhotos: mockUserPhotos,
        loading: false 
      })

      return mockUserPhotos
    } catch (error) {
      console.error('Error loading user photos:', error)
      set({ 
        loading: false, 
        error: error.message 
      })
      throw error
    }
  },

  // Get photo by ID
  getPhotoById: (id) => {
    const { allPhotos } = get()
    return allPhotos.find(photo => photo.id === parseInt(id))
  },

  // Get user photo by ID
  getUserPhotoById: (id) => {
    const { userPhotos } = get()
    return userPhotos.find(photo => photo.id === parseInt(id))
  },

  // Filter photos by category
  getPhotosByCategory: (category) => {
    const { allPhotos } = get()
    if (!category) return allPhotos
    return allPhotos.filter(photo => photo.category === category)
  },

  // Search photos
  searchPhotos: (query) => {
    const { allPhotos } = get()
    if (!query) return allPhotos
    const lowercaseQuery = query.toLowerCase()
    return allPhotos.filter(photo => 
      photo.title.toLowerCase().includes(lowercaseQuery) ||
      photo.uploader.toLowerCase().includes(lowercaseQuery) ||
      photo.category.toLowerCase().includes(lowercaseQuery)
    )
  },

  // Get filtered and sorted photos
  getFilteredPhotos: () => {
    const { allPhotos, selectedCategory, searchQuery } = get()
    let filtered = allPhotos

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(photo => photo.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(photo => 
        photo.title.toLowerCase().includes(lowercaseQuery) ||
        photo.uploader.toLowerCase().includes(lowercaseQuery) ||
        photo.category.toLowerCase().includes(lowercaseQuery)
      )
    }

    return filtered
  },

  // Get user's filtered photos
  getUserFilteredPhotos: () => {
    const { userPhotos, selectedCategory, searchQuery } = get()
    let filtered = userPhotos

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(photo => photo.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(photo => 
        photo.title.toLowerCase().includes(lowercaseQuery) ||
        photo.uploader.toLowerCase().includes(lowercaseQuery) ||
        photo.category.toLowerCase().includes(lowercaseQuery)
      )
    }

    return filtered
  },

  // Add new photo (after upload)
  addPhoto: (photo) => {
    set(state => ({
      allPhotos: [photo, ...state.allPhotos],
      userPhotos: [photo, ...state.userPhotos],
      latestPhotos: [photo, ...state.latestPhotos.slice(0, 3)]
    }))
  },

  // Remove photo
  removePhoto: (photoId) => {
    set(state => ({
      allPhotos: state.allPhotos.filter(photo => photo.id !== photoId),
      userPhotos: state.userPhotos.filter(photo => photo.id !== photoId),
      latestPhotos: state.latestPhotos.filter(photo => photo.id !== photoId),
      trendingPhotos: state.trendingPhotos.filter(photo => photo.id !== photoId)
    }))
  },

  // Update photo
  updatePhoto: (photoId, updates) => {
    set(state => ({
      allPhotos: state.allPhotos.map(photo => 
        photo.id === photoId ? { ...photo, ...updates } : photo
      ),
      userPhotos: state.userPhotos.map(photo => 
        photo.id === photoId ? { ...photo, ...updates } : photo
      ),
      latestPhotos: state.latestPhotos.map(photo => 
        photo.id === photoId ? { ...photo, ...updates } : photo
      ),
      trendingPhotos: state.trendingPhotos.map(photo => 
        photo.id === photoId ? { ...photo, ...updates } : photo
      )
    }))
  },

  // Getters
  getAllPhotos: () => get().allPhotos,
  getUserPhotos: () => get().userPhotos,
  getLatestPhotos: () => get().latestPhotos,
  getTrendingPhotos: () => get().trendingPhotos,
  getCategories: () => get().categories,
  getSelectedCategory: () => get().selectedCategory,
  getSearchQuery: () => get().searchQuery,
  getLoading: () => get().loading,
  getCurrentPhoto: () => get().currentPhoto,
  getError: () => get().error
}))

export default usePhotoStore 