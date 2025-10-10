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

    // Check if check-in already exists for today
    const existingLog = await db.dailyLog.findUnique({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today
        }
      }
    })

    let dailyLog

    if (existingLog) {
      // Update existing log
      dailyLog = await db.dailyLog.update({
        where: { id: existingLog.id },
        data: {
          moodRating: data.moodRating,
          energyLevel: data.energyLevel,
          confidenceLevel: data.confidenceLevel,
          urgeIntensity: data.urgeIntensity,
          notes: data.notes || existingLog.notes,
          triggers: data.triggers || [],
          activitiesCompleted: data.activitiesCompleted || [],
          exerciseCompleted: data.exerciseCompleted || existingLog.exerciseCompleted,
          meditationCompleted: data.meditationCompleted || existingLog.meditationCompleted,
          socialInteraction: data.socialInteraction || existingLog.socialInteraction,
          updatedAt: new Date()
        }
      })
    } else {
      // Create new log
      dailyLog = await db.dailyLog.create({
        data: {
          userId: session.user.id,
          date: today,
          moodRating: data.moodRating,
          energyLevel: data.energyLevel,
          confidenceLevel: data.confidenceLevel,
          urgeIntensity: data.urgeIntensity,
          notes: data.notes,
          triggers: data.triggers || [],
          activitiesCompleted: data.activitiesCompleted || []
        }
      })

      // Award XP for daily check-in (only for new logs)
      await db.userXPLog.create({
        data: {
          userId: session.user.id,
          activityType: 'DAILY_CHECK_IN',
          pointsEarned: 10,
          description: 'Completed daily check-in'
        }
      })

      // Update user total XP
      await db.user.update({
        where: { id: session.user.id },
        data: {
          totalXP: { increment: 10 },
          lastCheckInDate: new Date()
        }
      })
    }

    // If urges were reported, log them separately
    if (data.urgeIntensity > 0) {
      await db.urgeLog.create({
        data: {
          userId: session.user.id,
          urgeIntensity: data.urgeIntensity,
          triggers: data.triggers || [],
          context: data.notes,
          wasSuccessful: true, // They're checking in, so they resisted
          timeOfDay: new Date().getHours() < 12 ? 'MORNING' : new Date().getHours() < 17 ? 'AFTERNOON' : 'EVENING'
        }
      })
    }

    // Update streak
    await updateStreak(session.user.id)

    return NextResponse.json({ 
      success: true, 
      message: 'Check-in saved successfully',
      dailyLog 
    })
  } catch (error) {
    console.error('Daily check-in error:', error)
    return NextResponse.json(
      { message: 'Failed to save check-in' },
      { status: 500 }
    )
  }
}

async function updateStreak(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { currentStreak: true, streakStartDate: true, lastCheckInDate: true }
  })

  if (!user) return

  const now = new Date()
  const lastCheckIn = user.lastCheckInDate

  if (!user.lastCheckInDate || !user.streakStartDate) {
    // First check-in ever or after reset
    await db.user.update({
      where: { id: userId },
      data: {
        currentStreak: 1,
        streakStartDate: now,
        lastCheckInDate: now
      }
    })
    return
  }

  const daysSinceLastCheckIn = lastCheckIn 
    ? Math.floor((now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24))
    : 999 // Large number to trigger streak reset

  if (daysSinceLastCheckIn === 0) {
    // Same day, no change needed
    return
  } else if (daysSinceLastCheckIn === 1) {
    // Consecutive day, increment streak
    const newStreak = user.currentStreak + 1
    
    await db.user.update({
      where: { id: userId },
      data: {
        currentStreak: newStreak,
        longestStreak: {
          set: Math.max(newStreak, user.currentStreak)
        },
        lastCheckInDate: now
      }
    })

    // Check for milestone achievements
    await checkMilestoneAchievements(userId, newStreak)
  } else {
    // Streak broken
    await db.user.update({
      where: { id: userId },
      data: {
        currentStreak: 1,
        totalResets: { increment: 1 },
        streakStartDate: now,
        lastCheckInDate: now
      }
    })
  }
}

async function checkMilestoneAchievements(userId: string, streak: number) {
  const milestones = [7, 14, 30, 60, 90, 180, 365]
  
  if (milestones.includes(streak)) {
    // Get all streak achievements and find the one matching this streak value
    const achievements = await db.achievement.findMany({
      where: {
        category: 'STREAK',
        isActive: true
      }
    })
    
    const achievement = achievements.find(a => {
      const criteria = a.unlockCriteria as any
      return criteria?.value === streak
    })

    if (achievement) {
      // Check if user already has this achievement
      const hasAchievement = await db.userAchievement.findUnique({
        where: {
          userId_achievementId: {
            userId,
            achievementId: achievement.id
          }
        }
      })

      if (!hasAchievement) {
        // Award achievement
        await db.userAchievement.create({
          data: {
            userId,
            achievementId: achievement.id
          }
        })

        // Award bonus XP
        const bonusXP = streak >= 365 ? 500 : streak >= 90 ? 200 : streak >= 30 ? 100 : 50
        
        await db.userXPLog.create({
          data: {
            userId,
            activityType: 'MILESTONE_REACHED',
            pointsEarned: bonusXP,
            description: `Unlocked ${achievement.name}`
          }
        })

        await db.user.update({
          where: { id: userId },
          data: {
            totalXP: { increment: bonusXP }
          }
        })
      }
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const today = startOfDay(new Date())

    const todayLog = await db.dailyLog.findUnique({
      where: {
        userId_date: {
          userId: session.user.id,
          date: today
        }
      }
    })

    return NextResponse.json({ 
      hasCheckedIn: !!todayLog,
      log: todayLog 
    })
  } catch (error) {
    console.error('Check-in status error:', error)
    return NextResponse.json(
      { message: 'Failed to get check-in status' },
      { status: 500 }
    )
  }
}

