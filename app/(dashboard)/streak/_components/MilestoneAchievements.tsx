'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Star, Target, Crown } from 'lucide-react'

interface MilestoneAchievementsProps {
  userId: string
}

interface Milestone {
  days: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
  isUnlocked: boolean
  unlockedAt?: Date
}

export function MilestoneAchievements({ userId }: MilestoneAchievementsProps) {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [currentStreak, setCurrentStreak] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const milestoneTemplates = [
    {
      days: 1,
      title: 'First Step',
      description: 'Every journey begins with a single step',
      icon: <Target className="h-5 w-5" />,
      color: 'bg-green-100 text-green-800'
    },
    {
      days: 7,
      title: 'Week Warrior',
      description: 'One week of commitment',
      icon: <Star className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      days: 30,
      title: 'Month Master',
      description: 'Building strong habits',
      icon: <Trophy className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      days: 90,
      title: 'Quarter Champion',
      description: 'Three months of discipline',
      icon: <Crown className="h-5 w-5" />,
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      days: 180,
      title: 'Half Year Hero',
      description: 'Six months of transformation',
      icon: <Trophy className="h-5 w-5" />,
      color: 'bg-red-100 text-red-800'
    },
    {
      days: 365,
      title: 'Year Legend',
      description: 'One full year of commitment',
      icon: <Crown className="h-5 w-5" />,
      color: 'bg-indigo-100 text-indigo-800'
    }
  ]

  useEffect(() => {
    fetchMilestones()
  }, [userId])

  const fetchMilestones = async () => {
    try {
      const response = await fetch(`/api/streak/milestones?userId=${userId}`)
      const data = await response.json()
      
      const milestonesWithStatus = milestoneTemplates.map(template => ({
        ...template,
        isUnlocked: data.currentStreak >= template.days,
        unlockedAt: data.milestoneHistory[template.days]
      }))
      
      setMilestones(milestonesWithStatus)
      setCurrentStreak(data.currentStreak)
    } catch (error) {
      console.error('Failed to fetch milestones:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-200 rounded w-24"></div>
                <div className="h-2 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Milestone Achievements</h3>
      
      <div className="space-y-3">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
              milestone.isUnlocked
                ? 'bg-recovery-50 border border-recovery-200'
                : 'bg-gray-50 border border-gray-200 opacity-60'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              milestone.isUnlocked ? 'bg-recovery-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {milestone.icon}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900">{milestone.title}</span>
                <Badge className={milestone.color} variant="secondary">
                  {milestone.days} day{milestone.days > 1 ? 's' : ''}
                </Badge>
                {milestone.isUnlocked && (
                  <Badge variant="default" className="bg-recovery-500">
                    Unlocked!
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{milestone.description}</p>
              {milestone.isUnlocked && milestone.unlockedAt && (
                <p className="text-xs text-recovery-600 mt-1">
                  Achieved on {new Date(milestone.unlockedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Next milestone:</strong> {
            milestones.find(m => !m.isUnlocked)?.title || 'All milestones achieved!'
          }
          {milestones.find(m => !m.isUnlocked) && (
            <span className="text-blue-600">
              {' '}({milestones.find(m => !m.isUnlocked)!.days - currentStreak} days to go)
            </span>
          )}
        </p>
      </div>
    </Card>
  )
}
