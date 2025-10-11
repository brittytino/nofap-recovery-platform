'use client'

import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatDistanceToNow, format } from 'date-fns'
import { Flame, Trophy, Calendar, Zap } from 'lucide-react'
import { useUserData } from '@/hooks/useUserData'

interface StreakCounterProps {
  currentStreak?: number
  longestStreak?: number
  streakStart?: Date | null
}

// NoFap Milestone System
const MILESTONES: Record<number, { title: string; reward: number; badge: string; color: string }> = {
  1: { title: "Day 1: The Beginning", reward: 10, badge: "First Step", color: "text-green-500" },
  3: { title: "72 Hours Strong", reward: 20, badge: "Weekend Warrior", color: "text-green-600" },
  7: { title: "One Week Clean", reward: 50, badge: "Week Warrior", color: "text-blue-500" },
  14: { title: "Two Weeks of Control", reward: 100, badge: "Fortnight Master", color: "text-blue-600" },
  30: { title: "30 Days Reboot", reward: 200, badge: "Month Champion", color: "text-purple-500" },
  60: { title: "60 Days Transformed", reward: 400, badge: "Discipline Expert", color: "text-purple-600" },
  90: { title: "90-Day Reboot Complete", reward: 1000, badge: "Reboot Legend", color: "text-yellow-500" },
  180: { title: "Half Year of Mastery", reward: 2000, badge: "Self-Control Master", color: "text-yellow-600" },
  365: { title: "One Year Streak", reward: 5000, badge: "Warrior King", color: "text-red-500" }
}

