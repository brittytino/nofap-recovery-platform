'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Trophy, Clock, Users, Star, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Challenge {
  id: string
  title: string
  description: string
  category: string
  tier: string
  points: number
  duration: number
  progress?: number
  isCompleted?: boolean
  isJoined?: boolean
  participants?: number
}

interface ChallengeCardProps {
  challenge: Challenge
  onJoin?: (challengeId: string) => void
  onComplete?: (challengeId: string) => void
}

export function ChallengeCard({ challenge, onJoin, onComplete }: ChallengeCardProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleJoin = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/challenges/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId: challenge.id })
      })

      if (response.ok) {
        toast.success('Challenge joined successfully!')
        onJoin?.(challenge.id)
      } else {
        toast.error('Failed to join challenge')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/challenges/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId: challenge.id })
      })

      if (response.ok) {
        toast.success(`Challenge completed! +${challenge.points} XP`)
        onComplete?.(challenge.id)
      } else {
        toast.error('Failed to complete challenge')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const getTierColor = (tier: string) => {
    const colors = {
      'BEGINNER': 'bg-green-100 text-green-800',
      'INTERMEDIATE': 'bg-blue-100 text-blue-800',
      'ADVANCED': 'bg-purple-100 text-purple-800',
      'MASTER': 'bg-yellow-100 text-yellow-800'
    }
    return colors[tier as keyof typeof colors] || colors.BEGINNER
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'FITNESS': return '💪'
      case 'SOCIAL': return '🤝'
      case 'MINDFULNESS': return '🧘'
      case 'PRODUCTIVITY': return '⚡'
      case 'RECOVERY': return '🎯'
      default: return '📋'
    }
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getCategoryIcon(challenge.category)}</div>
          <div>
            <Badge className={getTierColor(challenge.tier)} variant="secondary">
              {challenge.tier}
            </Badge>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-recovery-600">+{challenge.points}</div>
          <div className="text-xs text-gray-500">XP Points</div>
        </div>
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
        {challenge.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {challenge.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{challenge.duration} day{challenge.duration > 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4" />
          <span>{challenge.participants || 0} joined</span>
        </div>
      </div>

      {challenge.isJoined && challenge.progress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{challenge.progress}%</span>
          </div>
          <Progress value={challenge.progress} className="h-2" />
        </div>
      )}

      <div className="space-y-2">
        {challenge.isCompleted ? (
          <Button disabled className="w-full bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="mr-2 h-4 w-4" />
            Completed
          </Button>
        ) : challenge.isJoined ? (
          <div className="space-y-2">
            <Button 
              onClick={handleComplete}
              disabled={isLoading || (challenge.progress || 0) < 100}
              className="w-full"
            >
              {isLoading ? 'Completing...' : 'Mark Complete'}
            </Button>
            <div className="text-xs text-center text-gray-500">
              Complete all requirements to finish this challenge
            </div>
          </div>
        ) : (
          <Button 
            onClick={handleJoin}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              'Joining...'
            ) : (
              <>
                <Trophy className="mr-2 h-4 w-4" />
                Join Challenge
              </>
            )}
          </Button>
        )}
      </div>

      {challenge.tier === 'MASTER' && (
        <div className="mt-3 flex items-center justify-center space-x-1 text-xs text-yellow-600">
          <Star className="h-3 w-3" />
          <span>Master Level Challenge</span>
          <Star className="h-3 w-3" />
        </div>
      )}
    </Card>
  )
}
