'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { MessageCircle, Users, TrendingUp, Heart } from 'lucide-react'

export function ForumStats() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    activeUsers: 0,
    todayPosts: 0,
    helpfulPosts: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/forum/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Failed to fetch forum stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statItems = [
    {
      label: 'Total Posts',
      value: stats.totalPosts,
      icon: MessageCircle,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: Users,
      color: 'text-green-600 bg-green-50'
    },
    {
      label: 'Today\'s Posts',
      value: stats.todayPosts,
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      label: 'Helpful Posts',
      value: stats.helpfulPosts,
      icon: Heart,
      color: 'text-red-600 bg-red-50'
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
      <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
      <div className="space-y-4">
        {statItems.map((stat, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-lg font-semibold text-gray-900">{stat.value.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-recovery-50 rounded-lg">
        <h4 className="font-medium text-recovery-900 mb-2">Community Guidelines</h4>
        <ul className="text-sm text-recovery-700 space-y-1">
          <li>• Be respectful and supportive</li>
          <li>• No personal attacks or harassment</li>
          <li>• Keep discussions recovery-focused</li>
          <li>• Report inappropriate content</li>
        </ul>
      </div>
    </Card>
  )
}
