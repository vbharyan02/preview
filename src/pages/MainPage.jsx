import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../lib/supabase'

export default function MainPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  async function logout() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">preview</h1>
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-gray-500">{user.email}</span>}
          <button onClick={logout} className="bg-gray-200 px-4 py-2 rounded text-sm">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto mt-20 px-4 text-center">
        <div className="border rounded-xl p-10">
          <h2 className="text-2xl font-bold mb-2">Welcome to preview</h2>
          <p className="text-gray-500 mb-6">Your app is up and running.</p>
          {user && (
            <div className="bg-gray-50 rounded-lg p-4 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">User ID</span>
                <span className="font-medium text-xs text-gray-600 truncate ml-4">{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
