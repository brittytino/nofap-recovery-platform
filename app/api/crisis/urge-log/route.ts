import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()

    // Create urge log
    const urgeLog = await db.urgeLog.create({
      data: {
        userId: session.user.id,
        intensity: data.intensity,
        triggers: data.triggers || [],
        context: data.context,
        copingStrategies: data.copingStrategies || [],
        wasSuccessful: data.wasSuccessful ?? true
      }
    })

    // If user successfully resisted, award XP
    if (data.wasSuccessful) {
      const xpBonus = data.intensity >= 8 ? 25 : data.intensity >= 5 ? 15 : 10

      await db.userXPLog.create({
        data: {
          userId: session.user.id,
          activityType: 'URGE_OVERCOME',
          pointsEarned: xpBonus,
          description: `Resisted urge (intensity: ${data.intensity})`
        }
      })

      await db.user.update({
        where: { id: session.user.id },
        data: {
          totalXP: { increment: xpBonus }
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: data.wasSuccessful ? 'Great job resisting! Stay strong.' : 'Logged. Tomorrow is a new day.',
      urgeLog 
    })
  } catch (error) {
    console.error('Urge log error:', error)
    return NextResponse.json(
      { message: 'Failed to log urge' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const days = parseInt(searchParams.get('days') || '30')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const urgeLogs = await db.urgeLog.findMany({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: startDate
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Analyze patterns
    const triggerCounts: Record<string, number> = {}
    urgeLogs.forEach(log => {
      log.triggers.forEach(trigger => {
        triggerCounts[trigger] = (triggerCounts[trigger] || 0) + 1
      })
    })

    const topTriggers = Object.entries(triggerCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([trigger, count]) => ({ trigger, count }))

    return NextResponse.json({ 
      urgeLogs,
      stats: {
        total: urgeLogs.length,
        successful: urgeLogs.filter(log => log.wasSuccessful).length,
        topTriggers
      }
    })
  } catch (error) {
    console.error('Urge logs fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch urge logs' },
      { status: 500 }
    )
  }
}

