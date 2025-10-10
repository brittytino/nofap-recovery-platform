import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()

    // Create onboarding data JSON
    const onboardingData = {
      assessment: {
        previousAttempts: data.previousAttempts,
        longestStreak: data.longestStreak?.[0] || 0,
        mainTriggers: data.mainTriggers || [],
        supportSystem: data.supportSystem?.[0] || 5,
        motivation: data.motivation,
        currentChallenges: data.currentChallenges || []
      },
      goals: {
        primaryGoal: data.primaryGoal,
        streakGoal: parseInt(data.streakGoal) || 7,
        healthGoals: data.healthGoals || [],
        personalGoals: data.personalGoals,
        timeline: data.timeline,
        successMeasures: data.successMeasures || []
      },
      customMotivation: data.customMotivation
    }

    // Update user with onboarding data
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        relationshipStatus: data.relationshipStatus,
        hasCompletedOnboarding: true,
        streakStartDate: new Date(),
        dailyReminderTime: data.reminderTime || '09:00'
      }
    })

    // Create initial daily log
    await db.dailyLog.create({
      data: {
        userId: session.user.id,
        date: new Date(),
        notes: 'Started recovery journey today! 🌟'
      }
    })

    // Award onboarding XP
    await db.userXPLog.create({
      data: {
        userId: session.user.id,
        activityType: 'MILESTONE_REACHED',
        pointsEarned: 50,
        description: 'Completed onboarding and setup'
      }
    })
    
    // Update user total XP
    await db.user.update({
      where: { id: session.user.id },
      data: {
        totalXP: {
          increment: 50
        }
      }
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Onboarding completed successfully!' 
    })
  } catch (error) {
    console.error('Onboarding completion error:', error)
    return NextResponse.json(
      { message: 'Failed to complete onboarding' },
      { status: 500 }
    )
  }
}
