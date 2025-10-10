import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const DAILY_CHALLENGES = {
  BEGINNER: [
    {
      title: "Morning Motivation",
      description: "Read 3 positive affirmations and write down your goals for today",
      points: 10,
      target: 1
    },
    {
      title: "Mindful Breathing",
      description: "Practice 5 minutes of deep breathing or meditation",
      points: 15,
      target: 1
    },
    {
      title: "Digital Detox Hour",
      description: "Spend 1 hour away from all screens and devices",
      points: 20,
      target: 1
    },
    {
      title: "Gratitude Practice",
      description: "Write down 3 things you're grateful for today",
      points: 10,
      target: 3
    }
  ],
  INTERMEDIATE: [
    {
      title: "Exercise Session",
      description: "Complete 30 minutes of physical exercise",
      points: 25,
      target: 1
    },
    {
      title: "Social Connection",
      description: "Have a meaningful conversation with a friend or family member",
      points: 20,
      target: 1
    },
    {
      title: "Learning Time",
      description: "Spend 45 minutes learning something new",
      points: 30,
      target: 1
    },
    {
      title: "Cold Shower Challenge",
      description: "Take a cold shower for mental discipline",
      points: 15,
      target: 1
    }
  ],
  ADVANCED: [
    {
      title: "Mentor Someone",
      description: "Help a community member by commenting on their post",
      points: 35,
      target: 1
    },
    {
      title: "Creative Expression",
      description: "Spend 1 hour on a creative hobby or project",
      points: 40,
      target: 1
    },
    {
      title: "Fitness Challenge",
      description: "Complete an intense 45-minute workout",
      points: 45,
      target: 1
    },
    {
      title: "Community Leadership",
      description: "Start a discussion thread in the community",
      points: 50,
      target: 1
    }
  ]
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Get user's current tier based on streak
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { currentStreak: true }
    })

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Determine tier based on streak
    let tier: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' = 'BEGINNER'
    if (user.currentStreak >= 90) tier = 'ADVANCED'
    else if (user.currentStreak >= 30) tier = 'INTERMEDIATE'

    // Get today's date
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Get a random challenge for the user's tier
    const challenges = await db.dailyChallenge.findMany({
      where: {
        tier,
        isActive: true
      }
    })
    
    if (challenges.length === 0) {
      return NextResponse.json({ message: 'No challenges available' }, { status: 404 })
    }

    // Pick a random challenge
    const challenge = challenges[Math.floor(Math.random() * challenges.length)]

    // Check if user already has this challenge assigned today
    const userChallenge = await db.userDailyChallenge.findFirst({
      where: {
        userId: session.user.id,
        challengeId: challenge.id,
        assignedDate: {
          gte: today
        }
      }
    })

    const challengeWithProgress = {
      ...challenge,
      isCompleted: userChallenge?.completedAt !== null,
      completedAt: userChallenge?.completedAt || null
    }

    return NextResponse.json({ challenge: challengeWithProgress })
  } catch (error) {
    console.error('Daily challenge fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch daily challenge' },
      { status: 500 }
    )
  }
}
