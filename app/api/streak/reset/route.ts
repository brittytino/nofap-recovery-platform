import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { currentStreak: true, longestStreak: true, totalResets: true }
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Update longest streak if current is higher
    const newLongestStreak = Math.max(user.currentStreak, user.longestStreak)

    // Reset streak
    const updatedUser = await db.user.update({
      where: { id: session.user.id },
      data: {
        currentStreak: 0,
        longestStreak: newLongestStreak,
        totalResets: user.totalResets + 1,
        streakStart: new Date(),
      }
    })

    // Log the reset event
    await db.dailyLog.create({
      data: {
        userId: session.user.id,
        date: new Date(),
        notes: 'Streak reset - starting fresh',
      }
    })

    return NextResponse.json({
      message: 'Streak reset successfully. You can start again!',
      user: {
        currentStreak: updatedUser.currentStreak,
        longestStreak: updatedUser.longestStreak,
        totalResets: updatedUser.totalResets,
        streakStart: updatedUser.streakStart,
      }
    })
  } catch (error) {
    console.error('Streak reset error:', error)
    return NextResponse.json(
      { message: 'Failed to reset streak' },
      { status: 500 }
    )
  }
}
