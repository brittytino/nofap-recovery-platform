'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Chrome, Github, Mail } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showEmailRegister, setShowEmailRegister] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/onboarding' })
    } catch (error) {
      console.error('Google sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGitHubSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('github', { callbackUrl: '/onboarding' })
    } catch (error) {
      console.error('GitHub sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Account created successfully!')
        // Auto sign in after registration
        await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          callbackUrl: '/onboarding',
        })
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('An error occurred during registration')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-recovery-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-recovery-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">C</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Start Your Transformation
          </h1>
          <p className="text-gray-600">
            Join thousands breaking free from digital addiction
          </p>
        </div>

        {!showEmailRegister ? (
          <>
            <div className="space-y-4">
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-300 h-12 text-base font-medium"
                type="button"
              >
                <Chrome className="h-5 w-5 mr-2" />
                Sign up with Google
              </Button>

              <Button
                onClick={handleGitHubSignIn}
                disabled={isLoading}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white h-12 text-base font-medium"
                type="button"
              >
                <Github className="h-5 w-5 mr-2" />
                Sign up with GitHub
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <Button
                onClick={() => setShowEmailRegister(true)}
                disabled={isLoading}
                variant="outline"
                className="w-full h-12 text-base font-medium"
                type="button"
              >
                <Mail className="h-5 w-5 mr-2" />
                Sign up with Email
              </Button>
            </div>
          </>
        ) : (
          <form onSubmit={handleEmailRegister} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                minLength={8}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
                className="mt-1"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-recovery-500 hover:bg-recovery-600 h-12 text-base font-medium"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>

            <Button
              type="button"
              onClick={() => setShowEmailRegister(false)}
              variant="ghost"
              className="w-full"
            >
              ← Back to social signup
            </Button>
          </form>
        )}

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-recovery-600 hover:text-recovery-700 font-medium">
              Sign in
            </a>
          </p>
        </div>

        {!showEmailRegister && (
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-sm font-semibold text-green-900 mb-2">What you'll get:</h3>
              <ul className="text-xs text-green-800 space-y-1">
                <li>✅ Track multiple digital habits</li>
                <li>✅ Daily motivation and support</li>
                <li>✅ Anonymous community (no judgment)</li>
                <li>✅ See how detox improves your life</li>
                <li>✅ Urge management tools</li>
              </ul>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800 text-center">
                🔒 Your privacy is our priority. All data is encrypted and secure.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}
