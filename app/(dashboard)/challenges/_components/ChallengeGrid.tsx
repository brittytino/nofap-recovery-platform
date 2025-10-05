'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, Clock, Users, CheckCircle } from 'lucide-react'
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
  participants?: number
}

interface ChallengeGridProps {
  userId: string
}

export function ChallengeGrid({ userId }: ChallengeGridProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchChallenges()
  }, [userId, filter])

  const fetchChallenges = async () => {
    try {
      const params = new URLSearchParams({ userId, filter })
      const response = await fetch(`/api/challenges?${params}`)
      const data = await response.json()
      setChallenges(data.challenges)
    } catch (error) {
      console.error('Failed to fetch challenges:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const joinChallenge = async (challengeId: string) => {
    try {
      const response = await fetch('/api/challenges/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challengeId })
      })

      if (response.ok) {
        toast.success('Challenge joined successfully!')
        fetchChallenges()
      } else {
        toast.error('Failed to join challenge')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
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

  const getTierColor = (tier: string) => {
    const colors = {
      'BEGINNER': 'bg-green-100 text-green-800',
      'INTERMEDIATE': 'bg-blue-100 text-blue-800',
      'ADVANCED': 'bg-purple-100 text-purple-800',
      'MASTER': 'bg-yellow-100 text-yellow-800'
    }
    return colors[tier as keyof typeof colors] || colors.BEGINNER
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-gray-900">All Challenges</h2>
        <div className="flex space-x-2">
          {['all', 'active', 'completed', 'available'].map(filterType => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1 text-sm rounded-full font-medium ${
                filter === filterType 
                  ? 'bg-recovery-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map(challenge => (
          <Card key={challenge.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{getCategoryIcon(challenge.category)}</span>
                <Badge className={getTierColor(challenge.tier)} variant="secondary">
                  {challenge.tier}
                </Badge>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-recovery-600">+{challenge.points}</div>
                <div className="text-xs text-gray-500">XP</div>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 mb-2">{challenge.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>{challenge.duration} day{challenge.duration > 1 ? 's' : ''}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{challenge.participants || 0} joined</span>
                </span>
              </div>

              {challenge.progress !== undefined && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>
              )}

              {challenge.isCompleted ? (
                <Button disabled className="w-full">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Completed
                </Button>
              ) : challenge.progress !== undefined ? (
                <Button variant="outline" className="w-full">
                  Continue Challenge
                </Button>
              ) : (
                <Button onClick={() => joinChallenge(challenge.id)} className="w-full">
                  <Trophy className="mr-2 h-4 w-4" />
                  Join Challenge
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {challenges.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No challenges found</h3>
          <p className="text-gray-600">Try adjusting your filters or check back later for new challenges.</p>
        </div>
      )}
    </div>
  )
}
