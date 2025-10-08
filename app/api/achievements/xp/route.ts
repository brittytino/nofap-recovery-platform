import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId') || session.user?.id

    // Get all XP records for user
    const xpRecords = await db.userXPLog.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    // Calculate total XP
    const totalXP = xpRecords.reduce((sum, record) => sum + record.pointsEarned, 0)

    // Calculate current level (every 500 XP = 1 level)
    const currentLevel = Math.floor(totalXP / 500) + 1
    const xpInCurrentLevel = totalXP % 500
    const xpForNextLevel = 500 - xpInCurrentLevel

    // Get XP sources breakdown
    const xpSources = xpRecords.reduce((acc, record) => {
      acc[record.activityType] = (acc[record.activityType] || 0) + record.pointsEarned
      return acc
    }, {} as Record<string, number>)

    return NextResponse.json({
      currentXP: totalXP,
      currentLevel,
      xpForNextLevel,
      totalXPNeeded: currentLevel * 500,
      xpSources,
      recentXP: xpRecords.slice(0, 10)
    })
  } catch (error) {
    console.error('XP fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch XP data' },
      { status: 500 }
    )
  }
}
