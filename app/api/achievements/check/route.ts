import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Get user stats
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        currentStreak: true,
        totalXP: true,
        currentLevel: true
      }
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Get count of various activities
    const [healthMetricsCount, forumPostsCount, dailyLogsCount] = await Promise.all([
      db.healthMetric.count({ where: { userId: session.user.id } }),
      db.forumPost.count({ where: { userId: session.user.id } }),
      db.dailyLog.count({ where: { userId: session.user.id } })
    ])

    // Check for new achievements
    const achievements = await db.achievement.findMany({
      where: {
        isActive: true
      }
    })

    const newAchievements = []

    for (const achievement of achievements) {
      // Check if user already has this achievement
      const hasAchievement = await db.userAchievement.findUnique({
        where: {
          userId_achievementId: {
            userId: session.user.id,
            achievementId: achievement.id
          }
        }
      })

      if (hasAchievement) continue

      // Check if user qualifies for this achievement
      let qualifies = false
      
      const criteria = achievement.unlockCriteria as { type: string; value: number }

      switch (criteria.type) {
        case 'streak':
          qualifies = user.currentStreak >= criteria.value
          break
        case 'xp':
          qualifies = user.totalXP >= criteria.value
          break
        case 'activity':
          // For activity-based achievements, we'd need more complex logic
          // This is a placeholder for now
          qualifies = false
          break
      }

      if (qualifies) {
        // Award achievement
        await db.userAchievement.create({
          data: {
            userId: session.user.id,
            achievementId: achievement.id
          }
        })

        // Calculate XP bonus based on tier
        let xpBonus = 0
        switch (achievement.tier) {
          case 'BRONZE': xpBonus = 50; break
          case 'SILVER': xpBonus = 100; break
          case 'GOLD': xpBonus = 200; break
          case 'DIAMOND': xpBonus = 500; break
          case 'PLATINUM': xpBonus = 300; break
        }

        // Award XP
        await db.userXPLog.create({
          data: {
            userId: session.user.id,
            activityType: 'MILESTONE_REACHED',
            pointsEarned: xpBonus,
            description: `Unlocked ${achievement.name}`
          }
        })

        await db.user.update({
          where: { id: session.user.id },
          data: {
            totalXP: { increment: xpBonus }
          }
        })

        newAchievements.push({
          ...achievement,
          xpEarned: xpBonus
        })
      }
    }

    return NextResponse.json({ 
      newAchievements
    })
  } catch (error) {
    console.error('Achievement check error:', error)
    return NextResponse.json(
      { message: 'Failed to check achievements' },
      { status: 500 }
    )
  }
}

