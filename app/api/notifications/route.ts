import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Get recent user activity to generate notifications
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      include: {
        userAchievements: {
          include: { achievement: true },
          orderBy: { unlockedAt: 'desc' },
          take: 5
        },
        dailyLogs: {
          orderBy: { date: 'desc' },
          take: 7
        }
      }
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Generate notifications based on user activity
    const notifications = []

    // Achievement notifications
    user.userAchievements.forEach((userAchievement) => {
      notifications.push({
        id: `achievement-${userAchievement.id}`,
        type: 'achievement',
        title: 'Achievement Unlocked!',
        message: `You earned: ${userAchievement.achievement.name}`,
        createdAt: userAchievement.unlockedAt,
        isRead: false
      })
    })

    // Streak milestone notifications
    if (user.currentStreak > 0) {
      const milestones = [7, 30, 90, 180, 365]
      const currentMilestone = milestones.find(m => user.currentStreak >= m && user.currentStreak < m + 7)
      
      if (currentMilestone) {
        notifications.push({
          id: `streak-${currentMilestone}`,
          type: 'streak',
          title: 'Streak Milestone!',
          message: `Amazing! You've reached ${currentMilestone} days!`,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
          read: false
        })
      }
    }

    // Daily check-in reminder
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todayLog = user.dailyLogs.find(log => {
      const logDate = new Date(log.date)
      logDate.setHours(0, 0, 0, 0)
      return logDate.getTime() === today.getTime()
    })

    if (!todayLog) {
      notifications.push({
        id: 'daily-checkin',
        type: 'reminder',
        title: 'Daily Check-in',
        message: 'Don\'t forget to log your mood and energy today!',
        createdAt: today,
        read: false
      })
    }

    // Sort by date (newest first)
    notifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const unreadCount = notifications.filter(n => !n.read).length

    return NextResponse.json({
      notifications: notifications.slice(0, 20), // Limit to 20 most recent
      unreadCount
    })
  } catch (error) {
    console.error('Notifications fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}
