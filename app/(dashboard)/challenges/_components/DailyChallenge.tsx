'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Trophy } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Challenge {
  id: string
  title: string
  description: string
  points: number
  progress: number
  target: number
  isCompleted: boolean
  tier: string
}

interface DailyChallengeProps {
  userId: string
}

export function DailyChallenge({ userId }: DailyChallengeProps) {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDailyChallenge()
  }, [userId])

  const fetchDailyChallenge = async () => {
    try {
      const response = await fetch(`/api/challenges/daily?userId=${userId}`)
      const data = await response.json()
      setChallenge(data.challenge)
    } catch (error) {
      console.error('Failed to fetch daily challenge:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const completeChallenge = async () => {
    if (!challenge) return

    try {
      const response = await fetch('/api/challenges/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId: challenge.id })
      })

      if (response.ok) {
        toast.success(`Challenge completed! +${challenge.points} XP`)
        setChallenge(prev => prev ? { ...prev, isCompleted: true, progress: prev.target } : null)
      } else {
        toast.error('Failed to complete challenge')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </Card>
    )
  }

  if (!challenge) {
    return (
      <Card className="p-6 text-center">
        <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Challenge Today</h3>
        <p className="text-gray-600">Check back tomorrow for a new challenge!</p>
      </Card>
    )
  }

  const progressPercentage = (challenge.progress / challenge.target) * 100

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">Today's Challenge</h3>
            <Badge variant={challenge.tier === 'BEGINNER' ? 'default' : challenge.tier === 'INTERMEDIATE' ? 'secondary' : 'destructive'}>
              {challenge.tier}
            </Badge>
          </div>
          <h4 className="text-lg font-medium text-recovery-600 mb-2">{challenge.title}</h4>
          <p className="text-gray-600">{challenge.description}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-recovery-600">+{challenge.points}</div>
          <div className="text-xs text-gray-500">XP Points</div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{challenge.progress}/{challenge.target}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {challenge.isCompleted ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <Clock className="h-5 w-5 text-gray-400" />
            )}
            <span className={`text-sm font-medium ${
              challenge.isCompleted ? 'text-green-600' : 'text-gray-600'
            }`}>
              {challenge.isCompleted ? 'Completed!' : 'In Progress'}
            </span>
          </div>
          
          {!challenge.isCompleted && challenge.progress >= challenge.target && (
            <Button onClick={completeChallenge}>
              Mark Complete
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
