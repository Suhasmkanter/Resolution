import useAuthStore from '../store/useAuthStore'

export default function Profile() {
  const { user, logout, loading } = useAuthStore()

  // if (!user) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <div className="text-lg">You are not signed in.</div>
  //     </div>
  //   )
  // }

  // return (
  //   <div className="max-w-2xl mx-auto p-6">
  //     <div className="bg-white rounded-lg shadow p-6 space-y-4">
  //       <div className="flex items-center space-x-4">
  //         <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
  //           {(user.fullName?.charAt(0) || user.email?.charAt(0) || 'U').toUpperCase()}
  //         </div>
  //         <div>
  //           <h2 className="text-xl font-semibold">{user.fullName || user.email?.split('@')[0] || 'User'}</h2>
  //           <p className="text-gray-600">{user.email}</p>
  //         </div>
  //       </div>
  //       <div className="pt-4">
  //         <button
  //           onClick={logout}
  //           disabled={loading}
  //           className="px-4 py-2  bg-gradient-to-br from-blue-500 to-purple-600 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50"
  //         >
  //           {loading ? 'Signing out...' : 'Sign out'}
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // )
}
