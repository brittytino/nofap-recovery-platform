'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Sun, Battery, Smile, Moon, AlertTriangle } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface DailyCheckInModalProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: () => void
}

export function DailyCheckInModal({ isOpen, onClose, onComplete }: DailyCheckInModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [checkInData, setCheckInData] = useState({
    moodRating: [7],
    energyLevel: [7],
    sleepQuality: [7],
    confidenceLevel: [7],
    urgeIntensity: [0],
    notes: '',
    triggers: [] as string[],
    activitiesCompleted: [] as string[]
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const triggerOptions = [
    'Stress/Anxiety',
    'Boredom',
    'Loneliness',
    'Social Media',
    'Work Pressure',
    'Relationship Issues',
    'Sleep Deprivation',
    'None Today'
  ]

  const activityOptions = [
    'Exercise',
    'Meditation',
    'Healthy Meal',
    'Social Interaction',
    'Productive Work',
    'Learning',
    'Creative Activity',
    'Self-Care'
  ]

  const steps = [
    {
      title: 'How are you feeling?',
      subtitle: 'Rate your overall mood today',
      icon: Smile,
      color: 'text-yellow-500',
      component: (
        <div className="space-y-6">
          <div>
            <Label className="text-lg mb-4 block">Mood Rating: {checkInData.moodRating[0]}/10</Label>
            <Slider
              value={checkInData.moodRating}
              onValueChange={(value) => setCheckInData(prev => ({ ...prev, moodRating: value }))}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>😔 Low</span>
              <span>😊 Great</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Energy Level',
      subtitle: 'How energetic do you feel?',
      icon: Battery,
      color: 'text-green-500',
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
            <div className="flex justify-between text-sm text-gray-500 mt-2">
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
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>😟 Low</span>
              <span>💪 High</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Sleep Quality',
      subtitle: 'How well did you sleep last night?',
      icon: Moon,
      color: 'text-indigo-500',
      component: (
        <div className="space-y-6">
          <div>
            <Label className="text-lg mb-4 block">Sleep Quality: {checkInData.sleepQuality[0]}/10</Label>
            <Slider
              value={checkInData.sleepQuality}
              onValueChange={(value) => setCheckInData(prev => ({ ...prev, sleepQuality: value }))}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>😴 Poor</span>
              <span>🌙 Excellent</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Urge Check',
      subtitle: 'Any urges or cravings today?',
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
              <span>✅ None</span>
              <span>⚠️ Strong</span>
            </div>
          </div>

          {checkInData.urgeIntensity[0] > 0 && (
            <div>
              <Label className="text-base mb-2 block">What triggered it?</Label>
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
        </div>
      )
    },
    {
      title: 'Daily Activities',
      subtitle: 'What positive activities did you complete?',
      icon: Sun,
      color: 'text-orange-500',
      component: (
        <div className="space-y-6">
          <div>
            <Label className="text-base mb-2 block">Select all that apply:</Label>
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
            <Label htmlFor="notes" className="text-base mb-2 block">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={checkInData.notes}
              onChange={(e) => setCheckInData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="How are you feeling? Any wins or challenges today?"
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
          moodRating: checkInData.moodRating[0],
          energyLevel: checkInData.energyLevel[0],
          confidenceLevel: checkInData.confidenceLevel[0],
          sleepQuality: checkInData.sleepQuality[0],
          urgeIntensity: checkInData.urgeIntensity[0],
          notes: checkInData.notes,
          triggers: checkInData.triggers,
          activitiesCompleted: checkInData.activitiesCompleted
        })
      })

      if (response.ok) {
        toast.success('Daily check-in completed! +10 XP')
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
          Daily check-ins help track your progress and identify patterns
        </p>
      </DialogContent>
    </Dialog>
  )
}

