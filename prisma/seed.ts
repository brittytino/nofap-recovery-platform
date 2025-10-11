import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // ============================================
  // ACHIEVEMENTS
  // ============================================
  console.log('📦 Seeding Achievements...')

  const achievements = [
    // NOFAP STREAK ACHIEVEMENTS - Updated to match milestone system
    {
      name: 'First Step',
      description: 'Day 1: The Beginning - Every journey starts with a single step',
      category: 'STREAK',
      tier: 'BRONZE',
      unlockCriteria: { type: 'streak', value: 1 },
      xpReward: 10,
      badgeImageUrl: '/badges/first-step.png',
    },
    {
      name: 'Weekend Warrior',
      description: '72 Hours Strong - You made it through the hardest 3 days',
      category: 'STREAK',
      tier: 'BRONZE',
      unlockCriteria: { type: 'streak', value: 3 },
      xpReward: 20,
      badgeImageUrl: '/badges/weekend-warrior.png',
    },
    {
      name: 'Week Warrior',
      description: 'One Week Clean - You\'ve survived the hardest week!',
      category: 'STREAK',
      tier: 'BRONZE',
      unlockCriteria: { type: 'streak', value: 7 },
      xpReward: 50,
      badgeImageUrl: '/badges/week-warrior.png',
    },
    {
      name: 'Fortnight Master',
      description: 'Two Weeks of Control - Your willpower is growing strong',
      category: 'STREAK',
      tier: 'SILVER',
      unlockCriteria: { type: 'streak', value: 14 },
      xpReward: 100,
      badgeImageUrl: '/badges/fortnight-master.png',
    },
    {
      name: 'Month Champion',
      description: '30 Days Reboot - You\'ve broken the addiction cycle!',
      category: 'STREAK',
      tier: 'SILVER',
      unlockCriteria: { type: 'streak', value: 30 },
      xpReward: 200,
      badgeImageUrl: '/badges/month-champion.png',
    },
    {
      name: 'Discipline Expert',
      description: '60 Days Transformed - You\'re becoming a new person',
      category: 'STREAK',
      tier: 'GOLD',
      unlockCriteria: { type: 'streak', value: 60 },
      xpReward: 400,
      badgeImageUrl: '/badges/discipline-expert.png',
    },
    {
      name: 'Reboot Legend',
      description: '90-Day Reboot Complete - You\'ve achieved the legendary 90 days!',
      category: 'STREAK',
      tier: 'GOLD',
      unlockCriteria: { type: 'streak', value: 90 },
      xpReward: 1000,
      badgeImageUrl: '/badges/reboot-legend.png',
    },
    {
      name: 'Self-Control Master',
      description: 'Half Year of Mastery - Your discipline is legendary',
      category: 'STREAK',
      tier: 'PLATINUM',
      unlockCriteria: { type: 'streak', value: 180 },
      xpReward: 2000,
      badgeImageUrl: '/badges/self-control-master.png',
    },
    {
      name: 'Warrior King',
      description: 'One Year Streak - You are in the top 1% of men! 👑',
      category: 'STREAK',
      tier: 'DIAMOND',
      unlockCriteria: { type: 'streak', value: 365 },
      xpReward: 5000,
      badgeImageUrl: '/badges/warrior-king.png',
    },

    // NOFAP HEALTH ACHIEVEMENTS
    {
      name: 'Cold Shower Warrior',
      description: 'Take your first cold shower - building mental resilience',
      category: 'HEALTH',
      tier: 'BRONZE',
      unlockCriteria: { type: 'activity', value: 'first_cold_shower' },
      xpReward: 25,
      badgeImageUrl: '/badges/cold-shower-warrior.png',
    },
    {
      name: 'Exercise Enthusiast',
      description: 'Channel your energy - Complete 30 workouts',
      category: 'HEALTH',
      tier: 'SILVER',
      unlockCriteria: { type: 'activity', value: 'workouts_30' },
      xpReward: 200,
      badgeImageUrl: '/badges/exercise-enthusiast.png',
    },
    {
      name: 'Meditation Master',
      description: 'Master your mind - Meditate for 100 total sessions',
      category: 'HEALTH',
      tier: 'GOLD',
      unlockCriteria: { type: 'activity', value: 'meditation_100' },
      xpReward: 300,
      badgeImageUrl: '/badges/meditation-master.png',
    },
    {
      name: 'Energy Boost',
      description: 'Report high energy (8+) for 7 consecutive days',
      category: 'HEALTH',
      tier: 'SILVER',
      unlockCriteria: { type: 'activity', value: 'high_energy_7d' },
      xpReward: 150,
      badgeImageUrl: '/badges/energy-boost.png',
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

    // NOFAP SPECIAL ACHIEVEMENTS
    {
      name: 'Urge Conqueror',
      description: 'Successfully resist 25 strong urges - Master of self-control',
      category: 'SPECIAL',
      tier: 'GOLD',
      unlockCriteria: { type: 'activity', value: 'urges_overcome_25' },
      xpReward: 350,
      badgeImageUrl: '/badges/urge-conqueror.png',
    },
    {
      name: 'Daily Warrior',
      description: 'Complete daily check-ins for 30 consecutive days',
      category: 'SPECIAL',
      tier: 'SILVER',
      unlockCriteria: { type: 'activity', value: 'daily_checkin_30' },
      xpReward: 200,
      badgeImageUrl: '/badges/daily-warrior.png',
    },
    {
      name: 'Phoenix Rising',
      description: 'Rebuild a 30-day streak after relapse - True resilience',
      category: 'SPECIAL',
      tier: 'PLATINUM',
      unlockCriteria: { type: 'activity', value: 'comeback_30' },
      xpReward: 500,
      badgeImageUrl: '/badges/phoenix.png',
    },
    {
      name: 'Brotherhood Helper',
      description: 'Help 50 fellow warriors in the forum',
      category: 'SPECIAL',
      tier: 'GOLD',
      unlockCriteria: { type: 'activity', value: 'help_others_50' },
      xpReward: 400,
      badgeImageUrl: '/badges/brotherhood-helper.png',
    },
  ]

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { name: achievement.name },
      update: achievement as any,
      create: achievement as any,
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
      description: 'Write 500 words about your wellness transformation',
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
      data: challenge as any,
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
      description: 'New to NoFap? First-timers asking questions and getting support',
      icon: '🌱',
      order: 1,
    },
    {
      name: 'Success Stories',
      slug: 'success-stories',
      description: 'Celebrating milestones and inspiring fellow warriors',
      icon: '🏆',
      order: 2,
    },
    {
      name: 'Urge Management',
      slug: 'urge-management',
      description: 'Real-time support during struggles and urge resistance strategies',
      icon: '🛡️',
      order: 3,
    },
    {
      name: 'Relapse Recovery',
      slug: 'relapse-recovery',
      description: 'Bouncing back after resets - no shame, just support',
      icon: '🔄',
      order: 4,
    },
    {
      name: 'Benefits & Changes',
      slug: 'benefits-changes',
      description: 'Discussing physical and mental improvements from NoFap',
      icon: '⚡',
      order: 5,
    },
    {
      name: 'Accountability Partners',
      slug: 'accountability-partners',
      description: 'Finding support buddies and tracking progress together',
      icon: '🤝',
      order: 6,
    },
    {
      name: 'Fitness & Cold Showers',
      slug: 'fitness-cold-showers',
      description: 'Popular NoFap practices - exercise and cold exposure',
      icon: '💪',
      order: 7,
    },
    {
      name: 'Relationships & Dating',
      slug: 'relationships-dating',
      description: 'Improved social confidence and real-world connections',
      icon: '❤️',
      order: 8,
    },
    {
      name: 'Productivity & Goals',
      slug: 'productivity-goals',
      description: 'Using reclaimed time and energy for meaningful pursuits',
      icon: '🎯',
      order: 9,
    },
    {
      name: 'Motivation & Inspiration',
      slug: 'motivation-inspiration',
      description: 'Daily encouragement and brotherhood support',
      icon: '🔥',
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
