'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'

interface HeatmapCalendarProps {
  userId: string
}

interface DayData {
  date: Date
  intensity: number // 0-4 scale
  mood: number
  energy: number
}

export function HeatmapCalendar({ userId }: HeatmapCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [dayData, setDayData] = useState<DayData[]>([])
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null)

  useEffect(() => {
    fetchCalendarData()
  }, [currentDate, userId])

  const fetchCalendarData = async () => {
    try {
      const response = await fetch(`/api/health/calendar?userId=${userId}&month=${format(currentDate, 'yyyy-MM')}`)
      const data = await response.json()
      setDayData(data)
    } catch (error) {
      console.error('Failed to fetch calendar data:', error)
    }
  }

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  const getIntensityColor = (intensity: number) => {
    const colors = [
      'bg-gray-100', // 0 - no data
      'bg-recovery-100', // 1 - low
      'bg-recovery-300', // 2 - medium
      'bg-recovery-500', // 3 - high
      'bg-recovery-700'  // 4 - very high
    ]
    return colors[intensity] || colors[0]
  }

  const getDayIntensity = (date: Date) => {
    const dayInfo = dayData.find(d => 
      format(new Date(d.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    )
    return dayInfo?.intensity || 0
  }

  const getDayData = (date: Date) => {
    return dayData.find(d => 
      format(new Date(d.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Progress Calendar</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[100px] text-center">
            {format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs font-medium text-gray-500 text-center p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const intensity = getDayIntensity(day)
          const dayInfo = getDayData(day)
          const isCurrentMonth = isSameMonth(day, currentDate)
          const isTodayDate = isToday(day)
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => setSelectedDay(dayInfo || null)}
              className={`
                aspect-square p-1 rounded-lg text-xs font-medium transition-all duration-200
                ${getIntensityColor(intensity)}
                ${!isCurrentMonth ? 'opacity-30' : ''}
                ${isTodayDate ? 'ring-2 ring-recovery-500' : ''}
                hover:scale-105 hover:shadow-md
              `}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex items-center space-x-1">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm ${getIntensityColor(level)}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>

      {selectedDay && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">
            {format(new Date(selectedDay.date), 'MMMM d, yyyy')}
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Mood: </span>
              <span className="font-medium">{selectedDay.mood}/10</span>
            </div>
            <div>
              <span className="text-gray-600">Energy: </span>
              <span className="font-medium">{selectedDay.energy}/10</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}
