import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { subDays, format } from 'date-fns'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const thirtyDaysAgo = subDays(new Date(), 30)

    // Get daily logs for the last 30 days
    const dailyLogs = await db.dailyLog.findMany({
      where: {
        userId,
        date: {
          gte: thirtyDaysAgo
        }
      },
      orderBy: { date: 'asc' }
    })

    // Get health metrics
    const healthMetrics = await db.healthMetric.findMany({
      where: {
        userId,
        date: {
          gte: thirtyDaysAgo
        }
      },
      orderBy: { date: 'asc' }
    })

    // Prepare chart data
    const moodData = []
    const energyData = []
    const exerciseData = []
    
    for (let i = 29; i >= 0; i--) {
      const date = subDays(new Date(), i)
      const dateString = format(date, 'MMM dd')
      
      const dayLog = dailyLogs.find(log => 
        format(new Date(log.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
      
      const healthMetric = healthMetrics.find(metric => 
        format(new Date(metric.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )

      moodData.push({
        date: dateString,
        mood: dayLog?.moodRating || null
      })

      energyData.push({
        date: dateString,
        energy: dayLog?.energyLevel || null
      })

      exerciseData.push({
        date: dateString,
        minutes: healthMetric?.exerciseMinutes || 0
      })
    }

    // Calculate averages and trends
    const validMoodEntries = moodData.filter(d => d.mood !== null)
    const validEnergyEntries = energyData.filter(d => d.energy !== null)
    
    const avgMood = validMoodEntries.length > 0 
      ? validMoodEntries.reduce((sum, d) => sum + d.mood!, 0) / validMoodEntries.length
      : 0

    const avgEnergy = validEnergyEntries.length > 0
      ? validEnergyEntries.reduce((sum, d) => sum + d.energy!, 0) / validEnergyEntries.length
      : 0

    const totalExerciseMinutes = exerciseData.reduce((sum, d) => sum + d.minutes, 0)
    const avgExercisePerDay = totalExerciseMinutes / 30

    // Calculate streaks and patterns
    const currentUser = await db.user.findUnique({
      where: { id: userId },
      select: {
        currentStreak: true,
        longestStreak: true,
        totalResets: true
      }
    })

    return NextResponse.json({
      chartData: {
        mood: moodData,
        energy: energyData,
        exercise: exerciseData
      },
      analytics: {
        avgMood: Math.round(avgMood * 10) / 10,
        avgEnergy: Math.round(avgEnergy * 10) / 10,
        avgExercise: Math.round(avgExercisePerDay),
        currentStreak: currentUser?.currentStreak || 0,
        longestStreak: currentUser?.longestStreak || 0,
        totalResets: currentUser?.totalResets || 0,
        consistencyScore: Math.round((validMoodEntries.length / 30) * 100)
      }
    })
  } catch (error) {
    console.error('Analytics fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
