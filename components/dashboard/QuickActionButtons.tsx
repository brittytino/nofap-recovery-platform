'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  CheckCircle, 
  Activity, 
  AlertCircle, 
  TrendingUp, 
  MessageSquare,
  Heart 
} from 'lucide-react'
import { DailyCheckInModal } from './DailyCheckInModal'
import { CrisisModal } from '../crisis/CrisisModal'

export function QuickActionButtons() {
  const [checkInOpen, setCheckInOpen] = useState(false)
  const [crisisOpen, setCrisisOpen] = useState(false)

  const quickActions = [
    {
      id: 'check-in',
      label: 'Daily Check-In',
      icon: CheckCircle,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => setCheckInOpen(true)
    },
    {
      id: 'health',
      label: 'Log Activity',
      icon: Activity,
      color: 'bg-blue-500 hover:bg-blue-600',
      href: '/health'
    },
    {
      id: 'sos',
      label: 'Need Help?',
      icon: AlertCircle,
      color: 'bg-red-500 hover:bg-red-600',
      onClick: () => setCrisisOpen(true)
    },
    {
      id: 'progress',
      label: 'View Progress',
      icon: TrendingUp,
      color: 'bg-purple-500 hover:bg-purple-600',
      href: '/streak'
    },
    {
      id: 'forum',
      label: 'Community',
      icon: MessageSquare,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      href: '/forum'
    },
    {
      id: 'motivation',
      label: 'Get Inspired',
      icon: Heart,
      color: 'bg-pink-500 hover:bg-pink-600',
      href: '/success-stories'
    }
  ]

  return (
    <>
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon
            
            if (action.onClick) {
              return (
                <Button
                  key={action.id}
                  onClick={action.onClick}
                  className={`${action.color} text-white flex flex-col items-center justify-center h-24 space-y-2`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              )
            }

            return (
              <a
                key={action.id}
                href={action.href}
                className={`${action.color} text-white flex flex-col items-center justify-center h-24 space-y-2 rounded-md transition-colors`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </a>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <span className="font-medium">Pro Tip:</span> Complete your daily check-in every morning to earn XP and track your progress!
          </p>
        </div>
      </div>

      <DailyCheckInModal 
        isOpen={checkInOpen} 
        onClose={() => setCheckInOpen(false)}
        onComplete={() => {
          // Refresh dashboard or show success message
          window.location.reload()
        }}
      />

      <CrisisModal 
        isOpen={crisisOpen} 
        onClose={() => setCrisisOpen(false)}
      />
    </>
  )
}

