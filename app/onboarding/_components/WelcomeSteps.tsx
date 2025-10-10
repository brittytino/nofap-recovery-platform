'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Target, Users, Trophy, Heart } from 'lucide-react'

interface WelcomeStepsProps {
  onNext: (data: any) => void
}

export function WelcomeSteps({ onNext }: WelcomeStepsProps) {
  return (
    <Card className="p-8 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-recovery-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl font-bold">C</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Clarity
        </h1>
        <p className="text-lg text-gray-600">
          Your digital wellness transformation starts here
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-blue-900 mb-1">Multi-Habit Tracking</h3>
          <p className="text-sm text-blue-700">Track social media, gaming, streaming & more</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-green-900 mb-1">Anonymous Community</h3>
          <p className="text-sm text-green-700">Share struggles without judgment</p>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded-lg">
          <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="font-semibold text-yellow-900 mb-1">Gamification</h3>
          <p className="text-sm text-yellow-700">XP, achievements, and challenges</p>
        </div>
        
        <div className="p-4 bg-red-50 rounded-lg">
          <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <h3 className="font-semibold text-red-900 mb-1">Wellness Analytics</h3>
          <p className="text-sm text-red-700">See how detox improves your life</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-left p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">What to expect:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Track multiple digital addictions simultaneously</li>
            <li>• Daily challenges for real-world habit building</li>
            <li>• Safe space to discuss social media, gaming, streaming, adult content</li>
            <li>• Urge management tools and coping strategies</li>
            <li>• See how reducing screen time improves mood, energy & focus</li>
          </ul>
        </div>

        <Button onClick={() => onNext({})} className="w-full" size="lg">
          Get Started
        </Button>
      </div>
    </Card>
  )
}
