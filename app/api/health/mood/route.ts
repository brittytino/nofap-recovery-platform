import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const moodSchema = z.object({
  moodRating: z.number().min(1).max(10),
  date: z.string().datetime(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { moodRating, date } = moodSchema.parse(body)

    const logDate = new Date(date)
    logDate.setHours(0, 0, 0, 0)

    // Update or create daily log
    const dailyLog = await db.dailyLog.upsert({
      where: {
        userId_date: {
          userId: session.user.id,
          date: logDate,
        }
      },
      update: {
        moodRating,
      },
      create: {
        userId: session.user.id,
        date: logDate,
        moodRating,
      }
    })

    // Award XP for logging mood
    await awardXP(session.user.id, 'MOOD_LOG', 5)

    return NextResponse.json({ success: true, dailyLog })
  } catch (error) {
    console.error('Mood logging error:', error)
    return NextResponse.json(
      { message: 'Failed to log mood' },
      { status: 500 }
    )
  }
}

async function awardXP(userId: string, activityType: string, points: number) {
  // Implementation for XP system
  // This would update user's XP and check for level ups
}
