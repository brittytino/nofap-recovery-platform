'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface AchievementPopupProps {
  achievement: {
    id: string
    title: string
    description: string
    icon?: string
    xpReward: number
  } | null
  onClose: () => void
}

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 50, maxWidth: '28rem' }}
        >
          <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Trophy className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Achievement Unlocked!</h3>
                  <p className="text-sm text-yellow-700">+{achievement.xpReward} XP</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <h4 className="text-base font-semibold text-gray-900 mb-1">
              {achievement.title}
            </h4>
            <p className="text-sm text-gray-600">
              {achievement.description}
            </p>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

