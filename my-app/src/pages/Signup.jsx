import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Button } from '../components/ui/button'
import { FcGoogle } from 'react-icons/fc'

export default function Signup() {
  const { signUp, loading, error, clearError, loginWithGoogle } = useAuthStore()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [showDialog, setShowDialog] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)
    clearError?.()
    if (!fullName || !email || !password) {
      setMessage('Please fill all fields')
      return
    }
    try {
      const res = await signUp({ fullName, email, password })
      console.log("Signup response from the User:", res)
      if (res?.success) {
        setShowDialog(true)
        setMessage('Signup successful. Please check your email to confirm your account.')
      }
    } catch (error) {
      console.error("Signup error:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      {
        showDialog ? <Dialog
          open={showDialog}
          onOpenChange={(open) => {
            if (!open) setShowDialog(true); // prevent closing
          }}
          modal={true} // ensures it’s a modal
        >
          <DialogContent
            onEscapeKeyDown={(e) => e.preventDefault()} // block ESC
            onPointerDownOutside={(e) => e.preventDefault()} // block click outside
          >
            <DialogHeader>
              <DialogTitle>Signup Successful</DialogTitle>
              <DialogDescription>{message}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
          :



          <div className="max-w-md w-full space-y-6 sm:space-y-8 p-6 sm:p-8 bg-white rounded-lg shadow-md">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create account</h2>
              <p className="text-gray-600 text-sm sm:text-base">Sign up to continue</p>
            </div>

            {(message || error) && (
              <div className={`p-3 rounded text-sm ${message ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message || error}
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Button onClick={loginWithGoogle} className="w-full text-sm font-medium text-white border border-gray-300 hover:bg-gray-100">
                  <FcGoogle className="h-4 w-4 inline-block mr-1" /> Sign up with Google
                </Button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Sign up'}
              </button>
            </form>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
            </div>

            <div className="text-center text-xs text-gray-500">
              Google sign-up will be added later.
            </div>
          </div>
      }
    </div>
  )
}
