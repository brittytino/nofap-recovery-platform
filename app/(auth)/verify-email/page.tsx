'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle, Mail, Loader2 } from 'lucide-react'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const token = searchParams.get('token')

  useEffect(() => {
    if (token) {
      verifyEmail(token)
    } else {
      setStatus('error')
      setMessage('Invalid verification link')
    }
  }, [token])

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
      } else {
        setStatus('error')
        setMessage(data.message || 'Verification failed')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong during verification')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-recovery-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="mb-6">
          {status === 'loading' && (
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
            </div>
          )}
          
          {status === 'success' && (
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          )}
          
          {status === 'error' && (
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          )}

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {status === 'loading' && 'Verifying Email...'}
            {status === 'success' && 'Email Verified!'}
            {status === 'error' && 'Verification Failed'}
          </h1>
          
          <p className="text-gray-600">
            {message || 'Please wait while we verify your email address...'}
          </p>
        </div>

        {status === 'success' && (
          <div className="space-y-4">
            <Link href="/login">
              <Button className="w-full">
                Continue to Sign In
              </Button>
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <Link href="/register">
              <Button className="w-full">
                Back to Registration
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                Try Signing In
              </Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  )
}
