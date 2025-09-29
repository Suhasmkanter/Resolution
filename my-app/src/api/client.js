// API Client for backend server
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const { data } = await supabase.auth.getSession();
import { supabase } from '../supabaseClient'
console.log(data, "The data from supabase");
class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL
    this.token = localStorage.getItem('authToken') || null;
    console.log(this.token, "The initial token value")
  }

  // Set auth token
  setToken(token) {
    this.token = token
    localStorage.setItem('authToken', token)
  }

  // Clear auth token
  clearToken() {
    this.token = null
    localStorage.removeItem('authToken')
  }

  // Get auth headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      console.log(config, url, 'The config object');
      const response = await fetch(url, config)
      console.log(response, 'The response from the API');

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API request error:', errorData)
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  // POST request
  async post(endpoint, data) {
    alert(endpoint, data, "<-- POST request data")
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  // PATCH request
  async patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // Upload file with FormData
  async upload(endpoint, formData) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
      body: formData,
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Upload failed:', error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()