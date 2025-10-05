'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Award, Crown } from 'lucide-react'

interface LeaderboardProps {
  userId: string
}

interface LeaderboardEntry {
  id: string
  username: string
  level: number
  totalXP: number
  currentStreak: number
  rank: number
  isCurrentUser: boolean
}

export function Leaderboard({ userId }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null)
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'allTime'>('weekly')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchLeaderboard()
  }, [userId, timeframe])

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/achievements/leaderboard?timeframe=${timeframe}&userId=${userId}`)
      const data = await response.json()
      setLeaderboard(data.leaderboard)
      setUserRank(data.userRank)
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Trophy className="h-5 w-5 text-gray-400" />
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />
      default:
        return <Award className="h-5 w-5 text-gray-300" />
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-50 border-yellow-200'
      case 2:
        return 'bg-gray-50 border-gray-200'
      case 3:
        return 'bg-amber-50 border-amber-200'
      default:
        return 'bg-white border-gray-200'
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-1">
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Community Leaderboard</h3>
        <div className="flex space-x-2">
          {(['weekly', 'monthly', 'allTime'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-xs rounded-full font-medium ${
                timeframe === period
                  ? 'bg-recovery-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {period === 'allTime' ? 'All Time' : period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Current User Rank */}
      {userRank && userRank.rank > 10 && (
        <div className="mb-4 p-3 bg-recovery-50 border border-recovery-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-sm font-medium text-recovery-700">Your Rank:</div>
              <Badge variant="secondary">#{userRank.rank}</Badge>
            </div>
            <div className="text-sm text-recovery-600">
              {userRank.totalXP} XP • Level {userRank.level}
            </div>
          </div>
        </div>
      )}

      {/* Top 10 */}
      <div className="space-y-2">
        {leaderboard.map((entry) => (
          <div
            key={entry.id}
            className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
              entry.isCurrentUser
                ? 'bg-recovery-50 border-recovery-200'
                : getRankColor(entry.rank)
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 min-w-12">
                {getRankIcon(entry.rank)}
                <span className="font-bold text-gray-700">#{entry.rank}</span>
              </div>
              
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  {entry.username.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="font-medium text-gray-900">
                  {entry.isCurrentUser ? 'You' : entry.username}
                </div>
                <div className="text-sm text-gray-600">
                  {entry.currentStreak} day streak
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-semibold text-recovery-600">{entry.totalXP} XP</div>
              <div className="text-sm text-gray-500">Level {entry.level}</div>
            </div>
          </div>
        ))}
      </div>

      {leaderboard.length === 0 && (
        <div className="text-center py-8">
          <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No rankings yet</h3>
          <p className="text-gray-600">
            Keep earning XP to appear on the leaderboard!
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">How Rankings Work</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Rankings based on total XP earned</li>
          <li>• Weekly rankings reset every Monday</li>
          <li>• Monthly rankings reset on the 1st</li>
          <li>• All usernames are anonymized for privacy</li>
        </ul>
      </div>
    </Card>
  )
}
