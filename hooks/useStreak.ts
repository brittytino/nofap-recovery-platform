'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface StreakData {
  currentStreak: number
  longestStreak: number
  streakStart: Date | null
  totalResets: number
}

export function useStreak() {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    streakStart: null,
    totalResets: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStreak = async () => {
    try {
      const response = await fetch('/api/streak/current')
      if (response.ok) {
        const data = await response.json()
        setStreakData(data)
      } else {
        setError('Failed to fetch streak data')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const resetStreak = async () => {
    try {
      const response = await fetch('/api/streak/reset', {
        method: 'POST'
      })

      if (response.ok) {
        const data = await response.json()
        setStreakData(data.user)
        toast.success(data.message)
        return true
      } else {
        toast.error('Failed to reset streak')
        return false
      }
    } catch (err) {
      toast.error('Something went wrong')
      return false
    }
  }

  useEffect(() => {
    fetchStreak()
  }, [])

  return {
    streakData,
    isLoading,
    error,
    refreshStreak: fetchStreak,
    resetStreak
  }
}
