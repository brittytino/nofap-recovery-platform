'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Mail } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        setIsEmailSent(true)
        toast.success('Reset instructions sent to your email')
      } else {
        const data = await response.json()
        toast.error(data.message || 'Failed to send reset email')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-recovery-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-recovery-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="h-6 w-6 text-recovery-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEmailSent ? 'Check Your Email' : 'Reset Password'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEmailSent 
              ? 'We sent password reset instructions to your email address'
              : 'Enter your email address and we\'ll send you instructions to reset your password'
            }
          </p>
        </div>

        {!isEmailSent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </form>
        ) : (
          <div className="text-center">
            <div className="p-4 bg-green-50 rounded-lg mb-4">
              <p className="text-green-800 text-sm">
                If an account with email <strong>{email}</strong> exists, 
                you will receive password reset instructions shortly.
              </p>
            </div>
            <Button 
              onClick={() => setIsEmailSent(false)}
              variant="outline" 
              className="w-full"
            >
              Send Again
            </Button>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="inline-flex items-center text-sm text-recovery-600 hover:text-recovery-700"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Sign In
          </Link>
        </div>
      </Card>
    </div>
  )
}
