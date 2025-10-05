'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Calendar, Target } from 'lucide-react'

interface StreakInsightsProps {
  userId: string
}

interface Insight {
  type: 'success' | 'warning' | 'info'
  title: string
  message: string
  icon: React.ReactNode
}

export function StreakInsights({ userId }: StreakInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInsights()
  }, [userId])

  const fetchInsights = async () => {
    try {
      const response = await fetch(`/api/streak/insights?userId=${userId}`)
      const data = await response.json()
      
      const generatedInsights = generateInsights(data)
      setInsights(generatedInsights)
    } catch (error) {
      console.error('Failed to fetch insights:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateInsights = (data: any): Insight[] => {
    const insights: Insight[] = []

    // Streak performance insight
    if (data.currentStreak > data.averageStreak) {
      insights.push({
        type: 'success',
        title: 'Above Average Performance',
        message: `Your current streak is ${data.currentStreak - data.averageStreak} days above your average!`,
        icon: <TrendingUp className="h-4 w-4 text-green-600" />
      })
    }

    // Consistency insight
    if (data.consistencyScore > 80) {
      insights.push({
        type: 'success',
        title: 'Great Consistency',
        message: `You've maintained consistency in ${data.consistencyScore}% of your recovery days.`,
        icon: <Target className="h-4 w-4 text-blue-600" />
      })
    }

    // Milestone reminder
    const nextMilestone = getNextMilestone(data.currentStreak)
    if (nextMilestone) {
      insights.push({
        type: 'info',
        title: 'Upcoming Milestone',
        message: `${nextMilestone.days - data.currentStreak} days until you reach ${nextMilestone.name}!`,
        icon: <Calendar className="h-4 w-4 text-purple-600" />
      })
    }

    // Warning for patterns
    if (data.riskFactors && data.riskFactors.length > 0) {
      insights.push({
        type: 'warning',
        title: 'Pattern Alert',
        message: `Pay attention to ${data.riskFactors[0]} - it's been a challenge before.`,
        icon: <TrendingDown className="h-4 w-4 text-yellow-600" />
      })
    }

    return insights
  }

  const getNextMilestone = (currentStreak: number) => {
    const milestones = [
      { days: 7, name: 'Week Warrior' },
      { days: 30, name: 'Month Master' },
      { days: 90, name: 'Quarter Champion' },
      { days: 180, name: 'Half Year Hero' },
      { days: 365, name: 'Year Legend' }
    ]

    return milestones.find(m => m.days > currentStreak)
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-2 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  const getInsightStyle = (type: string) => {
    const styles = {
      success: 'border-l-green-500 bg-green-50',
      warning: 'border-l-yellow-500 bg-yellow-50',
      info: 'border-l-blue-500 bg-blue-50'
    }
    return styles[type as keyof typeof styles] || styles.info
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Streak Insights</h3>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`border-l-4 p-4 rounded-r-lg ${getInsightStyle(insight.type)}`}
          >
            <div className="flex items-start space-x-3">
              {insight.icon}
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-700">{insight.message}</p>
              </div>
            </div>
          </div>
        ))}

        {insights.length === 0 && (
          <div className="text-center py-6">
            <Target className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-600">
              Keep tracking your progress to see personalized insights
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
