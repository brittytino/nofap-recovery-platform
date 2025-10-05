'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Star, TrendingUp } from 'lucide-react'

interface XPProgressProps {
  userId: string
}

export function XPProgress({ userId }: XPProgressProps) {
  const [xpData, setXpData] = useState({
    currentXP: 0,
    currentLevel: 1,
    xpForNextLevel: 100,
    totalXPNeeded: 100,
    xpSources: {}
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchXPData()
  }, [userId])

  const fetchXPData = async () => {
    try {
      const response = await fetch(`/api/achievements/xp?userId=${userId}`)
      const data = await response.json()
      setXpData(data)
    } catch (error) {
      console.error('Failed to fetch XP data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  const progressPercentage = (xpData.currentXP / xpData.totalXPNeeded) * 100

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Star className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Level Progress</h3>
      </div>

      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-recovery-600 mb-1">
          Level {xpData.currentLevel}
        </div>
        <div className="text-sm text-gray-600">
          {xpData.currentXP} / {xpData.totalXPNeeded} XP
        </div>
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Progress to Level {xpData.currentLevel + 1}</span>
          <span className="font-medium">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-3" />
        <div className="text-xs text-gray-500 text-center">
          {xpData.xpForNextLevel} XP needed for next level
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          XP Sources
        </h4>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Daily streaks</span>
            <span className="font-medium text-recovery-600">10 XP/day</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Health logging</span>
            <span className="font-medium text-blue-600">5 XP</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Challenge completion</span>
            <span className="font-medium text-purple-600">25-50 XP</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Forum participation</span>
            <span className="font-medium text-green-600">15 XP</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Achievement unlocked</span>
            <span className="font-medium text-yellow-600">100 XP</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-gradient-to-r from-recovery-50 to-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <strong>Level {xpData.currentLevel + 1} Rewards:</strong> Unlock advanced challenges, 
          exclusive badges, and special community privileges!
        </p>
      </div>
    </Card>
  )
}
