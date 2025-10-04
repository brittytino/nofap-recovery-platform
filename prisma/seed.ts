import { PrismaClient } from '@prisma/client'
import { ACHIEVEMENT_DATA } from '../src/constants/achievements'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create achievements
  console.log('Creating achievements...')
  for (const achievement of ACHIEVEMENT_DATA) {
    await prisma.achievement.upsert({
      where: { name: achievement.name },
      update: {},
      create: achievement,
    })
  }

  // Create sample challenges
  console.log('Creating challenges...')
  const challenges = [
    {
      title: "Morning Meditation",
      description: "Start your day with 10 minutes of mindfulness meditation",
      category: "MINDFULNESS",
      tier: "BEGINNER",
      points: 15,
      duration: 1,
    },
    {
      title: "Exercise Session",
      description: "Complete 30 minutes of physical exercise",
      category: "FITNESS",
      tier: "BEGINNER",
      points: 25,
      duration: 1,
    },
    {
      title: "Social Connection",
      description: "Have a meaningful conversation with someone you care about",
      category: "SOCIAL",
      tier: "INTERMEDIATE",
      points: 20,
      duration: 1,
    },
    {
      title: "Learning Time",
      description: "Spend 1 hour learning something new",
      category: "PRODUCTIVITY",
      tier: "INTERMEDIATE",
      points: 30,
      duration: 1,
    },
    {
      title: "Community Leadership",
      description: "Create a helpful post in the community forum",
      category: "SOCIAL",
      tier: "ADVANCED",
      points: 50,
      duration: 1,
    },
    {
      title: "Mentor Session",
      description: "Help guide a newer community member",
      category: "SOCIAL",
      tier: "ADVANCED",
      points: 40,
      duration: 1,
    },
    {
      title: "Digital Detox",
      description: "Spend 4 hours completely offline",
      category: "MINDFULNESS",
      tier: "MASTER",
      points: 60,
      duration: 1,
    },
  ]

  for (const challenge of challenges) {
    await prisma.challenge.upsert({
      where: { title: challenge.title },
      update: {},
      create: challenge,
    })
  }

  // Create sample forum categories data
  console.log('Creating sample forum posts...')
  const samplePosts = [
    {
      title: "Welcome to the Community!",
      content: "This is a safe space for everyone on their recovery journey. Please be respectful and supportive of each other.",
      category: "GENERAL",
      isAnonymous: false,
      anonymousUsername: "CommunityMod1",
      isPinned: true,
      upvotes: 25,
    },
    {
      title: "90 Days Clean - My Success Story",
      content: "I never thought I'd make it this far, but here I am! The key was taking it one day at a time and staying connected with this amazing community.",
      category: "SUCCESS_STORIES",
      isAnonymous: true,
      anonymousUsername: "ProudWarrior123",
      upvotes: 45,
    },
    {
      title: "Struggling with Day 5",
      content: "Having a really tough time today. Any advice or encouragement would be appreciated.",
      category: "STRUGGLES",
      isAnonymous: true,
      anonymousUsername: "FightingHero456",
      upvotes: 12,
    },
    {
      title: "Best Workout Routines for Energy",
      content: "What exercises have you found most helpful for boosting energy and mood during recovery?",
      category: "FITNESS",
      isAnonymous: true,
      anonymousUsername: "FitnessFocus789",
      upvotes: 18,
    },
  ]

  // Since we don't have real users yet, we'll create these posts with a dummy user ID
  // In a real scenario, these would be created by actual users
  console.log('Sample posts would be created by real users after registration')

  console.log('Database seed completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
