'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Flame, Users, Trophy, Zap } from 'lucide-react'

interface WelcomeStepsProps {
  onNext: (data: any) => void
}

export function WelcomeSteps({ onNext }: WelcomeStepsProps) {
  return (
    <Card className="p-8 text-center">
      <div className="mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Flame className="text-white text-3xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Streak Warrior
        </h1>
        <p className="text-lg text-gray-600">
          Build self-control. Reclaim your time. Transform your life.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-orange-50 rounded-lg">
          <Flame className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <h3 className="font-semibold text-orange-900 mb-1">Streak Tracking</h3>
          <p className="text-sm text-orange-700">Build discipline through daily streaks</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-green-900 mb-1">Brotherhood Support</h3>
          <p className="text-sm text-green-700">Anonymous warriors supporting each other</p>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded-lg">
          <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="font-semibold text-yellow-900 mb-1">Milestone Rewards</h3>
          <p className="text-sm text-yellow-700">Unlock achievements at 7, 30, 90+ days</p>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg">
          <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-blue-900 mb-1">Urge Emergency</h3>
          <p className="text-sm text-blue-700">Instant support when you need it most</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-left p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Your NoFap journey includes:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Daily check-ins: "Did you stay clean today?"</li>
            <li>• Milestone celebrations (7, 30, 90, 365 days)</li>
            <li>• Anonymous forum for sharing struggles & victories</li>
            <li>• Crisis support with immediate coping strategies</li>
            <li>• Track benefits: energy, confidence, focus improvements</li>
          </ul>
        </div>

        <Button onClick={() => onNext({})} className="w-full" size="lg">
          Start My Journey
        </Button>
      </div>
    </Card>
  )
}
