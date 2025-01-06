import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../store/userSlice'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would validate credentials with your backend
    dispatch(
      login({
        id: '1',
        name: 'John Doe',
        email: email,
      })
    )
    navigate('/')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
        <div className="space-y-1 mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Welcome back</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Enter your email and password to login to your account
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium dark:text-white">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium dark:text-white">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Sign in
            </button>
            <div className="text-sm text-center text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline dark:text-blue-400">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
