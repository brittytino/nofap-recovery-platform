import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatStreakTime(streakStart: Date | null): string {
  if (!streakStart) return 'Not started'
  
  const now = new Date()
  const start = new Date(streakStart)
  const diffTime = Math.abs(now.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 1) return '1 day'
  if (diffDays < 30) return `${diffDays} days`
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    const remainingDays = diffDays % 30
    return `${months} month${months > 1 ? 's' : ''} ${remainingDays > 0 ? `${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''}`
  }
  
  const years = Math.floor(diffDays / 365)
  const remainingDays = diffDays % 365
  return `${years} year${years > 1 ? 's' : ''} ${remainingDays > 0 ? `${remainingDays} day${remainingDays > 1 ? 's' : ''}` : ''}`
}

export function getStreakMotivation(streak: number): string {
  if (streak >= 365) return "Legendary! You're an inspiration! 🏆"
  if (streak >= 180) return "Incredible dedication! Keep soaring! 🚀"
  if (streak >= 90) return "Amazing progress! You're unstoppable! 🌟"
  if (streak >= 30) return "Great momentum! Keep it up! 💪"
  if (streak >= 7) return "Strong start! You're building something great! 🔥"
  if (streak >= 1) return "Every journey begins with a single step! 🌱"
  return "Ready to begin your journey? 🌟"
}

export function generateAnonymousUsername(): string {
  const adjectives = [
    'Strong', 'Brave', 'Determined', 'Focused', 'Resilient', 'Motivated',
    'Inspiring', 'Dedicated', 'Persistent', 'Confident', 'Courageous', 'Ambitious'
  ]
  
  const nouns = [
    'Warrior', 'Champion', 'Hero', 'Phoenix', 'Eagle', 'Lion',
    'Tiger', 'Bear', 'Wolf', 'Falcon', 'Dragon', 'Knight'
  ]
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const number = Math.floor(Math.random() * 999) + 1
  
  return `${adjective}${noun}${number}`
}

export function calculateXP(activities: {
  streakDays: number
  moodLogs: number
  exerciseSessions: number
  forumPosts: number
  challengesCompleted: number
  achievementsUnlocked: number
}): number {
  return (
    activities.streakDays * 10 +
    activities.moodLogs * 5 +
    activities.exerciseSessions * 15 +
    activities.forumPosts * 20 +
    activities.challengesCompleted * 50 +
    activities.achievementsUnlocked * 100
  )
}

export function getXPLevel(totalXP: number): number {
  return Math.floor(totalXP / 500) + 1
}

export function getXPForNextLevel(currentXP: number): number {
  const currentLevel = getXPLevel(currentXP)
  const nextLevelXP = currentLevel * 500
  return nextLevelXP - currentXP
}
