{/*import { useState } from 'react'
import { apiClient } from '../api/client'

export default function ApiTest() {
  const [status, setStatus] = useState('idle')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const testConnection = async () => {
    try {
      setStatus('testing')
      setError(null)
      
      // Test health endpoint
      const response = await apiClient.get('/health')
      setResult(response)
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  const testAuthHealth = async () => {
    try {
      setStatus('testing')
      setError(null)
      
      // Test auth health endpoint
      const response = await apiClient.get('/auth/health')
      setResult(response)
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">API Connection Test</h2>
      
      <div className="space-y-4">
        <div>
          <button
            onClick={testConnection}
            disabled={status === 'testing'}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {status === 'testing' ? 'Testing...' : 'Test Main API'}
          </button>
        </div>
        
        <div>
          <button
            onClick={testAuthHealth}
            disabled={status === 'testing'}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            {status === 'testing' ? 'Testing...' : 'Test Auth API'}
          </button>
        </div>
        
        {status === 'success' && result && (
          <div className="p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold text-green-800">Success!</h3>
            <pre className="text-sm text-green-700 mt-2">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
        
        {status === 'error' && error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-semibold text-red-800">Error!</h3>
            <p className="text-red-700 mt-2">{error}</p>
          </div>
        )}
        
        <div className="text-sm text-gray-600">
          <p><strong>API Base URL:</strong> {import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}</p>
          <p><strong>Status:</strong> {status}</p>
        </div>
      </div>
    </div>
  )
}
*/}