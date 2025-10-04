'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { formatDistanceToNow } from 'date-fns'
import { Trophy, Target, Calendar } from 'lucide-react'

interface StreakCounterProps {
  currentStreak: number
  longestStreak: number
  streakStart: Date | null
}

export function StreakCounter({ currentStreak, longestStreak, streakStart }: StreakCounterProps) {
  const [timeElapsed, setTimeElapsed] = useState('')

  useEffect(() => {
    if (!streakStart) return

    const updateTime = () => {
      setTimeElapsed(formatDistanceToNow(new Date(streakStart), { addSuffix: false }))
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [streakStart])

  const getStreakColor = (streak: number) => {
    if (streak >= 365) return 'text-purple-600'
    if (streak >= 90) return 'text-yellow-600'
    if (streak >= 30) return 'text-blue-600'
    if (streak >= 7) return 'text-green-600'
    return 'text-gray-600'
  }

  const getStreakMessage = (streak: number) => {
    if (streak >= 365) return 'Legendary streak! 🏆'
    if (streak >= 90) return 'Amazing progress! 🌟'
    if (streak >= 30) return 'Great momentum! 💪'
    if (streak >= 7) return 'Keep it up! 🔥'
    if (streak >= 1) return 'Good start! 🌱'
    return 'Begin your journey! 🚀'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-6 text-center bg-gradient-to-br from-recovery-50 to-recovery-100 border-recovery-200">
        <div className="flex items-center justify-center mb-2">
          <Target className="text-recovery-600 mr-2" size={24} />
          <span className="text-sm font-medium text-recovery-700">Current Streak</span>
        </div>
        <div className={`text-4xl font-bold mb-1 ${getStreakColor(currentStreak)}`}>
          {currentStreak}
        </div>
        <div className="text-sm text-gray-600">
          {currentStreak === 1 ? 'day' : 'days'}
        </div>
        <div className="text-xs text-recovery-600 mt-2 font-medium">
          {getStreakMessage(currentStreak)}
        </div>
      </Card>

      <Card className="p-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <Trophy className="text-yellow-600 mr-2" size={24} />
          <span className="text-sm font-medium text-gray-700">Best Streak</span>
        </div>
        <div className="text-3xl font-bold text-yellow-600 mb-1">
          {longestStreak}
        </div>
        <div className="text-sm text-gray-600">
          {longestStreak === 1 ? 'day' : 'days'}
        </div>
        {longestStreak > currentStreak && (
          <div className="text-xs text-gray-500 mt-2">
            {longestStreak - currentStreak} days to beat!
          </div>
        )}
      </Card>

      <Card className="p-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <Calendar className="text-blue-600 mr-2" size={24} />
          <span className="text-sm font-medium text-gray-700">Journey Started</span>
        </div>
        <div className="text-lg font-semibold text-blue-600 mb-1">
          {timeElapsed || 'Just now'}
        </div>
        <div className="text-sm text-gray-600">ago</div>
        {streakStart && (
          <div className="text-xs text-gray-500 mt-2">
            {new Date(streakStart).toLocaleDateString()}
          </div>
        )}
      </Card>
    </div>
  )
}
