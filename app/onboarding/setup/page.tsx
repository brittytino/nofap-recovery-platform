'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function OnboardingSetupPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Setup Your Profile</h1>
        <p className="text-gray-600 mb-8">Complete your profile to get started</p>
        <div className="space-y-6">
          <Button onClick={() => router.push('/dashboard')} className="w-full">
            Continue to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  )
}

