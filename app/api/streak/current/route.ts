import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { differenceInDays } from 'date-fns'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        currentStreak: true,
        longestStreak: true,
        streakStartDate: true,
        totalResets: true,
      }
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Calculate current streak based on streak start date
    const currentStreak = user.streakStartDate 
      ? differenceInDays(new Date(), user.streakStartDate) + 1
      : 0

    // Update current streak if it's different
    if (currentStreak !== user.currentStreak) {
      await db.user.update({
        where: { id: session.user.id },
        data: { currentStreak }
      })
    }

    return NextResponse.json({
      currentStreak,
      longestStreak: user.longestStreak,
      streakStart: user.streakStartDate,
      totalResets: user.totalResets,
    })
  } catch (error) {
    console.error('Streak fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch streak data' },
      { status: 500 }
    )
  }
}
