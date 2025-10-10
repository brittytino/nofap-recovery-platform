import { db } from '@/lib/db'
import { differenceInDays } from 'date-fns'

export async function getUserStats(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      dailyLogs: {
        orderBy: { date: 'desc' },
        take: 30
      },
      userAchievements: {
        include: { achievement: true }
      },
      healthMetrics: {
        orderBy: { date: 'desc' },
        take: 7
      }
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  // Calculate current streak
  const currentStreak = user.streakStartDate 
    ? differenceInDays(new Date(), user.streakStartDate) + 1
    : 0

  // Calculate averages
  const recentLogs = user.dailyLogs.slice(0, 7)
  const averageMood = recentLogs.length > 0
    ? recentLogs.reduce((sum, log) => sum + (log.moodRating || 0), 0) / recentLogs.length
    : 0

  const averageEnergy = recentLogs.length > 0
    ? recentLogs.reduce((sum, log) => sum + (log.energyLevel || 0), 0) / recentLogs.length
    : 0

  // Get community rank (simplified)
  const rank = await db.user.count({
    where: {
      currentStreak: {
        gt: currentStreak
      }
    }
  }) + 1

  // Calculate XP and level
  const totalXP = user.userAchievements.length * 50 // Simplified XP calculation
  const level = Math.floor(totalXP / 100) + 1

  return {
    ...user,
    currentStreak,
    averageMood: Math.round(averageMood * 10) / 10,
    averageEnergy: Math.round(averageEnergy * 10) / 10,
    communityRank: rank,
    xpPoints: totalXP,
    level,
    relationshipStatus: user.relationshipStatus
  }
}

export async function updateUserStreak(userId: string, reset: boolean = false) {
  const user = await db.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (reset) {
    return db.user.update({
      where: { id: userId },
      data: {
        currentStreak: 0,
        totalResets: user.totalResets + 1,
        streakStartDate: new Date(),
      }
    })
  }

  const currentStreak = user.streakStartDate 
    ? differenceInDays(new Date(), user.streakStartDate) + 1
    : 1

  return db.user.update({
    where: { id: userId },
    data: {
      currentStreak,
      longestStreak: Math.max(currentStreak, user.longestStreak)
    }
  })
}
