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
    
    if (!session) {
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

    // Check if user already has a challenge for today
    let challenge = await db.challenge.findFirst({
      where: {
        tier,
        createdAt: {
          gte: today,
          lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
        }
      }
    })

    // If no challenge exists, create one
    if (!challenge) {
      const challenges = DAILY_CHALLENGES[tier]
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
      
      challenge = await db.challenge.create({
        data: {
          title: randomChallenge.title,
          description: randomChallenge.description,
          category: 'RECOVERY',
          tier,
          points: randomChallenge.points,
          duration: 1,
        }
      })
    }

    // Get user's progress for this challenge
    const progress = await db.challengeProgress.findUnique({
      where: {
        userId_challengeId: {
          userId: session.user.id,
          challengeId: challenge.id
        }
      }
    })

    const challengeWithProgress = {
      ...challenge,
      progress: progress?.progress || 0,
      isCompleted: progress?.isCompleted || false,
      target: 1 // Most daily challenges have target of 1
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
