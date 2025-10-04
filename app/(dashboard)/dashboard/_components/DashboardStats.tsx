'use client'

import { Card } from '@/components/ui/Card'
import { TrendingUp, Heart, Zap, Users } from 'lucide-react'

interface DashboardStatsProps {
  stats: {
    totalResets: number
    averageMood: number
    averageEnergy: number
    communityRank: number
    xpPoints: number
    level: number
  }
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: 'XP Level',
      value: stats.level,
      subtitle: `${stats.xpPoints} XP`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Avg Mood',
      value: `${stats.averageMood}/10`,
      subtitle: 'This week',
      icon: Heart,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      title: 'Energy Level',
      value: `${stats.averageEnergy}/10`,
      subtitle: 'This week',
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Community Rank',
      value: `#${stats.communityRank}`,
      subtitle: 'This month',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ]

  return (
    <>
      {statCards.map((stat, index) => (
        <Card key={index} className={`p-4 ${stat.bgColor} ${stat.borderColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
            <stat.icon className={`${stat.color}`} size={32} />
          </div>
        </Card>
      ))}
    </>
  )
}
