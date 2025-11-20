'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Lock, User, Phone } from 'lucide-react'
import { useAnalytics } from '@luxats/analytics/providers'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const { trackEvent, trackConversion } = useAnalytics()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptedTerms) {
      alert('Please accept the terms and conditions')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setLoading(true)

    // Track signup attempt
    trackEvent({
      category: 'Auth',
      action: 'Signup Attempt',
      label: 'Email Signup',
    })

    // Store user data in localStorage (demo mode - no backend)
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password, // In production, this would be hashed server-side
      createdAt: new Date().toISOString(),
      isDemoAccount: true
    }

    // Save to localStorage
    localStorage.setItem('lux_user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userEmail', formData.email)

    // Track successful signup
    trackConversion({
      type: 'signup',
      value: 0,
      metadata: {
        method: 'email',
        source: 'direct',
      },
    })

    await new Promise((resolve) => setTimeout(resolve, 500))
    setLoading(false)

    // Redirect to trading page
    window.location.href = '/trade'
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-success to-info bg-clip-text text-transparent">
            LUX
          </h1>
          <p className="text-muted-1">Create your demo trading account</p>
          <p className="text-xs text-white/60 mt-2">
            No backend required - instant access to demo trading
          </p>
        </div>

        {/* Signup Form */}
        <div className="glass-effect rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" size={20} />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-success text-white placeholder-muted-2"
                    placeholder="John"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" size={20} />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-success text-white placeholder-muted-2"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" size={20} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-success text-white placeholder-muted-2"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" size={20} />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-secondary border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-success text-white placeholder-muted-2"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" size={20} />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={8}
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-success text-white placeholder-muted-2"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-xs text-muted-2">Minimum 8 characters</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-2" size={20} />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-secondary border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-success text-white placeholder-muted-2"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="w-4 h-4 mt-1 bg-secondary border-accent rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-muted-1">
                I agree to the{' '}
                <Link href="/terms" className="text-success hover:text-success/80">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-success hover:text-success/80">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !acceptedTerms}
              className="w-full px-6 py-3 bg-success text-white rounded-lg font-semibold hover:bg-success/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Creating account...' : 'Create Demo Account'}
              {!loading && <ArrowRight size={20} />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-accent"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-secondary text-muted-2">Or sign up with</span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => {
                trackEvent({
                  category: 'Auth',
                  action: 'Social Signup',
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
                  action: 'Social Signup',
                  label: 'Apple',
                })
              }}
              className="px-4 py-3 bg-secondary border border-accent rounded-lg hover:bg-accent transition-colors text-sm font-medium"
            >
              Apple
            </button>
          </div>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-muted-1">
          Already have an account?{' '}
          <Link href="/login" className="text-success hover:text-success/80 font-semibold">
            Sign in
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
