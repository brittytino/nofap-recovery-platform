'use client'

import { useEffect, useState } from 'react'
import { startOfYear, eachDayOfInterval, endOfYear, format, startOfWeek, addWeeks } from 'date-fns'

interface StreakHeatmapProps {
  userId: string
}

interface DailyActivity {
  date: string
  hasActivity: boolean
  intensity: number // 0-4 (0=none, 4=excellent)
}

export function StreakHeatmap({ userId }: StreakHeatmapProps) {
  const [activities, setActivities] = useState<DailyActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchActivities()
  }, [userId])

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/daily-log/heatmap')
      const data = await response.json()
      setActivities(data.activities || [])
    } catch (error) {
      console.error('Failed to fetch heatmap data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIntensityColor = (intensity: number) => {
    const colors = [
      'bg-gray-100',         // 0 - no activity
      'bg-recovery-200',     // 1 - low
      'bg-recovery-400',     // 2 - medium
      'bg-recovery-600',     // 3 - high
      'bg-recovery-800'      // 4 - excellent
    ]
    return colors[intensity] || colors[0]
  }

  // Generate grid for the past year
  const today = new Date()
  const startDate = startOfYear(today)
  const endDate = endOfYear(today)
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  // Group days by week
  const weeks: Date[][] = []
  let currentWeek: Date[] = []
  
  days.forEach((day, index) => {
    if (index % 7 === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek)
      currentWeek = []
    }
    currentWeek.push(day)
  })
  if (currentWeek.length > 0) weeks.push(currentWeek)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-32 bg-gray-200 rounded-lg" />
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Year at a Glance</h3>
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex mb-2">
            {months.map((month, i) => (
              <div key={month} className="text-xs text-gray-500 w-20">
                {month}
              </div>
            ))}
          </div>

          {/* Heatmap grid */}
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => {
                  const dateStr = format(day, 'yyyy-MM-dd')
                  const activity = activities.find(a => a.date === dateStr)
                  const intensity = activity?.intensity || 0

                  return (
                    <div
                      key={dateStr}
                      className={`w-3 h-3 rounded-sm ${getIntensityColor(intensity)} hover:ring-2 hover:ring-recovery-500 transition-all cursor-pointer`}
                      title={`${format(day, 'MMM d, yyyy')} - ${activity?.hasActivity ? 'Checked in' : 'No activity'}`}
                    />
                  )
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
            <span>Less active</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`}
                />
              ))}
            </div>
            <span>More active</span>
          </div>
        </div>
      </div>
    </div>
  )
}

