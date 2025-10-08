'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Trophy, TrendingUp, Heart, Target, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface ActivityFeedProps {
  userId: string
}

interface Activity {
  id: string
  type: 'achievement' | 'streak' | 'mood' | 'challenge' | 'milestone'
  title: string
  description: string
  createdAt: Date
  icon?: string
}

export function ActivityFeed({ userId }: ActivityFeedProps) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [userId])

  const fetchActivities = async () => {
    try {
      const response = await fetch(`/api/user/activities?userId=${userId}&limit=10`)
      if (response.ok) {
        const data = await response.json()
        setActivities(data)
      }
    } catch (error) {
      console.error('Failed to fetch activities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getActivityIcon = (type: Activity['type']) => {
    const icons = {
      achievement: Trophy,
      streak: TrendingUp,
      mood: Heart,
      challenge: Target,
      milestone: Calendar,
    }
    return icons[type] || Trophy
  }

  const getActivityColor = (type: Activity['type']) => {
    const colors = {
      achievement: 'text-yellow-600 bg-yellow-50',
      streak: 'text-green-600 bg-green-50',
      mood: 'text-pink-600 bg-pink-50',
      challenge: 'text-blue-600 bg-blue-50',
      milestone: 'text-purple-600 bg-purple-50',
    }
    return colors[type] || 'text-gray-600 bg-gray-50'
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-200 h-10 w-10"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No recent activity</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = getActivityIcon(activity.type)
            const colorClass = getActivityColor(activity.type)

            return (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${colorClass}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}

