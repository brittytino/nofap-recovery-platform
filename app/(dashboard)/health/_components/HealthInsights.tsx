'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface HealthInsightsProps {
  userId: string
}

interface Insight {
  metric: string
  value: number
  change: number
  trend: 'up' | 'down' | 'stable'
  message: string
}

export function HealthInsights({ userId }: HealthInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchInsights()
  }, [userId])

  const fetchInsights = async () => {
    try {
      const response = await fetch(`/api/health/insights?userId=${userId}`)
      const data = await response.json()
      setInsights(data.insights)
    } catch (error) {
      console.error('Failed to fetch insights:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-gray-400" />
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-2 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Insights</h3>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div key={index} className="border-l-4 border-recovery-200 pl-4">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-900">{insight.metric}</span>
              <div className="flex items-center space-x-1">
                {getTrendIcon(insight.trend)}
                <span className="text-sm text-gray-600">{insight.value}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{insight.message}</p>
          </div>
        ))}
        
        {insights.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-600">
              Log your health data for a few days to see insights
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
