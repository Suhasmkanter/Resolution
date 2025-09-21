import { create } from 'zustand'
import { authService } from '../api/authService'
import { supabase } from '../supabaseClient'
import { apiClient } from '../api/client'

const useAuthStore = create((set, get) => ({
  // State
  session: null,
  loading: true,
  isAdmin: false,
  error: null,
  user: null,
  setUser: (user) => set({ user }), // <-- THIS


  // Initialize auth state
  initialize: async () => {
    try {
      set({ loading: true, error: null })


      // Check if we have a stored token
      const token = authService.getToken()
      console.log(token)
      if (token) {
        // Try to get current user with stored token
        const userResponse = await authService.getCurrentUser()
        if (userResponse.success) {
          const user = userResponse.data ? userResponse.data.user : ''
          const isAdmin = (user && user.role === 'admin') || (user && user.email === 'admin@example.com')
          set({
            user,
            isAdmin,
            loading: false,
            session: { access_token: token }
          })
        } else {
          // Token is invalid, clear it
          authService.clearToken()
          set({
            session: null,
            user: null,
            isAdmin: false,
            loading: false
          })
        }
      } else {
        set({
          session: null,
          user: null,
          isAdmin: false,
          loading: false
        })
      }
    } catch (error) {
      console.error('Error initializing auth:', error)
      authService.clearToken()
      set({
        session: null,
        user: null,
        isAdmin: false,
        loading: false,
        error: error.message
      })
    }
  },

  // Sign up
  signUp: async (userData) => {
    try {
      set({ loading: true, error: null })
      console.log(userData)
      const response = await authService.signUp(userData)
      console.log(response, "Print the response bro ")

      if ((response.success && response.data)) {
        const user = response.data.user
        const isAdmin = (user && user.role === 'admin') || (user && user.email === 'admin@example.com')
        console.log(response.data.session, "The session data")
        set({
          session: response.data.session,
          user,
          isAdmin,
          loading: false
        })
      } else {
        set({ loading: false })
      }

      return response
    } catch (error) {
      console.error('Error signing up:', error)
      set({ loading: false, error: error.message })
      throw error
    }
  },

  // Sign in with password
  signIn: async (credentials) => {
    try {
      set({ loading: true, error: null })
      const response = await authService.signIn(credentials)

      if ((response.success && response.data.session)) {
        const user = response.data.user
        const isAdmin = (user && user.role === 'admin') || (user && user.email === 'admin@example.com')
        set({
          session: response.data.session,
          user,
          isAdmin,
          loading: false
        })
      } else {
        set({ loading: false })
      }

      return response
    } catch (error) {
      console.error('Error signing in:', error)
      set({ loading: false, error: error.message })
      throw error
    }
  },

  // Login with Google
  loginWithGoogle: async () => {
    try {
      set({ loading: true, error: null })
      const response = await authService.getGoogleAuthUrl()
      alert(response.authUrl)
      console.log(response, "The response from google auth url")

      if ((response.success && response.authUrl)) {
        // Redirect to Google OAuth
        window.location.href = response.authUrl
      } else {
        set({ loading: false })
      }

      return response
    } catch (error) {
      console.error('Error getting Google auth URL:', error)
      set({ loading: false, error: error.message })
      throw error
    }
  },

  // Handle auth callback
  handleAuthCallback: async (token_hash, type) => {
    try {
      set({ loading: true, error: null })
      const response = await authService.handleAuthCallback(token_hash, type)
      console.log(response, "The response from the handle auth callback")

      if ((response.success && response.data.session)) {
        const user = response.data.user
        const isAdmin = (user && user.role === 'admin') || (user && user.email === 'admin@example.com')
        set({
          session: response.data.session,
          user,
          isAdmin,
          loading: false
        })
      } else {
        set({ loading: false })
      }

      return response
    } catch (error) {
      console.error('Error handling auth callback:', error)
      set({ loading: false, error: error.message })
      throw error
    }
  },

  // Logout
  logout: async () => {
    try {
      set({ loading: true, error: null });
      await supabase.auth.signOut();
      localStorage.removeItem('sb-ptpfxkdkdxznpgqsmvtv-auth-token'); // remove Supabase session

      apiClient.clearToken();
      const datas = await supabase.auth.getSession()
      console.log(datas, "The data after logout");

      set({
        user: null,
        session: null,
        isAdmin: false,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Error logging out:', error);
      set({
        session: null,
        user: null,
        isAdmin: false,
        loading: false,
        error: error.message
      });
    }
  },


  // Update user profile
  updateProfile: async (updates) => {
    try {
      set({ loading: true, error: null })
      const response = await authService.getCurrentUser() // Refresh user data

      if (response.success) {
        const user = response.data ? response.data.user : ''
        const isAdmin = (user && user.role === 'admin') || (user && user.email === 'admin@example.com')
        set({ user, isAdmin, loading: false })
      } else {
        set({ loading: false })
      }

      return response
    } catch (error) {
      console.error('Error updating profile:', error)
      set({ loading: false, error: error.message })
      throw error
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Getters

  getUser: () => get().user,
  getSession: () => get().session,
  getError: () => get().error,
  getLoading: () => get().loading,
  getIsAdmin: () => get().isAdmin,
  isAuthenticated: () => get().user !== null
}))

export default useAuthStore