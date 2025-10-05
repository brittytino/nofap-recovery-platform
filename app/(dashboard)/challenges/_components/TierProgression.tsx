'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Trophy, Star, Target, Crown } from 'lucide-react'

interface TierProgressionProps {
  userId: string
}

interface TierInfo {
  name: string
  minStreak: number
  color: string
  icon: React.ReactNode
  description: string
}

const tiers: TierInfo[] = [
  {
    name: 'BEGINNER',
    minStreak: 0,
    color: 'bg-green-100 text-green-800',
    icon: <Target className="h-4 w-4" />,
    description: 'Starting your journey'
  },
  {
    name: 'INTERMEDIATE',
    minStreak: 30,
    color: 'bg-blue-100 text-blue-800',
    icon: <Star className="h-4 w-4" />,
    description: 'Building strong habits'
  },
  {
    name: 'ADVANCED',
    minStreak: 90,
    color: 'bg-purple-100 text-purple-800',
    icon: <Trophy className="h-4 w-4" />,
    description: 'Mastering self-discipline'
  },
  {
    name: 'MASTER',
    minStreak: 365,
    color: 'bg-yellow-100 text-yellow-800',
    icon: <Crown className="h-4 w-4" />,
    description: 'Living the transformed life'
  }
]

export function TierProgression({ userId }: TierProgressionProps) {
  const [currentStreak, setCurrentStreak] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUserProgress()
  }, [userId])

  const fetchUserProgress = async () => {
    try {
      const response = await fetch(`/api/streak/current?userId=${userId}`)
      const data = await response.json()
      setCurrentStreak(data.currentStreak)
    } catch (error) {
      console.error('Failed to fetch user progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCurrentTier = () => {
    for (let i = tiers.length - 1; i >= 0; i--) {
      if (currentStreak >= tiers[i].minStreak) {
        return { tier: tiers[i], index: i }
      }
    }
    return { tier: tiers[0], index: 0 }
  }

  const getNextTier = (currentIndex: number) => {
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  const { tier: currentTier, index: currentIndex } = getCurrentTier()
  const nextTier = getNextTier(currentIndex)

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tier Progression</h3>
      
      <div className="space-y-6">
        {/* Current Tier */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-2">
            {currentTier.icon}
            <Badge className={currentTier.color} variant="secondary">
              {currentTier.name}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mb-4">{currentTier.description}</p>
          <div className="text-2xl font-bold text-recovery-600">{currentStreak} days</div>
        </div>

        {/* Progress to Next Tier */}
        {nextTier && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Progress to {nextTier.name}
              </span>
              <span className="text-sm text-gray-500">
                {Math.max(0, nextTier.minStreak - currentStreak)} days to go
              </span>
            </div>
            
            <Progress 
              value={(currentStreak / nextTier.minStreak) * 100} 
              className="h-3"
            />
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>{currentStreak}</span>
              <span>{nextTier.minStreak}</span>
            </div>
          </div>
        )}

        {/* All Tiers Overview */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">All Tiers</h4>
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`flex items-center justify-between p-3 rounded-lg ${
                currentStreak >= tier.minStreak 
                  ? 'bg-recovery-50 border border-recovery-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStreak >= tier.minStreak ? 'bg-recovery-500 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {tier.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{tier.name}</div>
                  <div className="text-sm text-gray-600">{tier.description}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{tier.minStreak}+ days</div>
                {currentStreak >= tier.minStreak && (
                  <div className="text-xs text-recovery-600">Unlocked!</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
