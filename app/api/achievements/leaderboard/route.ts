import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { subWeeks, subMonths, startOfWeek, startOfMonth } from 'date-fns'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const timeframe = searchParams.get('timeframe') || 'weekly'
    const userId = searchParams.get('userId')

    let dateFilter = {}
    
    switch (timeframe) {
      case 'weekly':
        dateFilter = { gte: startOfWeek(new Date()) }
        break
      case 'monthly':
        dateFilter = { gte: startOfMonth(new Date()) }
        break
      case 'allTime':
        // No date filter for all time
        break
    }

    // Get XP data for the timeframe
    const xpQuery = timeframe === 'allTime' ? {} : { createdAt: dateFilter }
    
    const userXPData = await db.userXPLog.groupBy({
      by: ['userId'],
      where: xpQuery,
      _sum: { pointsEarned: true },
      orderBy: { _sum: { pointsEarned: 'desc' } },
      take: 100
    })

    // Get user details for top users
    const userIds = userXPData.map(item => item.userId)
    const users = await db.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        name: true,
        currentStreak: true,
        currentLevel: true
      }
    })

    // Create leaderboard
    const leaderboard = userXPData.map((item, index) => {
      const user = users.find(u => u.id === item.userId)
      return {
        id: item.userId,
        username: user ? generateAnonymousUsername(user.name, user.id) : 'Anonymous User',
        totalXP: item._sum.pointsEarned || 0,
        currentStreak: user?.currentStreak || 0,
        level: user?.currentLevel || 1,
        rank: index + 1,
        isCurrentUser: item.userId === userId
      }
    }).slice(0, 10)

    // Find current user's rank if not in top 10
    let userRank = null
    if (userId) {
      const userIndex = userXPData.findIndex(item => item.userId === userId)
      if (userIndex >= 0) {
        const user = users.find(u => u.id === userId)
        userRank = {
          id: userId,
          username: user ? generateAnonymousUsername(user.name, userId) : 'You',
          totalXP: userXPData[userIndex]._sum.pointsEarned || 0,
          currentStreak: user?.currentStreak || 0,
          level: user?.currentLevel || 1,
          rank: userIndex + 1,
          isCurrentUser: true
        }
      }
    }

    return NextResponse.json({
      leaderboard,
      userRank,
      timeframe
    })
  } catch (error) {
    console.error('Leaderboard fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

function generateAnonymousUsername(name: string | null, userId: string): string {
  const adjectives = ['Strong', 'Brave', 'Determined', 'Focused', 'Resilient']
  const nouns = ['Warrior', 'Champion', 'Hero', 'Phoenix', 'Eagle']
  
  const hash = userId.slice(-3)
  const adjIndex = parseInt(hash[0], 16) % adjectives.length
  const nounIndex = parseInt(hash[1], 16) % nouns.length
  const number = parseInt(hash[2], 16)
  
  return `${adjectives[adjIndex]}${nouns[nounIndex]}${number}`
}
