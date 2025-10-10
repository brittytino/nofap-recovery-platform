import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const period = searchParams.get('period') || 'weekly' // 'weekly', 'monthly', 'alltime'
    const limit = parseInt(searchParams.get('limit') || '50')

    // Calculate date range
    const now = new Date()
    let dateFilter: Date | undefined

    if (period === 'weekly') {
      dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    } else if (period === 'monthly') {
      dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    }

    // Get users who want to be on leaderboard, ordered by current streak
    const users = await db.user.findMany({
      where: {
        ...(dateFilter ? {
          streakStartDate: {
            gte: dateFilter
          }
        } : {})
      },
      select: {
        id: true,
        name: true,
        image: true,
        currentStreak: true,
        longestStreak: true,
        currentLevel: true,
        totalXP: true,
        streakStartDate: true
      },
      orderBy: {
        currentStreak: 'desc'
      },
      take: limit
    })

    // Anonymize names partially for privacy
    const leaderboard = users.map((user, index) => {
      const nameParts = user.name?.split(' ') || ['Anonymous']
      const displayName = nameParts.length > 1 
        ? `${nameParts[0]} ${nameParts[1]?.charAt(0) || ''}.`
        : nameParts[0]
      
      return {
        rank: index + 1,
        id: user.id,
        name: displayName,
        image: user.image,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        level: user.currentLevel,
        totalXP: user.totalXP
      }
    })

    return NextResponse.json({ 
      leaderboard,
      period,
      generatedAt: new Date()
    })
  } catch (error) {
    console.error('Leaderboard fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

