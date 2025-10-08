import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { startOfYear, format } from 'date-fns'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const startDate = startOfYear(new Date())

    // Get all daily logs from the start of the year
    const dailyLogs = await db.dailyLog.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: startDate
        }
      },
      select: {
        date: true,
        moodRating: true,
        energyLevel: true,
        confidenceLevel: true,
        urgeIntensity: true
      }
    })

    // Transform to activity data with intensity calculation
    const activities = dailyLogs.map(log => {
      // Calculate intensity based on ratings (0-4 scale)
      const avgScore = (
        (log.moodRating || 0) + 
        (log.energyLevel || 0) + 
        (log.confidenceLevel || 0) + 
        (10 - (log.urgeIntensity || 0)) // Inverse urge intensity
      ) / 4

      let intensity = 0
      if (avgScore >= 8) intensity = 4
      else if (avgScore >= 6.5) intensity = 3
      else if (avgScore >= 5) intensity = 2
      else if (avgScore >= 3) intensity = 1

      return {
        date: format(log.date, 'yyyy-MM-dd'),
        hasActivity: true,
        intensity
      }
    })

    return NextResponse.json({ activities })
  } catch (error) {
    console.error('Heatmap data fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch heatmap data' },
      { status: 500 }
    )
  }
}

