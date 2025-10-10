'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface XPBarProps {
  currentXP: number
  xpToNextLevel: number
  level: number
  compact?: boolean
}

export function XPBar({ currentXP, xpToNextLevel, level, compact = false }: XPBarProps) {
  const progress = (currentXP / xpToNextLevel) * 100

  const getGradientColor = (level: number) => {
    if (level >= 50) return 'from-purple-500 via-pink-500 to-purple-500'
    if (level >= 25) return 'from-blue-500 via-cyan-500 to-blue-500'
    if (level >= 10) return 'from-green-500 via-emerald-500 to-green-500'
    return 'from-gray-500 via-slate-500 to-gray-500'
  }

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <Star className="text-yellow-500" size={16} />
        <div className="flex-1">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              style={{ height: '100%' }}
              className={`bg-gradient-to-r ${getGradientColor(level)}`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
        <span className="text-xs font-medium text-gray-600 min-w-[60px] text-right">
          {currentXP}/{xpToNextLevel}
        </span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="text-yellow-500" size={20} />
          <span className="text-sm font-medium text-gray-700">
            Level {level}
          </span>
        </div>
        <span className="text-sm text-gray-600">
          {currentXP} / {xpToNextLevel} XP
        </span>
      </div>
      <div className="relative">
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className={`h-full bg-gradient-to-r ${getGradientColor(
              level
            )} shadow-lg relative overflow-hidden`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-700 drop-shadow-sm">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center">
        {xpToNextLevel - currentXP} XP to next level
      </p>
    </div>
  )
}

