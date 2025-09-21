import { create } from 'zustand'

const useAppStore = create((set, get) => ({
  // App-wide state
  isLoading: false,
  error: null,
  notifications: [],
  theme: 'light', // or 'dark'
  
  // Loading state
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Error handling
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  
  // Notifications
  addNotification: (notification) => set(state => ({
    notifications: [...state.notifications, { ...notification, id: Date.now() }]
  })),
  
  removeNotification: (id) => set(state => ({
    notifications: state.notifications.filter(n => n.id !== id)
  })),
  
  clearNotifications: () => set({ notifications: [] }),
  
  // Theme management
  toggleTheme: () => set(state => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  })),
  
  setTheme: (theme) => set({ theme }),
  
  // Getters
  getLoading: () => get().isLoading,
  getError: () => get().error,
  getNotifications: () => get().notifications,
  getTheme: () => get().theme
}))

export default useAppStore 