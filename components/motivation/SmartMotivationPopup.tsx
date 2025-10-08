'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Heart, Sun, Moon, Sparkles, X } from 'lucide-react'
import { motion } from 'framer-motion'

interface MotivationMessage {
  title: string
  message: string
  icon: 'heart' | 'sun' | 'moon' | 'sparkles'
  type: 'morning' | 'midday' | 'evening' | 'milestone'
}

interface SmartMotivationPopupProps {
  relationshipStatus: 'SINGLE' | 'COMMITTED' | 'BROKEN_UP' | 'MARRIED'
  userLevel: number
  currentStreak: number
}

const motivationsByStatus = {
  SINGLE: {
    morning: [
      { title: 'Good Morning, Champion!', message: 'Today is another opportunity to become the person you want to be. Focus on your growth and self-improvement.' },
      { title: 'Rise and Shine!', message: 'Being single is your superpower right now. Use this freedom to build the life you truly want.' },
      { title: 'New Day, New Wins!', message: 'You\'re not waiting for anyone to complete you. You\'re becoming complete on your own.' }
    ],
    midday: [
      { title: 'Midday Check-In', message: 'How\'s your day going? Remember, every moment you invest in yourself pays dividends.' },
      { title: 'Keep Going!', message: 'You\'re building something amazing - the best version of yourself. Stay focused.' }
    ],
    evening: [
      { title: 'Evening Reflection', message: 'Another day conquered! Reflect on your wins today, no matter how small.' },
      { title: 'Wind Down', message: 'You\'ve made it through another day. Be proud of your discipline and commitment.' }
    ]
  },
  COMMITTED: {
    morning: [
      { title: 'Good Morning!', message: 'Every day you choose commitment is a day you strengthen your relationship. Be the partner you\'d want to have.' },
      { title: 'Start Strong', message: 'Your loyalty today builds trust for tomorrow. Show your partner who you really are through your actions.' }
    ],
    midday: [
      { title: 'Stay True', message: 'Your commitment isn\'t just words - it\'s proven in moments like these. Keep being loyal.' },
      { title: 'Relationship Goals', message: 'A healthy you creates a healthy relationship. Your recovery benefits both of you.' }
    ],
    evening: [
      { title: 'Another Day of Loyalty', message: 'You honored your commitment today. That\'s what real love looks like.' },
      { title: 'Reflect Together', message: 'Your dedication to growth makes you a better partner every single day.' }
    ]
  },
  BROKEN_UP: {
    morning: [
      { title: 'New Beginnings', message: 'This ending is actually a new beginning. Focus on healing and becoming stronger.' },
      { title: 'Moving Forward', message: 'Every day you move forward is a victory. Your best chapter is still being written.' }
    ],
    midday: [
      { title: 'Healing Journey', message: 'Healing isn\'t linear, but you\'re making progress. Be patient with yourself.' },
      { title: 'Future Focus', message: 'The pain of today is building the strength of tomorrow. Keep going.' }
    ],
    evening: [
      { title: 'One Day Closer', message: 'You\'re one day closer to the happiness you deserve. Trust the process.' },
      { title: 'Self-Love', message: 'You\'re learning to love yourself first. That\'s the most important relationship.' }
    ]
  },
  MARRIED: {
    morning: [
      { title: 'Good Morning!', message: 'Honor your marriage vows through your daily choices. Be the spouse you committed to being.' },
      { title: 'Lead by Example', message: 'Strong marriages are built on daily commitments. Today is another building block.' }
    ],
    midday: [
      { title: 'Marriage Strong', message: 'Your dedication to recovery strengthens your marriage foundation.' },
      { title: 'Partner Pride', message: 'Every victory in your recovery is a gift to your marriage.' }
    ],
    evening: [
      { title: 'Day Well Done', message: 'You honored your marriage today through discipline and commitment.' },
      { title: 'Together Forever', message: 'Your recovery journey makes you a better life partner. Keep it up.' }
    ]
  }
}

export function SmartMotivationPopup({ relationshipStatus, userLevel, currentStreak }: SmartMotivationPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState<MotivationMessage | null>(null)

  useEffect(() => {
    const checkAndShowMotivation = () => {
      const now = new Date()
      const hour = now.getHours()
      const lastShown = localStorage.getItem('lastMotivationShown')
      const today = now.toDateString()

      // Don't show if already shown today
      if (lastShown === today) return

      let timeOfDay: 'morning' | 'midday' | 'evening' | null = null

      // Determine time of day
      if (hour >= 6 && hour < 12) {
        timeOfDay = 'morning'
      } else if (hour >= 12 && hour < 18) {
        timeOfDay = 'midday'
      } else if (hour >= 18 && hour < 23) {
        timeOfDay = 'evening'
      }

      if (!timeOfDay) return

      // Get appropriate messages for relationship status
      const messages = motivationsByStatus[relationshipStatus][timeOfDay]
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]

      // Determine icon based on time of day
      let icon: 'heart' | 'sun' | 'moon' | 'sparkles' = 'sparkles'
      if (timeOfDay === 'morning') icon = 'sun'
      else if (timeOfDay === 'evening') icon = 'moon'
      else icon = 'heart'

      setMessage({
        ...randomMessage,
        icon,
        type: timeOfDay
      })

      setIsOpen(true)
      localStorage.setItem('lastMotivationShown', today)
    }

    // Check on component mount
    const timer = setTimeout(checkAndShowMotivation, 2000) // Delay 2 seconds after page load

    return () => clearTimeout(timer)
  }, [relationshipStatus])

  const getIcon = () => {
    if (!message) return null
    switch (message.icon) {
      case 'sun': return <Sun className="h-12 w-12 text-yellow-500" />
      case 'moon': return <Moon className="h-12 w-12 text-indigo-500" />
      case 'heart': return <Heart className="h-12 w-12 text-red-500" />
      case 'sparkles': return <Sparkles className="h-12 w-12 text-purple-500" />
    }
  }

  if (!message) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center py-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4 flex justify-center"
          >
            {getIcon()}
          </motion.div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {message.title}
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            {message.message}
          </p>

          {currentStreak > 0 && (
            <div className="mb-6 p-4 bg-recovery-50 rounded-lg">
              <p className="text-sm text-recovery-700">
                🔥 <span className="font-bold">{currentStreak} day{currentStreak > 1 ? 's' : ''}</span> strong!
              </p>
            </div>
          )}

          <Button
            onClick={() => setIsOpen(false)}
            className="w-full bg-recovery-500 hover:bg-recovery-600"
          >
            Let's Do This! 💪
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

