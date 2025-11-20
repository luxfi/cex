'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Mail, Lock } from 'lucide-react'
import { useAnalytics } from '@luxats/analytics/providers'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { trackEvent, trackConversion } = useAnalytics()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Track login attempt
    trackEvent({
      category: 'Auth',
      action: 'Login Attempt',
      label: 'Email Login',
    })

    // Check if user exists in localStorage
    const storedUser = localStorage.getItem('lux_user')
    
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        
        // Check credentials
        if (userData.email === email && userData.password === password) {
          // Successful login
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('userEmail', email)

          // Track successful login
          trackConversion({
            type: 'login',
            metadata: {
              method: 'email',
            },
          })

          await new Promise((resolve) => setTimeout(resolve, 500))
          setLoading(false)

          // Redirect to the redirect URL or trading page
          const redirectUrl = searchParams.get('redirect') || '/trade'
          window.location.href = redirectUrl
        } else {
          setError('Invalid email or password')
          setLoading(false)
        }
      } catch (err) {
        setError('Error logging in. Please try again.')
        setLoading(false)
      }
    } else {
      setError('No account found. Please sign up first.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-success to-info bg-clip-text text-transparent">
            LUX
          </h1>
          <p className="text-muted-1">Sign in to your demo account</p>
        </div>

        {/* Login Form */}
        <div className="glass-effect rounded-lg p-8">
          {error && (
            <div className="mb-4 p-3 bg-danger/20 border border-danger/50 rounded-lg text-sm text-danger">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-success text-white placeholder-muted-2"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-success text-white placeholder-muted-2"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 bg-secondary border-accent rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-muted-1">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-success hover:text-success/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-success text-white rounded-lg font-semibold hover:bg-success/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-accent"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-secondary text-muted-2">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                trackEvent({
                  category: 'Auth',
                  action: 'Social Login',
                  label: 'Google',
                })
              }}
              className="px-4 py-3 bg-secondary border border-accent rounded-lg hover:bg-accent transition-colors text-sm font-medium"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => {
                trackEvent({
                  category: 'Auth',
                  action: 'Social Login',
                  label: 'Apple',
                })
              }}
              className="px-4 py-3 bg-secondary border border-accent rounded-lg hover:bg-accent transition-colors text-sm font-medium"
            >
              Apple
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-muted-1">
          Don't have an account?{' '}
          <Link href="/signup" className="text-success hover:text-success/80 font-semibold">
            Sign up for free
          </Link>
        </p>

        {/* Back to Home */}
        <p className="mt-4 text-center">
          <Link href="/" className="text-sm text-muted-2 hover:text-muted-1">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-primary px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-success mx-auto mb-4"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
