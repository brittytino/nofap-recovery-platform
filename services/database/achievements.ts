import { db } from '@/lib/db'

export async function checkAndUnlockAchievements(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      userAchievements: {
        include: { achievement: true }
      },
      dailyLogs: {
        orderBy: { date: 'desc' },
        take: 365
      }
    }
  })

  if (!user) return []

  const unlockedAchievementIds = user.userAchievements.map(ua => ua.achievementId)
  const availableAchievements = await db.achievement.findMany({
    where: {
      id: { notIn: unlockedAchievementIds },
      isActive: true
    }
  })

  const newlyUnlocked = []

  for (const achievement of availableAchievements) {
    let qualifies = false
    
    // Parse the unlockCriteria which is stored as JSON
    const criteria = achievement.unlockCriteria as { type: string; value: number }

    switch (achievement.category) {
      case 'STREAK':
        qualifies = user.currentStreak >= (criteria.value || 0)
        break

      case 'HEALTH':
        if (achievement.name === 'Mood Tracker') {
          const last7Days = user.dailyLogs.slice(0, 7)
          qualifies = last7Days.every(log => log.moodRating !== null)
        }
        break

      case 'SPECIAL':
        if (achievement.name === 'Phoenix Rising') {
          qualifies = user.totalResets >= (criteria.value || 0)
        }
        break
    }

    if (qualifies) {
      await db.userAchievement.create({
        data: {
          userId,
          achievementId: achievement.id
        }
      })
      newlyUnlocked.push(achievement)
    }
  }

  return newlyUnlocked
}
