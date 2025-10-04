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
          <span className="text-white text-2xl font-bold">R</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to Recovery Platform
        </h1>
        <p className="text-lg text-gray-600">
          Your journey to better health starts here
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-blue-900 mb-1">Track Progress</h3>
          <p className="text-sm text-blue-700">Monitor your streaks and milestones</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-green-900 mb-1">Community</h3>
          <p className="text-sm text-green-700">Connect with supportive peers</p>
        </div>
        
        <div className="p-4 bg-yellow-50 rounded-lg">
          <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <h3 className="font-semibold text-yellow-900 mb-1">Achievements</h3>
          <p className="text-sm text-yellow-700">Earn badges and level up</p>
        </div>
        
        <div className="p-4 bg-red-50 rounded-lg">
          <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
          <h3 className="font-semibold text-red-900 mb-1">Wellness</h3>
          <p className="text-sm text-red-700">Improve physical and mental health</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="text-left p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">What to expect:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Personalized dashboard with progress tracking</li>
            <li>• Daily challenges tailored to your level</li>
            <li>• Anonymous community support forum</li>
            <li>• Crisis support and coping strategies</li>
            <li>• Health and mood tracking tools</li>
          </ul>
        </div>

        <Button onClick={() => onNext({})} className="w-full" size="lg">
          Get Started
        </Button>
      </div>
    </Card>
  )
}
