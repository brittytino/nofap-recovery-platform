import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const healthLogSchema = z.object({
  moodRating: z.number().min(1).max(10).optional(),
  energyLevel: z.number().min(1).max(10).optional(),
  confidenceLevel: z.number().min(1).max(10).optional(),
  sleepHours: z.number().min(0).max(24).optional(),
  exerciseMinutes: z.number().min(0).optional(),
  urgeIntensity: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
  date: z.string().datetime(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validatedData = healthLogSchema.parse(body)

    const logDate = new Date(validatedData.date)
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
        moodRating: validatedData.moodRating,
        energyLevel: validatedData.energyLevel,
        confidenceLevel: validatedData.confidenceLevel,
        urgeIntensity: validatedData.urgeIntensity,
        notes: validatedData.notes,
      },
      create: {
        userId: session.user.id,
        date: logDate,
        moodRating: validatedData.moodRating,
        energyLevel: validatedData.energyLevel,
        confidenceLevel: validatedData.confidenceLevel,
        urgeIntensity: validatedData.urgeIntensity,
        notes: validatedData.notes,
      }
    })

    // Update or create health metrics
    if (validatedData.sleepHours || validatedData.exerciseMinutes) {
      await db.healthMetric.upsert({
        where: {
          userId_date: {
            userId: session.user.id,
            date: logDate,
          }
        },
        update: {
          sleepHours: validatedData.sleepHours,
          exerciseMinutes: validatedData.exerciseMinutes,
        },
        create: {
          userId: session.user.id,
          date: logDate,
          sleepHours: validatedData.sleepHours,
          exerciseMinutes: validatedData.exerciseMinutes,
        }
      })
    }

    // Award XP for logging
    await awardXP(session.user.id, 'HEALTH_LOG', 10)

    return NextResponse.json({ success: true, dailyLog })
  } catch (error) {
    console.error('Health logging error:', error)
    return NextResponse.json(
      { message: 'Failed to log health data' },
      { status: 500 }
    )
  }
}

async function awardXP(userId: string, activityType: string, points: number) {
  // Check if XP already awarded today for this activity
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const existingXP = await db.userXP.findFirst({
    where: {
      userId,
      activityType,
      date: {
        gte: today,
      }
    }
  })

  if (!existingXP) {
    await db.userXP.create({
      data: {
        userId,
        activityType,
        pointsEarned: points,
        date: new Date(),
      }
    })
  }
}
