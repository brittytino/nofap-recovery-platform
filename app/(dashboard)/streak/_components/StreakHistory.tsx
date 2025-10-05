'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface StreakHistoryProps {
  userId: string
}

export function StreakHistory({ userId }: StreakHistoryProps) {
  const [historyData, setHistoryData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStreakHistory()
  }, [userId])

  const fetchStreakHistory = async () => {
    try {
      const response = await fetch(`/api/streak/history?userId=${userId}`)
      const data = await response.json()
      setHistoryData(data)
    } catch (error) {
      console.error('Failed to fetch streak history:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Streak History (90 Days)</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="streak" 
              stroke="#22c55e" 
              strokeWidth={3}
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
