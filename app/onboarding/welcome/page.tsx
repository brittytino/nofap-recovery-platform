'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function WelcomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Your Recovery Journey!</h1>
        <p className="text-xl text-gray-600 mb-8">We're here to support you every step of the way</p>
        <Button onClick={() => router.push('/onboarding/setup')} size="lg" className="w-full md:w-auto">
          Get Started
        </Button>
      </Card>
    </div>
  )
}

