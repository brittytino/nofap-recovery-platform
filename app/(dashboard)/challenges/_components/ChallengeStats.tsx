'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Trophy, Target, Clock, Star } from 'lucide-react'

interface ChallengeStatsProps {
  userId: string
}

interface Stats {
  totalCompleted: number
  totalPoints: number
  currentStreak: number
  averageCompletion: number
}

export function ChallengeStats({ userId }: ChallengeStatsProps) {
  const [stats, setStats] = useState<Stats>({
    totalCompleted: 0,
    totalPoints: 0,
    currentStreak: 0,
    averageCompletion: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [userId])

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/challenges/stats?userId=${userId}`)
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch challenge stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Completed',
      value: stats.totalCompleted,
      icon: Trophy,
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      title: 'XP Earned',
      value: stats.totalPoints,
      icon: Star,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      title: 'Current Streak',
      value: stats.currentStreak,
      icon: Target,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Avg Completion',
      value: `${stats.averageCompletion}%`,
      icon: Clock,
      color: 'text-blue-600 bg-blue-50'
    }
  ]

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenge Stats</h3>
      
      <div className="space-y-4">
        {statCards.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{stat.title}</div>
              <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-recovery-50 rounded-lg">
        <h4 className="font-medium text-recovery-900 mb-2">This Week's Focus</h4>
        <p className="text-sm text-recovery-700">
          Complete 3 more challenges to reach your weekly goal and earn bonus XP!
        </p>
      </div>
    </Card>
  )
}
