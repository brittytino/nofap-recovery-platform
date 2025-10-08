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

    // Get all achievements
    const achievements = await db.achievement.findMany({
      where: { isActive: true },
      orderBy: [
        { tier: 'asc' },
        { requirement: 'asc' }
      ]
    })

    // Get user's unlocked achievements
    const userAchievements = await db.userAchievement.findMany({
      where: { userId },
      include: { achievement: true }
    })

    const unlockedIds = new Set(userAchievements.map(ua => ua.achievementId))

    // Get user stats for progress calculation
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        dailyLogs: {
          orderBy: { date: 'desc' },
          take: 30
        },
        forumPosts: true,
        achievements: true
      }
    })

    // Calculate progress for each achievement
    const achievementsWithProgress = achievements.map(achievement => {
      const isUnlocked = unlockedIds.has(achievement.id)
      const userAchievement = userAchievements.find(ua => ua.achievementId === achievement.id)
      
      let progress = 0
      
      if (!isUnlocked && user) {
        switch (achievement.category) {
          case 'STREAK':
            progress = Math.min(user.currentStreak, achievement.requirement)
            break
          case 'HEALTH':
            if (achievement.name === 'Mood Tracker') {
              const consecutiveDays = calculateConsecutiveMoodLogs(user.dailyLogs)
              progress = Math.min(consecutiveDays, achievement.requirement)
            }
            break
          case 'SOCIAL':
            if (achievement.name === 'Community Helper') {
              progress = Math.min(user.forumPosts.length, achievement.requirement)
            }
            break
          case 'MILESTONE':
            if (achievement.name === 'Phoenix Rising') {
              progress = Math.min(user.totalResets, achievement.requirement)
            }
            break
        }
      }

      return {
        ...achievement,
        isUnlocked,
        progress,
        unlockedAt: userAchievement?.unlockedAt || null
      }
    })

    return NextResponse.json({ achievements: achievementsWithProgress })
  } catch (error) {
    console.error('Achievements list error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch achievements' },
      { status: 500 }
    )
  }
}

function calculateConsecutiveMoodLogs(dailyLogs: any[]) {
  let consecutive = 0
  const sortedLogs = dailyLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  for (let i = 0; i < sortedLogs.length; i++) {
    if (sortedLogs[i].moodRating !== null) {
      consecutive++
    } else {
      break
    }
  }
  
  return consecutive
}
