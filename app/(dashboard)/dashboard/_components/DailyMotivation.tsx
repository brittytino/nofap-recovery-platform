'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Heart, Star, Target } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DailyMotivationProps {
  relationshipStatus: string
}

const motivations = {
  SINGLE: [
    "Enjoy your freedom and focus on self-improvement! 🌟",
    "Use this time to become the best version of yourself 💪",
    "Single doesn't mean alone - you have your goals and dreams! 🎯",
    "Build the life you want before sharing it with someone 🏗️",
    "Your energy is yours to invest in personal growth 🌱"
  ],
  COMMITTED: [
    "Be loyal to your partner and build trust together 💑",
    "Channel your energy into strengthening your relationship 💝",
    "Show your commitment through your actions today 🤝",
    "A healthy you contributes to a healthy relationship 💪",
    "Your discipline reflects your love and respect 🌹"
  ],
  BROKEN_UP: [
    "Forget your ex and focus on moving forward 🚀",
    "You have so much more to face in this world 🌍",
    "This ending is a new beginning in disguise ✨",
    "Healing takes time, but you're getting stronger daily 💪",
    "Your future holds better things than your past 🌅"
  ],
  MARRIED: [
    "Honor your marriage through your daily choices 💍",
    "Be the partner you'd want to be married to 💝",
    "Strong marriages are built on daily commitments 🏛️",
    "Your discipline strengthens your family bond 👨‍👩‍👧‍👦",
    "Lead by example in your household 🌟"
  ]
}

export function DailyMotivation({ relationshipStatus }: DailyMotivationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMotivation, setCurrentMotivation] = useState('')
  const [hasShownToday, setHasShownToday] = useState(false)

  useEffect(() => {
    // Check if motivation was already shown today
    const lastShown = localStorage.getItem('lastMotivationDate')
    const today = new Date().toDateString()
    
    if (lastShown !== today) {
      // Show motivation after a short delay
      const timer = setTimeout(() => {
        const messages = motivations[relationshipStatus as keyof typeof motivations] || motivations.SINGLE
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        setCurrentMotivation(randomMessage)
        setIsVisible(true)
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      setHasShownToday(true)
    }
  }, [relationshipStatus])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('lastMotivationDate', new Date().toDateString())
    setHasShownToday(true)
  }

  const handleShowAgain = () => {
    const messages = motivations[relationshipStatus as keyof typeof motivations] || motivations.SINGLE
    const randomMessage = messages[Math.floor(Math.random() * messages.length)]
    setCurrentMotivation(randomMessage)
    setIsVisible(true)
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Card className="max-w-md w-full p-6 text-center relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
                
                <div className="mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-recovery-400 to-recovery-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="text-white" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Daily Motivation
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {currentMotivation}
                  </p>
                </div>
                
                <Button onClick={handleClose} className="btn-primary w-full">
                  Let's Go! 🚀
                </Button>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {hasShownToday && (
        <Button
          onClick={handleShowAgain}
          variant="outline"
          className="flex items-center space-x-2"
        >
          <Heart size={16} />
          <span>Daily Motivation</span>
        </Button>
      )}
    </>
  )
}
