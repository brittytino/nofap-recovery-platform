'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { 
  Plus, 
  Heart, 
  Zap, 
  MessageCircle, 
  Target,
  Calendar,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'react-hot-toast'

export function QuickActions() {
  const [showMoodModal, setShowMoodModal] = useState(false)
  const [showUrgeModal, setShowUrgeModal] = useState(false)
  const [showEnergyModal, setShowEnergyModal] = useState(false)

  const quickActions = [
    {
      icon: Heart,
      label: 'Log Mood',
      color: 'text-pink-600 bg-pink-50 hover:bg-pink-100',
      onClick: () => setShowMoodModal(true)
    },
    {
      icon: Zap,
      label: 'Log Energy',
      color: 'text-yellow-600 bg-yellow-50 hover:bg-yellow-100',
      onClick: () => setShowEnergyModal(true)
    },
    {
      icon: AlertTriangle,
      label: 'Report Urge',
      color: 'text-red-600 bg-red-50 hover:bg-red-100',
      onClick: () => setShowUrgeModal(true)
    },
    {
      icon: Target,
      label: 'Daily Challenge',
      color: 'text-blue-600 bg-blue-50 hover:bg-blue-100',
      onClick: () => window.location.href = '/challenges'
    },
    {
      icon: MessageCircle,
      label: 'Community',
      color: 'text-green-600 bg-green-50 hover:bg-green-100',
      onClick: () => window.location.href = '/forum'
    },
    {
      icon: TrendingUp,
      label: 'View Progress',
      color: 'text-purple-600 bg-purple-50 hover:bg-purple-100',
      onClick: () => window.location.href = '/streak'
    }
  ]

  const logMood = async (moodRating: number) => {
    try {
      const response = await fetch('/api/health/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moodRating, date: new Date() })
      })

      if (response.ok) {
        toast.success('Mood logged successfully!')
        setShowMoodModal(false)
      } else {
        toast.error('Failed to log mood')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const logEnergy = async (energyLevel: number) => {
    try {
      const response = await fetch('/api/health/energy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ energyLevel, date: new Date() })
      })

      if (response.ok) {
        toast.success('Energy level logged!')
        setShowEnergyModal(false)
      } else {
        toast.error('Failed to log energy')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const reportUrge = async (intensity: number) => {
    try {
      const response = await fetch('/api/health/urge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urgeIntensity: intensity, date: new Date() })
      })

      if (response.ok) {
        toast.success('Urge reported. You\'ve got this!')
        setShowUrgeModal(false)
        // Redirect to crisis management page
        window.location.href = '/crisis'
      } else {
        toast.error('Failed to report urge')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant="ghost"
              className={`p-4 h-auto flex flex-col items-center space-y-2 ${action.color} border-0`}
            >
              <action.icon size={24} />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Mood Modal */}
      <Modal isOpen={showMoodModal} onClose={() => setShowMoodModal(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">How are you feeling?</h3>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(rating => (
              <Button
                key={rating}
                onClick={() => logMood(rating)}
                variant="outline"
                className="aspect-square flex items-center justify-center"
              >
                {rating}
              </Button>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            1 = Very Low • 10 = Excellent
          </p>
        </div>
      </Modal>

      {/* Energy Modal */}
      <Modal isOpen={showEnergyModal} onClose={() => setShowEnergyModal(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Energy Level?</h3>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
              <Button
                key={level}
                onClick={() => logEnergy(level)}
                variant="outline"
                className="aspect-square flex items-center justify-center"
              >
                {level}
              </Button>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            1 = Exhausted • 10 = Energized
          </p>
        </div>
      </Modal>

      {/* Urge Modal */}
      <Modal isOpen={showUrgeModal} onClose={() => setShowUrgeModal(false)}>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Urge Intensity?</h3>
          <p className="text-sm text-gray-600 mb-4">
            Remember: You are stronger than this moment.
          </p>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(intensity => (
              <Button
                key={intensity}
                onClick={() => reportUrge(intensity)}
                variant="outline"
                className="aspect-square flex items-center justify-center"
              >
                {intensity}
              </Button>
            ))}
          </div>
          <p className="text-sm text-gray-600 text-center">
            1 = Mild • 10 = Very Strong
          </p>
        </div>
      </Modal>
    </>
  )
}
