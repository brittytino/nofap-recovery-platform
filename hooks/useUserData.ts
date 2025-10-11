'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'

interface UserData {
  currentStreak: number
  longestStreak: number
  totalXP: number
  currentLevel: number
  streakStartDate: Date | null
}

export function useUserData() {
  const { data: session } = useSession()
  const [userData, setUserData] = useState<UserData>({
    currentStreak: 0,
    longestStreak: 0,
    totalXP: 0,
    currentLevel: 1,
    streakStartDate: null
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUserData = useCallback(async () => {
    if (!session?.user?.id) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/user/stats?userId=${session.user.id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }
      
      const data = await response.json()
      setUserData(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  return { userData, isLoading, error, refetch: fetchUserData }
}
