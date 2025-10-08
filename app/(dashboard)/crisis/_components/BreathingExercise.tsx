'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, Pause, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [count, setCount] = useState(4)
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        setCount(prev => {
          if (prev === 1) {
            // Move to next phase
            setPhase(current => {
              if (current === 'inhale') return 'hold'
              if (current === 'hold') return 'exhale'
              setCycle(c => c + 1)
              return 'inhale'
            })
            return 4
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive])

  const toggleExercise = () => {
    setIsActive(!isActive)
  }

  const resetExercise = () => {
    setIsActive(false)
    setPhase('inhale')
    setCount(4)
    setCycle(0)
  }

  const getInstructions = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in slowly through your nose'
      case 'hold':
        return 'Hold your breath gently'
      case 'exhale':
        return 'Breathe out slowly through your mouth'
    }
  }

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'text-blue-600'
      case 'hold':
        return 'text-yellow-600'
      case 'exhale':
        return 'text-green-600'
    }
  }

  return (
    <Card className="p-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Breathing Exercise</h2>
        <p className="text-gray-600 mb-8">
          Use the 4-4-4 breathing technique to calm your mind and reduce stress
        </p>

        <div className="mb-8">
          <motion.div
            
            animate={{
              scale: phase === 'inhale' ? 1.2 : phase === 'exhale' ? 0.8 : 1,
              borderColor: phase === 'inhale' ? '#3b82f6' : phase === 'exhale' ? '#10b981' : '#eab308'
            }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800">{count}</div>
              <div className={`text-sm font-medium ${getPhaseColor()}`}>
                {phase.toUpperCase()}
              </div>
            </div>
          </motion.div>

          <p className={`text-lg font-medium mb-4 ${getPhaseColor()}`}>
            {getInstructions()}
          </p>

          <p className="text-sm text-gray-500">
            Completed cycles: {cycle}
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button onClick={toggleExercise} size="lg">
            {isActive ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
            {isActive ? 'Pause' : 'Start'}
          </Button>
          
          <Button variant="outline" onClick={resetExercise} size="lg">
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset
          </Button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>• Inhale for 4 seconds</p>
            <p>• Hold for 4 seconds</p>
            <p>• Exhale for 4 seconds</p>
            <p>• Repeat for 5-10 cycles</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
