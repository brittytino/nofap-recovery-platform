'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Sun, Battery, Smile, Moon, AlertTriangle, Target } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface DailyCheckInModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

export function DailyCheckInModal({ isOpen, onClose, onComplete }: DailyCheckInModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [checkInData, setCheckInData] = useState({
    stayedClean: true, // PRIMARY FIELD - Did you stay clean today?
    urgeIntensity: [0],
    energyLevel: [7],
    confidenceLevel: [7],
    notes: '',
    triggers: [] as string[],
    activitiesCompleted: [] as string[],
    copingStrategiesUsed: [] as string[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const triggerOptions = [
    'Boredom',
    'Stress/Anxiety', 
    'Alone at home',
    'Late night browsing',
    'Saw triggering content',
    'Loneliness',
    'Procrastination',
    'Social media scrolling',
    'None today'
  ]

  const activityOptions = [
    'Exercise/Workout',
    'Cold shower',
    'Meditation',
    'Social interaction',
    'Productive work',
    'Learning/Reading',
    'Creative activity',
    'Outdoor activity'
  ]

  const copingStrategiesOptions = [
    'Cold shower',
    'Push-ups/Exercise',
    'Went outside',
    'Called a friend',
    'Deep breathing',
    'Meditation',
    'Distraction activity',
    'Reviewed goals'
  ]

  const steps = [
    {
      title: 'Did you stay clean today?',
      subtitle: 'The most important question - be honest with yourself',
      icon: Target,
      color: 'text-green-500',
      component: (
        <div className="space-y-6">
          <div className="text-center">
            <Label className="text-xl mb-6 block font-semibold">Did you stay clean today?</Label>
            <div className="flex justify-center space-x-8">
              <button
                onClick={() => setCheckInData(prev => ({ ...prev, stayedClean: true }))}
                className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all ${
                  checkInData.stayedClean 
                    ? 'bg-green-500 text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ✅ YES - I stayed clean
              </button>
              <button
                onClick={() => setCheckInData(prev => ({ ...prev, stayedClean: false }))}
                className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all ${
                  !checkInData.stayedClean 
                    ? 'bg-red-500 text-white shadow-lg scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                ❌ NO - I relapsed
              </button>
            </div>
            {checkInData.stayedClean ? (
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-green-700 font-medium">🎉 Excellent! Another day of self-control!</p>
                <p className="text-green-600 text-sm mt-1">You're building incredible discipline. Keep going, warrior!</p>
              </div>
            ) : (
              <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                <p className="text-orange-700 font-medium">💪 It's okay - relapses happen</p>
                <p className="text-orange-600 text-sm mt-1">What matters is getting back up. Your streak resets, but your progress doesn't.</p>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      title: 'Urge Intensity',
      subtitle: 'How strong were your urges today?',
      icon: AlertTriangle,
      color: 'text-red-500',
      component: (
        <div className="space-y-6">
          <div>
            <Label className="text-lg mb-4 block">Urge Intensity: {checkInData.urgeIntensity[0]}/10</Label>
            <Slider
              value={checkInData.urgeIntensity}
              onValueChange={(value) => setCheckInData(prev => ({ ...prev, urgeIntensity: value }))}
              max={10}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>😌 No urges</span>
              <span>🔥 Very strong</span>
            </div>
          </div>

          {checkInData.urgeIntensity[0] > 0 && (
            <div>
              <Label className="text-base mb-2 block">What triggered these urges?</Label>
              <div className="grid grid-cols-2 gap-2">
                {triggerOptions.map((trigger) => (
                  <label key={trigger} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checkInData.triggers.includes(trigger)}
                      onChange={(e) => {
                        const newTriggers = e.target.checked
                          ? [...checkInData.triggers, trigger]
                          : checkInData.triggers.filter(t => t !== trigger)
                        setCheckInData(prev => ({ ...prev, triggers: newTriggers }))
                      }}
                      className="rounded"
                    />
                    <span>{trigger}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {checkInData.urgeIntensity[0] > 0 && (
            <div>
              <Label className="text-base mb-2 block">How did you cope with the urges?</Label>
              <div className="grid grid-cols-2 gap-2">
                {copingStrategiesOptions.map((strategy) => (
                  <label key={strategy} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checkInData.copingStrategiesUsed.includes(strategy)}
                      onChange={(e) => {
                        const newStrategies = e.target.checked
                          ? [...checkInData.copingStrategiesUsed, strategy]
                          : checkInData.copingStrategiesUsed.filter(s => s !== strategy)
                        setCheckInData(prev => ({ ...prev, copingStrategiesUsed: newStrategies }))
                      }}
                      className="rounded"
                    />
                    <span>{strategy}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Energy & Confidence',
      subtitle: 'How are you feeling today?',
      icon: Battery,
      color: 'text-blue-500',
      component: (
        <div className="space-y-6">
          <div>
            <Label className="text-lg mb-4 block">Energy Level: {checkInData.energyLevel[0]}/10</Label>
            <Slider
              value={checkInData.energyLevel}
              onValueChange={(value) => setCheckInData(prev => ({ ...prev, energyLevel: value }))}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              <span>🔋 Drained</span>
              <span>⚡ Energized</span>
            </div>
          </div>

          <div>
            <Label className="text-lg mb-4 block">Confidence Level: {checkInData.confidenceLevel[0]}/10</Label>
            <Slider
              value={checkInData.confidenceLevel}
              onValueChange={(value) => setCheckInData(prev => ({ ...prev, confidenceLevel: value }))}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              <span>😟 Low confidence</span>
              <span>💪 High confidence</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Positive Activities',
      subtitle: 'What did you do to build discipline today?',
      icon: Sun,
      color: 'text-orange-500',
      component: (
        <div className="space-y-6">
          <div>
            <Label className="text-base mb-2 block">Activities completed today:</Label>
            <div className="grid grid-cols-2 gap-2">
              {activityOptions.map((activity) => (
                <label key={activity} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checkInData.activitiesCompleted.includes(activity)}
                    onChange={(e) => {
                      const newActivities = e.target.checked
                        ? [...checkInData.activitiesCompleted, activity]
                        : checkInData.activitiesCompleted.filter(a => a !== activity)
                      setCheckInData(prev => ({ ...prev, activitiesCompleted: newActivities }))
                    }}
                    className="rounded"
                  />
                  <span>{activity}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="text-base mb-2 block">Reflection & Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={checkInData.notes}
              onChange={(e) => setCheckInData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="How are you feeling? Any wins, challenges, or insights from today?"
              rows={4}
            />
          </div>
        </div>
      )
    }
  ]

  const currentStepData = steps[currentStep]
  const Icon = currentStepData.icon

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      await handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/daily-log/check-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stayedClean: checkInData.stayedClean,
          energyLevel: checkInData.energyLevel[0],
          confidenceLevel: checkInData.confidenceLevel[0],
          urgeIntensity: checkInData.urgeIntensity[0],
          notes: checkInData.notes,
          triggers: checkInData.triggers,
          activitiesCompleted: checkInData.activitiesCompleted,
          copingStrategiesUsed: checkInData.copingStrategiesUsed
        })
      })

      if (response.ok) {
        const xpReward = checkInData.stayedClean ? 20 : 10 // More XP for staying clean
        toast.success(`Daily check-in completed! +${xpReward} XP`)
        onComplete?.()
        onClose()
      } else {
        toast.error('Failed to save check-in')
      }
    } catch (error) {
      console.error('Check-in error:', error)
      toast.error('An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 bg-gray-100 rounded-lg ${currentStepData.color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <DialogTitle className="text-2xl">{currentStepData.title}</DialogTitle>
              <p className="text-sm text-gray-600 mt-1">{currentStepData.subtitle}</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-recovery-600 font-medium">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-recovery-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </DialogHeader>

        <div className="py-4">
          {currentStepData.component}
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={isSubmitting}
            className="bg-recovery-500 hover:bg-recovery-600"
          >
            {currentStep < steps.length - 1 ? 'Next' : isSubmitting ? 'Saving...' : 'Complete Check-In'}
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-4">
          Daily check-ins help you stay accountable and build self-control
        </p>
      </DialogContent>
    </Dialog>
  )
}

