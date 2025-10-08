import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // ============================================
  // ACHIEVEMENTS
  // ============================================
  console.log('📦 Seeding Achievements...')

  const achievements = [
    // STREAK ACHIEVEMENTS
    {
      name: 'First Step',
      description: 'Complete your first day of recovery',
      category: 'STREAK',
      tier: 'BRONZE',
      unlockCriteria: { type: 'streak', value: 1 },
      xpReward: 50,
      badgeImageUrl: '/badges/first-step.png',
    },
    {
      name: 'Week Warrior',
      description: 'Reach a 7-day streak',
      category: 'STREAK',
      tier: 'BRONZE',
      unlockCriteria: { type: 'streak', value: 7 },
      xpReward: 100,
      badgeImageUrl: '/badges/week-warrior.png',
    },
    {
      name: 'Two Weeks Strong',
      description: 'Maintain a 14-day streak',
      category: 'STREAK',
      tier: 'SILVER',
      unlockCriteria: { type: 'streak', value: 14 },
      xpReward: 150,
      badgeImageUrl: '/badges/two-weeks.png',
    },
    {
      name: 'Monthly Champion',
      description: 'Achieve a 30-day streak',
      category: 'STREAK',
      tier: 'SILVER',
      unlockCriteria: { type: 'streak', value: 30 },
      xpReward: 300,
      badgeImageUrl: '/badges/monthly.png',
    },
    {
      name: '90 Days of Change',
      description: 'Complete the critical 90-day reboot',
      category: 'STREAK',
      tier: 'GOLD',
      unlockCriteria: { type: 'streak', value: 90 },
      xpReward: 500,
      badgeImageUrl: '/badges/90-days.png',
    },
    {
      name: 'Half Year Hero',
      description: 'Reach 180 days of recovery',
      category: 'STREAK',
      tier: 'PLATINUM',
      unlockCriteria: { type: 'streak', value: 180 },
      xpReward: 1000,
      badgeImageUrl: '/badges/half-year.png',
    },
    {
      name: 'Year of Transformation',
      description: 'Complete a full year of recovery',
      category: 'STREAK',
      tier: 'DIAMOND',
      unlockCriteria: { type: 'streak', value: 365 },
      xpReward: 2000,
      badgeImageUrl: '/badges/year.png',
    },

    // HEALTH ACHIEVEMENTS
    {
      name: 'Fitness Starter',
      description: 'Log your first workout',
      category: 'HEALTH',
      tier: 'BRONZE',
      unlockCriteria: { type: 'activity', value: 'first_workout' },
      xpReward: 25,
      badgeImageUrl: '/badges/fitness-starter.png',
    },
    {
      name: 'Exercise Enthusiast',
      description: 'Complete 30 workouts',
      category: 'HEALTH',
      tier: 'SILVER',
      unlockCriteria: { type: 'activity', value: 'workouts_30' },
      xpReward: 200,
      badgeImageUrl: '/badges/exercise-enthusiast.png',
    },
    {
      name: 'Meditation Master',
      description: 'Meditate for 100 total hours',
      category: 'HEALTH',
      tier: 'GOLD',
      unlockCriteria: { type: 'activity', value: 'meditation_100h' },
      xpReward: 300,
      badgeImageUrl: '/badges/meditation-master.png',
    },
    {
      name: 'Sleep Champion',
      description: 'Log 30 nights of quality sleep (8+ hours)',
      category: 'HEALTH',
      tier: 'SILVER',
      unlockCriteria: { type: 'activity', value: 'sleep_30_nights' },
      xpReward: 150,
      badgeImageUrl: '/badges/sleep-champion.png',
    },

    // SOCIAL ACHIEVEMENTS
    {
      name: 'Social Butterfly',
      description: 'Log 50 social interactions',
      category: 'SOCIAL',
      tier: 'SILVER',
      unlockCriteria: { type: 'activity', value: 'social_50' },
      xpReward: 200,
      badgeImageUrl: '/badges/social-butterfly.png',
    },
    {
      name: 'Confidence Builder',
      description: 'Maintain high confidence (8+) for 7 days',
      category: 'SOCIAL',
      tier: 'GOLD',
      unlockCriteria: { type: 'activity', value: 'high_confidence_7d' },
      xpReward: 250,
      badgeImageUrl: '/badges/confidence.png',
    },

    // COMMUNITY ACHIEVEMENTS
    {
      name: 'Forum Newcomer',
      description: 'Make your first forum post',
      category: 'COMMUNITY',
      tier: 'BRONZE',
      unlockCriteria: { type: 'activity', value: 'first_post' },
      xpReward: 30,
      badgeImageUrl: '/badges/forum-newcomer.png',
    },
    {
      name: 'Helpful Hand',
      description: 'Receive 50 upvotes on your posts',
      category: 'COMMUNITY',
      tier: 'SILVER',
      unlockCriteria: { type: 'activity', value: 'upvotes_50' },
      xpReward: 150,
      badgeImageUrl: '/badges/helpful-hand.png',
    },
    {
      name: 'Community Leader',
      description: 'Create 25 forum posts helping others',
      category: 'COMMUNITY',
      tier: 'GOLD',
      unlockCriteria: { type: 'activity', value: 'posts_25' },
      xpReward: 300,
      badgeImageUrl: '/badges/community-leader.png',
    },

    // CHALLENGE ACHIEVEMENTS
    {
      name: 'Challenge Accepted',
      description: 'Complete your first daily challenge',
      category: 'CHALLENGE',
      tier: 'BRONZE',
      unlockCriteria: { type: 'activity', value: 'first_challenge' },
      xpReward: 40,
      badgeImageUrl: '/badges/challenge-accepted.png',
    },
    {
      name: 'Challenge Master',
      description: 'Complete 50 daily challenges',
      category: 'CHALLENGE',
      tier: 'GOLD',
      unlockCriteria: { type: 'activity', value: 'challenges_50' },
      xpReward: 400,
      badgeImageUrl: '/badges/challenge-master.png',
    },

    // SPECIAL ACHIEVEMENTS
    {
      name: 'Urge Conqueror',
      description: 'Successfully overcome 25 urges',
      category: 'SPECIAL',
      tier: 'GOLD',
      unlockCriteria: { type: 'activity', value: 'urges_overcome_25' },
      xpReward: 350,
      badgeImageUrl: '/badges/urge-conqueror.png',
    },
    {
      name: 'Early Bird',
      description: 'Complete morning check-in for 30 consecutive days',
      category: 'SPECIAL',
      tier: 'SILVER',
      unlockCriteria: { type: 'activity', value: 'morning_checkin_30' },
      xpReward: 200,
      badgeImageUrl: '/badges/early-bird.png',
    },
    {
      name: 'Phoenix Rising',
      description: 'Rebuild a 30-day streak after a reset',
      category: 'SPECIAL',
      tier: 'PLATINUM',
      unlockCriteria: { type: 'activity', value: 'comeback_30' },
      xpReward: 500,
      badgeImageUrl: '/badges/phoenix.png',
    },
  ]

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { name: achievement.name },
      update: achievement,
      create: achievement,
    })
  }

  console.log(`✅ Seeded ${achievements.length} achievements`)

  // ============================================
  // DAILY CHALLENGES
  // ============================================
  console.log('📦 Seeding Daily Challenges...')

  const challenges = [
    // FITNESS CHALLENGES
    {
      title: 'Morning Workout',
      description: 'Complete a 20-minute workout session to start your day strong',
      tier: 'BEGINNER',
      category: 'FITNESS',
      xpReward: 30,
      difficulty: 'EASY',
    },
    {
      title: 'Push-Up Power',
      description: 'Do 3 sets of 15 push-ups throughout the day',
      tier: 'BEGINNER',
      category: 'FITNESS',
      xpReward: 25,
      difficulty: 'EASY',
    },
    {
      title: '10K Steps',
      description: 'Walk at least 10,000 steps today',
      tier: 'INTERMEDIATE',
      category: 'FITNESS',
      xpReward: 40,
      difficulty: 'MEDIUM',
    },
    {
      title: 'Intense Cardio',
      description: 'Complete 30 minutes of high-intensity cardio exercise',
      tier: 'ADVANCED',
      category: 'FITNESS',
      xpReward: 50,
      difficulty: 'HARD',
    },
    {
      title: 'Full Body Workout',
      description: 'Complete a comprehensive 45-minute full-body workout',
      tier: 'MASTER',
      category: 'FITNESS',
      xpReward: 60,
      difficulty: 'EXTREME',
    },

    // MENTAL HEALTH CHALLENGES
    {
      title: 'Mindful Breathing',
      description: 'Practice 10 minutes of deep breathing exercises',
      tier: 'BEGINNER',
      category: 'MENTAL_HEALTH',
      xpReward: 20,
      difficulty: 'EASY',
    },
    {
      title: 'Meditation Session',
      description: 'Meditate for 15 minutes focusing on the present moment',
      tier: 'INTERMEDIATE',
      category: 'MENTAL_HEALTH',
      xpReward: 35,
      difficulty: 'MEDIUM',
    },
    {
      title: 'Gratitude Journal',
      description: 'Write down 5 things you are grateful for today',
      tier: 'BEGINNER',
      category: 'MENTAL_HEALTH',
      xpReward: 25,
      difficulty: 'EASY',
    },
    {
      title: 'Trigger Analysis',
      description: 'Identify and journal about your top 3 triggers and coping strategies',
      tier: 'ADVANCED',
      category: 'MENTAL_HEALTH',
      xpReward: 45,
      difficulty: 'MEDIUM',
    },
    {
      title: 'Cold Shower Challenge',
      description: 'Take a 5-minute cold shower to build mental resilience',
      tier: 'ADVANCED',
      category: 'MENTAL_HEALTH',
      xpReward: 50,
      difficulty: 'HARD',
    },

    // SOCIAL CHALLENGES
    {
      title: 'Meaningful Conversation',
      description: 'Have a genuine 15-minute conversation with someone face-to-face',
      tier: 'BEGINNER',
      category: 'SOCIAL',
      xpReward: 30,
      difficulty: 'EASY',
    },
    {
      title: 'Compliment Giver',
      description: 'Give genuine compliments to 3 different people today',
      tier: 'BEGINNER',
      category: 'SOCIAL',
      xpReward: 25,
      difficulty: 'EASY',
    },
    {
      title: 'Eye Contact Practice',
      description: 'Maintain confident eye contact in all conversations today',
      tier: 'INTERMEDIATE',
      category: 'SOCIAL',
      xpReward: 35,
      difficulty: 'MEDIUM',
    },
    {
      title: 'Social Event',
      description: 'Attend a social gathering or event',
      tier: 'ADVANCED',
      category: 'SOCIAL',
      xpReward: 50,
      difficulty: 'HARD',
    },
    {
      title: 'New Connection',
      description: 'Introduce yourself to someone new and exchange contact information',
      tier: 'ADVANCED',
      category: 'SOCIAL',
      xpReward: 55,
      difficulty: 'HARD',
    },

    // PRODUCTIVITY CHALLENGES
    {
      title: 'Morning Routine',
      description: 'Complete your morning routine before 8 AM',
      tier: 'BEGINNER',
      category: 'PRODUCTIVITY',
      xpReward: 25,
      difficulty: 'EASY',
    },
    {
      title: 'Phone-Free Hour',
      description: 'Spend 1 hour completely away from your phone',
      tier: 'INTERMEDIATE',
      category: 'PRODUCTIVITY',
      xpReward: 35,
      difficulty: 'MEDIUM',
    },
    {
      title: 'Deep Work Session',
      description: 'Complete 2 hours of focused, distraction-free work',
      tier: 'ADVANCED',
      category: 'PRODUCTIVITY',
      xpReward: 45,
      difficulty: 'HARD',
    },
    {
      title: 'Learn Something New',
      description: 'Spend 30 minutes learning a new skill or studying',
      tier: 'INTERMEDIATE',
      category: 'PRODUCTIVITY',
      xpReward: 40,
      difficulty: 'MEDIUM',
    },
    {
      title: 'Digital Detox',
      description: 'No social media or entertainment sites for the entire day',
      tier: 'MASTER',
      category: 'PRODUCTIVITY',
      xpReward: 70,
      difficulty: 'EXTREME',
    },

    // CREATIVITY CHALLENGES
    {
      title: 'Creative Expression',
      description: 'Spend 20 minutes on a creative hobby (drawing, music, writing)',
      tier: 'BEGINNER',
      category: 'CREATIVITY',
      xpReward: 30,
      difficulty: 'EASY',
    },
    {
      title: 'Write Your Story',
      description: 'Write 500 words about your recovery journey',
      tier: 'INTERMEDIATE',
      category: 'CREATIVITY',
      xpReward: 40,
      difficulty: 'MEDIUM',
    },
    {
      title: 'Photo Challenge',
      description: 'Take 10 creative photos showcasing your daily life',
      tier: 'BEGINNER',
      category: 'CREATIVITY',
      xpReward: 25,
      difficulty: 'EASY',
    },

    // SELF CARE CHALLENGES
    {
      title: 'Quality Sleep',
      description: 'Get at least 8 hours of quality sleep tonight',
      tier: 'BEGINNER',
      category: 'SELF_CARE',
      xpReward: 30,
      difficulty: 'EASY',
    },
    {
      title: 'Healthy Meal Prep',
      description: 'Prepare a nutritious, balanced meal',
      tier: 'BEGINNER',
      category: 'SELF_CARE',
      xpReward: 25,
      difficulty: 'EASY',
    },
    {
      title: 'Hydration Hero',
      description: 'Drink at least 8 glasses of water today',
      tier: 'BEGINNER',
      category: 'SELF_CARE',
      xpReward: 20,
      difficulty: 'EASY',
    },
    {
      title: 'Self-Care Sunday',
      description: 'Dedicate 2 hours to complete self-care and relaxation',
      tier: 'INTERMEDIATE',
      category: 'SELF_CARE',
      xpReward: 40,
      difficulty: 'MEDIUM',
    },
  ]

  for (const challenge of challenges) {
    await prisma.dailyChallenge.create({
      data: challenge,
    })
  }

  console.log(`✅ Seeded ${challenges.length} daily challenges`)

  // ============================================
  // FORUM CATEGORIES
  // ============================================
  console.log('📦 Seeding Forum Categories...')

  const categories = [
    {
      name: 'Getting Started',
      slug: 'getting-started',
      description: 'New to recovery? Start here for tips, guidance, and support',
      icon: '🌱',
      order: 1,
    },
    {
      name: 'Success Stories',
      slug: 'success-stories',
      description: 'Share your victories and inspire others on their journey',
      icon: '🏆',
      order: 2,
    },
    {
      name: 'Urge Management',
      slug: 'urge-management',
      description: 'Strategies and support for dealing with urges',
      icon: '🛡️',
      order: 3,
    },
    {
      name: 'Fitness & Health',
      slug: 'fitness-health',
      description: 'Exercise, nutrition, and physical wellness discussions',
      icon: '💪',
      order: 4,
    },
    {
      name: 'Relationships',
      slug: 'relationships',
      description: 'Dating, social skills, and relationship advice',
      icon: '❤️',
      order: 5,
    },
    {
      name: 'Mental Health',
      slug: 'mental-health',
      description: 'Anxiety, depression, and emotional well-being support',
      icon: '🧠',
      order: 6,
    },
    {
      name: 'Accountability',
      slug: 'accountability',
      description: 'Find accountability partners and track progress together',
      icon: '🤝',
      order: 7,
    },
    {
      name: 'Motivation',
      slug: 'motivation',
      description: 'Inspirational content to keep you going',
      icon: '⚡',
      order: 8,
    },
    {
      name: 'Relapse Recovery',
      slug: 'relapse-recovery',
      description: 'Support and guidance for getting back on track',
      icon: '🔄',
      order: 9,
    },
    {
      name: 'Science & Education',
      slug: 'science-education',
      description: 'Research, articles, and educational resources',
      icon: '📚',
      order: 10,
    },
  ]

  for (const category of categories) {
    await prisma.forumCategory.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    })
  }

  console.log(`✅ Seeded ${categories.length} forum categories`)

  console.log('🎉 Database seeding completed successfully!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
