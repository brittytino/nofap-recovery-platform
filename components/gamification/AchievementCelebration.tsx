'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Award, Zap } from 'lucide-react'
import confetti from 'canvas-confetti'

interface Achievement {
  id: string
  name: string
  description: string
  badgeImage: string
  tier: 'BRONZE' | 'SILVER' | 'GOLD' | 'DIAMOND' | 'LEGENDARY'
  xpEarned: number
}

interface AchievementCelebrationProps {
  achievement: Achievement | null
  onClose: () => void
}

const tierColors = {
  BRONZE: { bg: 'from-amber-700 to-amber-900', text: 'text-amber-500', border: 'border-amber-500' },
  SILVER: { bg: 'from-gray-400 to-gray-600', text: 'text-gray-400', border: 'border-gray-400' },
  GOLD: { bg: 'from-yellow-400 to-yellow-600', text: 'text-yellow-500', border: 'border-yellow-500' },
  DIAMOND: { bg: 'from-cyan-400 to-blue-600', text: 'text-cyan-400', border: 'border-cyan-400' },
  LEGENDARY: { bg: 'from-purple-500 to-pink-600', text: 'text-purple-500', border: 'border-purple-500' }
}

export function AchievementCelebration({ achievement, onClose }: AchievementCelebrationProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (achievement) {
      setShow(true)
      
      // Trigger confetti
      const duration = 3000
      const end = Date.now() + duration

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }
      frame()

      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(onClose, 500)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [achievement, onClose])

  if (!achievement) return null

  const colors = tierColors[achievement.tier]

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{ maxWidth: '28rem', width: '100%', position: 'relative' }}
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${colors.bg} opacity-20 blur-3xl rounded-3xl`} />
            
            {/* Card */}
            <div className="relative bg-gray-900 rounded-3xl p-8 border-2 border-gray-800 shadow-2xl">
              {/* Stars decoration */}
              <div className="absolute top-4 right-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Star className={`h-6 w-6 ${colors.text}`} fill="currentColor" />
                </motion.div>
              </div>

              <div className="text-center">
                {/* Title */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{ marginBottom: '1.5rem' }}
                >
                  <Trophy className={`h-12 w-12 mx-auto mb-2 ${colors.text}`} />
                  <h2 className="text-2xl font-bold text-white mb-1">Achievement Unlocked!</h2>
                  <p className="text-gray-400 text-sm">You're making incredible progress!</p>
                </motion.div>

                {/* Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                  style={{ marginBottom: '1.5rem' }}
                >
                  <div className={`inline-block p-4 rounded-full border-4 ${colors.border} bg-gradient-to-br ${colors.bg}`}>
                    <Award className="h-20 w-20 text-white" />
                  </div>
                </motion.div>

                {/* Achievement name */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  style={{ marginBottom: '1rem' }}
                >
                  <h3 className="text-3xl font-bold text-white mb-2">{achievement.name}</h3>
                  <p className="text-gray-300">{achievement.description}</p>
                </motion.div>

                {/* Tier badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                  style={{ marginBottom: '1.5rem' }}
                >
                  <span className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${colors.bg} text-white font-bold text-sm`}>
                    {achievement.tier} TIER
                  </span>
                </motion.div>

                {/* XP earned */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--recovery-500)' }}
                >
                  <Zap className="h-5 w-5" fill="currentColor" />
                  <span className="text-xl font-bold">+{achievement.xpEarned} XP</span>
                </motion.div>

                {/* Close button */}
                <div style={{ marginTop: '1.5rem' }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <button
                      onClick={() => {
                        setShow(false)
                        setTimeout(onClose, 500)
                      }}
                      className="px-6 py-2 bg-recovery-500 hover:bg-recovery-600 text-white rounded-full font-semibold transition-colors"
                    >
                      Awesome!
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

