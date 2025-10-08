import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { startOfDay } from 'date-fns'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const today = startOfDay(new Date())

    // Check if health metric already exists for today
    const existingMetric = await db.healthMetric.findUnique({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today
        }
      }
    })

    let healthMetric
    let xpEarned = 0

    if (existingMetric) {
      // Update existing metric
      healthMetric = await db.healthMetric.update({
        where: { id: existingMetric.id },
        data: {
          sleepHours: data.sleepHours ?? existingMetric.sleepHours,
          sleepQuality: data.sleepQuality ?? existingMetric.sleepQuality,
          exerciseMinutes: data.exerciseMinutes ?? existingMetric.exerciseMinutes,
          exerciseType: data.exerciseType ?? existingMetric.exerciseType,
          steps: data.steps ?? existingMetric.steps,
          waterIntake: data.waterIntake ?? existingMetric.waterIntake,
          weight: data.weight ?? existingMetric.weight,
          socialInteraction: data.socialInteraction ?? existingMetric.socialInteraction,
          meditationMinutes: data.meditationMinutes ?? existingMetric.meditationMinutes,
          updatedAt: new Date()
        }
      })
    } else {
      // Create new metric
      healthMetric = await db.healthMetric.create({
        data: {
          userId: session.user.id,
          date: today,
          sleepHours: data.sleepHours,
          sleepQuality: data.sleepQuality,
          exerciseMinutes: data.exerciseMinutes,
          exerciseType: data.exerciseType,
          steps: data.steps,
          waterIntake: data.waterIntake,
          weight: data.weight,
          socialInteraction: data.socialInteraction,
          meditationMinutes: data.meditationMinutes
        }
      })

      // Calculate XP based on activities
      if (data.exerciseMinutes && data.exerciseMinutes >= 30) xpEarned += 15
      if (data.meditationMinutes && data.meditationMinutes >= 10) xpEarned += 10
      if (data.steps && data.steps >= 10000) xpEarned += 10
      if (data.socialInteraction && data.socialInteraction >= 7) xpEarned += 10
      if (data.waterIntake && data.waterIntake >= 2) xpEarned += 5

      if (xpEarned > 0) {
        await db.userXPLog.create({
          data: {
            userId: session.user.id,
            activityType: 'EXERCISE',
            pointsEarned: xpEarned,
            description: 'Logged health activities'
          }
        })

        await db.user.update({
          where: { id: session.user.id },
          data: {
            totalXP: { increment: xpEarned }
          }
        })
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Health metrics saved successfully',
      healthMetric,
      xpEarned
    })
  } catch (error) {
    console.error('Health tracking error:', error)
    return NextResponse.json(
      { message: 'Failed to save health metrics' },
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

    const metrics = await db.healthMetric.findMany({
      where: {
        userId: session.user.id,
        date: {
          gte: startDate
        }
      },
      orderBy: {
        date: 'desc'
      }
    })

    return NextResponse.json({ metrics })
  } catch (error) {
    console.error('Health metrics fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch health metrics' },
      { status: 500 }
    )
  }
}
