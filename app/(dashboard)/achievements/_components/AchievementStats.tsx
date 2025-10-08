'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Trophy, Target, Star, Award } from 'lucide-react'

interface AchievementStatsProps {
  userId: string
}

interface Stats {
  totalAchievements: number
  unlockedAchievements: number
  totalXP: number
  currentLevel: number
}

export function AchievementStats({ userId }: AchievementStatsProps) {
  const [stats, setStats] = useState<Stats>({
    totalAchievements: 0,
    unlockedAchievements: 0,
    totalXP: 0,
    currentLevel: 1,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [userId])

  const fetchStats = async () => {
    try {
      const response = await fetch(`/api/achievements/stats?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch achievement stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const completionRate = stats.totalAchievements > 0
    ? Math.round((stats.unlockedAchievements / stats.totalAchievements) * 100)
    : 0

  const statItems = [
    {
      icon: Trophy,
      label: 'Unlocked',
      value: `${stats.unlockedAchievements}/${stats.totalAchievements}`,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Target,
      label: 'Completion',
      value: `${completionRate}%`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Star,
      label: 'Total XP',
      value: stats.totalXP.toLocaleString(),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Award,
      label: 'Level',
      value: stats.currentLevel,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ]

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Stats Overview</h3>
      <div className="space-y-3">
        {statItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg ${item.bgColor}`}
          >
            <div className="flex items-center space-x-3">
              <item.icon className={item.color} size={20} />
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
            <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

