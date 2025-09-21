import { apiClient } from './client'

export const authService = {
  // Sign up with email and password
  async signUp(userData) {
    try {
      console.log(userData, 'Dont know me bro ')
      const response = await apiClient.post('/auth/signup', userData)
      console.log(response, 'The data of the values ')


      // if (response.data.session.access_token != null) {
      //   apiClient.setToken(response.data.session.access_token)
      // }
      // console.log(response, 'The data of the values ');
      return response
    } catch (error) {
      throw error
    }
  },

  // Sign in with password
  async signIn(credentials) {
    try {
      const response = await apiClient.post('/auth/signin', credentials)
      if (response.data.session.access_token) {
        apiClient.setToken(response.data.session.access_token)
      }
      return response
    } catch (error) {
      throw error
    }
  },

  // Send magic link
  async sendMagicLink(email) {
    try {
      return await apiClient.post('/auth/magic-link', { email })
    } catch (error) {
      throw error
    }
  },

  // Get Google OAuth URL
  async getGoogleAuthUrl() {
    try {
      return await apiClient.get('/auth/google')
    } catch (error) {
      throw error
    }
  },

  // Handle auth callback
  async handleAuthCallback(token_hash, type) {
    try {
      const response = await apiClient.get(`/auth/callback?token_hash=${token_hash}&type=${type}`)
      console.log(response)
      if (response.data.session.access_token) {
        apiClient.setToken(response.data.session.access_token)
      }
      return response
    } catch (error) {
      throw error
    }
  },

  // Resend confirmation email
  async resendConfirmation(email) {
    try {
      return await apiClient.post('/auth/resend-confirmation', { email })
    } catch (error) {
      throw error
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      return await apiClient.get('/auth/me')
    } catch (error) {
      throw error
    }
  },

  // Sign out
  async signOut() {
    try {
      await apiClient.post('/auth/signout')
      apiClient.clearToken()
      return { success: true }
    } catch (error) {
      // Even if logout fails on server, clear local token
      apiClient.clearToken()
      throw error
    }
  },

  // Refresh token
  async refreshToken(refresh_token) {
    try {
      const response = await apiClient.post('/auth/refresh', { refresh_token })
      if (response.data.session.access_token) {
        apiClient.setToken(response.data.session.access_token)
      }
      return response
    } catch (error) {
      throw error
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!apiClient.token
  },

  // Get stored token
  getToken() {
    return apiClient.token
  }
}