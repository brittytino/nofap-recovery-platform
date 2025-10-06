'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, RefreshCw } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface VerificationEmailProps {
  email: string
  onResend?: () => void
}

export function VerificationEmail({ email, onResend }: VerificationEmailProps) {
  const [isResending, setIsResending] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    
    try {
      const response = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (response.ok) {
        toast.success('Verification email sent!')
        onResend?.()
      } else {
        toast.error('Failed to resend email')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Card className="p-8 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="h-8 w-8 text-blue-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
      <p className="text-gray-600 mb-6">
        We've sent a verification link to <strong>{email}</strong>. 
        Please check your email and click the verification link to activate your account.
      </p>
      
      <div className="space-y-4">
        <Button 
          onClick={handleResend}
          disabled={isResending}
          variant="outline"
          className="w-full"
        >
          {isResending ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Resending...
            </>
          ) : (
            <>
              <Mail className="h-4 w-4 mr-2" />
              Resend Verification Email
            </>
          )}
        </Button>
        
        <p className="text-xs text-gray-500">
          Didn't receive the email? Check your spam folder or try resending.
        </p>
      </div>
    </Card>
  )
}