export function StreakCounter({ 
  currentStreak: propStreak, 
  longestStreak: propLongestStreak, 
  streakStart: propStreakStart 
}: StreakCounterProps) {
  const { userData, isLoading } = useUserData()
  
  // Use props if provided, otherwise use fetched data
  const currentStreak = propStreak ?? userData.currentStreak
  const longestStreak = propLongestStreak ?? userData.longestStreak
  const streakStart = propStreakStart ?? userData.streakStartDate

  const timeElapsed = streakStart ? formatDistanceToNow(new Date(streakStart)) : null

  // Calculate next milestone
  const milestoneKeys = Object.keys(MILESTONES).map(Number).sort((a, b) => a - b)
  const nextMilestone = milestoneKeys.find(milestone => milestone > currentStreak) || milestoneKeys[milestoneKeys.length - 1]
  const progressToNext = nextMilestone ? Math.min((currentStreak / nextMilestone) * 100, 100) : 100

  // Get current milestone info
  const currentMilestone = milestoneKeys.reverse().find(milestone => milestone <= currentStreak)
  const milestoneInfo = currentMilestone ? MILESTONES[currentMilestone] : null

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm">
          <div className="text-center space-y-4 sm:space-y-6 animate-pulse">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-neutral-200 dark:bg-neutral-700 rounded-full mx-auto"></div>
            <div className="w-24 sm:w-32 h-8 sm:h-12 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto"></div>
            <div className="w-40 sm:w-48 h-4 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto"></div>
            <div className="w-full max-w-md mx-auto space-y-2">
              <div className="w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              <div className="w-3/4 h-3 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto"></div>
            </div>
          </div>
        </div>
        
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 animate-pulse">
              <div className="text-center space-y-3">
                <div className="w-8 h-8 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto"></div>
                <div className="w-16 h-8 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto"></div>
                <div className="w-20 h-4 bg-neutral-200 dark:bg-neutral-700 rounded mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const getStreakColor = (streak: number) => {
    if (streak >= 365) return 'text-red-500'
    if (streak >= 180) return 'text-yellow-600'
    if (streak >= 90) return 'text-yellow-500'
    if (streak >= 30) return 'text-purple-500'
    if (streak >= 7) return 'text-blue-500'
    if (streak >= 1) return 'text-green-500'
    return 'text-gray-500'
  }

  const getStreakMessage = (streak: number) => {
    if (streak >= 365) return 'WARRIOR KING! You are in the top 1% of men! 👑'
    if (streak >= 180) return 'SELF-CONTROL MASTER! Your discipline is legendary! 🏆'
    if (streak >= 90) return 'REBOOT LEGEND! You\'ve completed the 90-day reboot! 🌟'
    if (streak >= 60) return 'DISCIPLINE EXPERT! You\'re transforming into a new person! ⚡'
    if (streak >= 30) return 'MONTH CHAMPION! You\'ve broken the addiction cycle! 💪'
    if (streak >= 14) return 'FORTNIGHT MASTER! Your willpower is growing strong! 🔥'
    if (streak >= 7) return 'WEEK WARRIOR! You\'ve survived the hardest week! 🛡️'
    if (streak >= 3) return 'WEEKEND WARRIOR! You made it through 72 hours! 💎'
    if (streak >= 1) return 'FIRST STEP! Every journey begins with day one! 🌱'
    return 'Ready to begin your transformation? 🚀'
  }

  const getFireSize = (streak: number) => {
    if (streak >= 365) return 'text-8xl animate-pulse'
    if (streak >= 180) return 'text-7xl animate-bounce'
    if (streak >= 90) return 'text-6xl'
    if (streak >= 30) return 'text-5xl'
    if (streak >= 7) return 'text-4xl'
    return 'text-3xl'
  }

  const getCurrentLevel = (streak: number) => {
    if (streak >= 365) return 'Immortal'
    if (streak >= 180) return 'Titan'
    if (streak >= 90) return 'Legend'
    if (streak >= 60) return 'Master'
    if (streak >= 30) return 'Champion'
    if (streak >= 14) return 'Warrior'
    if (streak >= 7) return 'Fighter'
    return 'Beginner'
  }

  return (
    <div className="space-y-6">
      {/* GIANT HERO STREAK COUNTER */}
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="text-center space-y-4 sm:space-y-6">
          {/* Fire Icon that grows with streak */}
          <div className="flex justify-center">
            <div className="relative">
              <Flame className={`${getFireSize(currentStreak)} ${getStreakColor(currentStreak)} animate-fire-pulse`} />
              <div className="absolute inset-0 animate-streak-glow rounded-full" />
            </div>
          </div>
          
          {/* Giant Streak Number */}
          <div>
            <div className={`text-6xl sm:text-7xl lg:text-8xl font-black mb-2 ${getStreakColor(currentStreak)} animate-number-pop`}>
              {currentStreak}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-neutral-700 dark:text-neutral-300 mb-2">
              {currentStreak === 1 ? 'DAY CLEAN' : 'DAYS CLEAN'}
            </div>
            <div className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl mx-auto px-4">
              {getStreakMessage(currentStreak)}
            </div>
          </div>

          {/* Next Milestone Progress */}
          <div className="max-w-md mx-auto space-y-3 px-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                Next: {nextMilestone} Days
              </span>
              <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {Math.round(progressToNext)}%
              </span>
            </div>
            <Progress value={progressToNext} className="h-2 sm:h-3" />
            <div className="text-center">
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                {nextMilestone - currentStreak} days to go!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Personal Best */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="text-center">
            <Trophy className="h-8 w-8 text-warning-500 mx-auto mb-3 animate-bounce-in" />
            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              {longestStreak}
            </div>
            <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Personal Best
            </div>
          </div>
        </div>

        {/* Journey Start */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="text-center">
            <Calendar className="h-8 w-8 text-primary-500 mx-auto mb-3" />
            <div className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
              {streakStart ? format(new Date(streakStart), 'MMM dd, yyyy') : 'Not started'}
            </div>
            <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Journey Started
            </div>
            {timeElapsed && (
              <div className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                {timeElapsed} ago
              </div>
            )}
          </div>
        </div>

        {/* Current Level */}
        <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] sm:col-span-2 lg:col-span-1">
          <div className="text-center">
            <Zap className="h-8 w-8 text-success-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-neutral-900 dark:text-white mb-1">
              {getCurrentLevel(currentStreak)}
            </div>
            <div className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Current Level
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
