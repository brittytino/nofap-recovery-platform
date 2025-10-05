'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface MoodChartProps {
  userId: string
}

export function MoodChart({ userId }: MoodChartProps) {
  const [moodData, setMoodData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchMoodData()
  }, [userId])

  const fetchMoodData = async () => {
    try {
      const response = await fetch(`/api/health/mood-history?userId=${userId}`)
      const data = await response.json()
      setMoodData(data)
    } catch (error) {
      console.error('Failed to fetch mood data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-48 bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={moodData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Bar dataKey="mood" fill="#ec4899" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
