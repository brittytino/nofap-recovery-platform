export interface User {
    id: string
    email: string
    name: string
    image?: string
    relationshipStatus: RelationshipStatus
    currentStreak: number
    longestStreak: number
    streakStart?: Date
    totalResets: number
    createdAt: Date
  }
  
  export interface DailyLog {
    id: string
    userId: string
    date: Date
    moodRating?: number
    energyLevel?: number
    confidenceLevel?: number
    urgeIntensity?: number
    notes?: string
    activitiesCompleted: string[]
  }
  
  export interface Achievement {
    id: string
    name: string
    description: string
    badgeImage: string
    category: AchievementCategory
    tier: AchievementTier
    requirement: number
    isActive: boolean
  }
  
  export interface ForumPost {
    id: string
    userId: string
    title: string
    content: string
    category: ForumCategory
    isAnonymous: boolean
    anonymousUsername?: string
    upvotes: number
    downvotes: number
    createdAt: Date
    updatedAt: Date
    isPinned: boolean
    _count?: {
      comments: number
    }
  }
  
  export interface Challenge {
    id: string
    title: string
    description: string
    category: ChallengeCategory
    tier: ChallengeTier
    points: number
    duration: number
    isActive: boolean
  }
  
  export type RelationshipStatus = 'SINGLE' | 'COMMITTED' | 'BROKEN_UP' | 'MARRIED'
  
  export type AchievementCategory = 'STREAK' | 'HEALTH' | 'SOCIAL' | 'MILESTONE'
  
  export type AchievementTier = 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' | 'LEGENDARY'
  
  export type ForumCategory = 'GENERAL' | 'SUCCESS_STORIES' | 'STRUGGLES' | 'FITNESS' | 'RELATIONSHIPS' | 'MENTAL_HEALTH'
  
  export type ChallengeCategory = 'FITNESS' | 'SOCIAL' | 'MINDFULNESS' | 'PRODUCTIVITY' | 'RECOVERY'
  
  export type ChallengeTier = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'MASTER'
  