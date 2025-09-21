import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import { supabase } from '../supabaseClient'

export default function AuthCallback() {
  const { handleAuthCallback, loading } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {

    async function run() {
      const hashParams = new URLSearchParams(location.hash.substring(1)) // remove the "#"
      // const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href)
      // console.log(data, 'ExchangeCodeForSession: Code of the Users ')
      const token_hash = hashParams.get('access_token')
      const type = hashParams.get('type')
      try {
        if (token_hash && type) {
          await handleAuthCallback(token_hash, type)
        }
      } catch (error) {
        console.error('Error handling auth callback:', error)
      } finally {
        navigate('/')
      }
    }

    run()



  }, [handleAuthCallback, location.search, navigate])

  // AuthCallback.jsx
  // useEffect(() => {
  //   async function run() {
  //     const { data, error } = await supabase.auth.getSession()
  //     if (data?.session) {
  //       // store in your auth store
  //       useAuthStore.getState().setUser(data.session.user)
  //       // redirect or communicate back
  //       console.log(window.opener, "The window opener")
  //       if (window.opener) {
  //         // main tab exists
  //         console.log('Opener exists, reloading main window and closing this one.')
  //         window.opener.location.reload()  // refresh main tab
  //         window.location.href = '/'       // send them to home/dashboard
  //       } else {
  //         // fallback: redirect here
  //         navigate('/')
  //       }
  //     }
  //   }
  //   run()
  // }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-lg">Completing sign in...</div>
    </div>
  )
}
