'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface EnergyChartProps {
  userId: string
}

export function EnergyChart({ userId }: EnergyChartProps) {
  const [energyData, setEnergyData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEnergyData()
  }, [userId])

  const fetchEnergyData = async () => {
    try {
      const response = await fetch(`/api/health/energy-history?userId=${userId}`)
      const data = await response.json()
      setEnergyData(data)
    } catch (error) {
      console.error('Failed to fetch energy data:', error)
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
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Energy Levels</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={energyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="energy" 
              stroke="#eab308" 
              fill="#fef3c7" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
