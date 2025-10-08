'use client'

import { TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface LevelIndicatorProps {
  level: number
  currentXP: number
  xpToNextLevel: number
  showDetails?: boolean
}

export function LevelIndicator({
  level,
  currentXP,
  xpToNextLevel,
  showDetails = true,
}: LevelIndicatorProps) {
  const progress = (currentXP / xpToNextLevel) * 100

  const getLevelColor = (level: number) => {
    if (level >= 50) return 'from-purple-500 to-pink-500'
    if (level >= 25) return 'from-blue-500 to-cyan-500'
    if (level >= 10) return 'from-green-500 to-emerald-500'
    return 'from-gray-500 to-slate-500'
  }

  const getLevelTitle = (level: number) => {
    if (level >= 50) return 'Master'
    if (level >= 25) return 'Expert'
    if (level >= 10) return 'Advanced'
    if (level >= 5) return 'Intermediate'
    return 'Beginner'
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-14 h-14 rounded-full bg-gradient-to-br ${getLevelColor(
              level
            )} flex items-center justify-center text-white font-bold text-xl shadow-lg`}
          >
            {level}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Level {level}
            </h3>
            <p className="text-sm text-gray-600">{getLevelTitle(level)}</p>
          </div>
        </div>
        <TrendingUp className="text-gray-400" size={24} />
      </div>

      {showDetails && (
        <>
          <div className="relative">
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getLevelColor(
                  level
                )} transition-all duration-500 ease-out`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-sm">
            <span className="text-gray-600">
              {currentXP} / {xpToNextLevel} XP
            </span>
            <span className="text-gray-500 font-medium">
              {Math.round(progress)}%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {xpToNextLevel - currentXP} XP to Level {level + 1}
          </p>
        </>
      )}
    </Card>
  )
}

