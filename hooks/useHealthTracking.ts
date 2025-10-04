'use client'

import { useState, useEffect } from 'react'

interface HealthData {
  date: Date
  moodRating: number
  energyLevel: number
  sleepHours: number
  exerciseMinutes: number
}

export function useHealthTracking(userId: string) {
  const [healthData, setHealthData] = useState<HealthData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchHealthData = async () => {
    try {
      const response = await fetch(`/api/health/history?userId=${userId}`)
      const data = await response.json()
      setHealthData(data)
    } catch (error) {
      console.error('Failed to fetch health data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const logHealthData = async (data: Partial<HealthData>) => {
    try {
      const response = await fetch('/api/health/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, date: new Date() })
      })

      if (response.ok) {
        fetchHealthData() // Refresh data
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to log health data:', error)
      return false
    }
  }

  useEffect(() => {
    if (userId) {
      fetchHealthData()
    }
  }, [userId])

  return {
    healthData,
    isLoading,
    logHealthData,
    refreshData: fetchHealthData
  }
}
