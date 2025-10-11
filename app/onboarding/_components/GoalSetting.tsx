'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Flame, Calendar, Trophy } from 'lucide-react'

interface GoalSettingProps {
  onNext: (data: any) => void
  onPrevious?: () => void
  data: any
}

export function GoalSetting({ onNext, onPrevious, data }: GoalSettingProps) {
  const [goals, setGoals] = useState({
    primaryGoal: data.primaryGoal || '',
    streakGoal: data.streakGoal || '7',
    healthGoals: data.healthGoals || [],
    personalGoals: data.personalGoals || '',
    timeline: data.timeline || '90',
    successMeasures: data.successMeasures || []
  })

  const healthGoalOptions = [
    'Improve self-control and discipline',
    'Boost confidence and energy',
    'Improve focus and concentration',
    'Better real-world relationships',
    'Reclaim time for productive goals',
    'Break compulsive habits',
    'Experience the NoFap benefits',
    'Improve sleep quality',
    'Reduce social anxiety',
    'Build mental resilience',
    'Increase motivation',
    'Better emotional regulation'
  ]

  const timelineOptions = [
    { value: '7', label: '7 days (Beginner - First week)' },
    { value: '30', label: '30 days (Intermediate - Break the cycle)' },
    { value: '90', label: '90 days (Reboot - Recommended)' },
    { value: '365', label: '365 days (Ultimate Challenge)' },
    { value: 'ongoing', label: 'Lifelong journey' }
  ]

  const successMeasureOptions = [
    'Enhanced self-control',
    'Increased confidence',
    'Better energy levels',
    'Improved focus and concentration',
    'Better real-world relationships',
    'Reduced social anxiety',
    'More productive use of time',
    'Better sleep quality',
    'Increased motivation',
    'Improved mood stability',
    'Greater life satisfaction',
    'Stronger willpower'
  ]

  const toggleArrayItem = (array: string[], item: string, setter: (items: string[]) => void) => {
    const newArray = array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item]
    setter(newArray)
  }

  const handleNext = () => {
    onNext(goals)
  }

  return (
    <Card className="p-8">
      <div className="text-center mb-8">
        <Flame className="h-12 w-12 text-orange-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Your NoFap Goals</h2>
        <p className="text-gray-600">
          Clear goals help you build self-control and transform your life
        </p>
      </div>

      <div className="space-y-8">
        {/* Primary Goal */}
        <div>
          <Label htmlFor="primaryGoal" className="text-base font-semibold text-gray-900 mb-3 block">
            What's your primary NoFap goal?
          </Label>
          <Textarea
            id="primaryGoal"
            value={goals.primaryGoal}
            onChange={(e) => setGoals(prev => ({ ...prev, primaryGoal: e.target.value }))}
            placeholder="e.g., I want to build self-control, improve my confidence, and have better real-world relationships..."
            rows={3}
            className="w-full"
          />
        </div>

        {/* Streak Goal */}
        <div>
          <Label htmlFor="streakGoal" className="text-base font-semibold text-gray-900 mb-3 block flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Initial streak target (days)
          </Label>
          <Input
            id="streakGoal"
            type="number"
            value={goals.streakGoal}
            onChange={(e) => setGoals(prev => ({ ...prev, streakGoal: e.target.value }))}
            placeholder="7"
            min="1"
            max="365"
            className="w-32"
          />
          <p className="text-sm text-gray-500 mt-1">
            Start with a realistic target. You can always set new goals as you progress!
          </p>
        </div>

        {/* Health Goals */}
        <div>
          <Label className="text-base font-semibold text-gray-900 mb-3 block">
            What health improvements do you hope to see?
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {healthGoalOptions.map((goal) => (
              <label key={goal} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={goals.healthGoals.includes(goal)}
                  onChange={() => toggleArrayItem(
                    goals.healthGoals, 
                    goal, 
                    (items) => setGoals(prev => ({ ...prev, healthGoals: items }))
                  )}
                  className="rounded"
                />
                <span className="text-sm">{goal}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Personal Goals */}
        <div>
          <Label htmlFor="personalGoals" className="text-base font-semibold text-gray-900 mb-3 block">
            Personal growth goals (optional)
          </Label>
          <Textarea
            id="personalGoals"
            value={goals.personalGoals}
            onChange={(e) => setGoals(prev => ({ ...prev, personalGoals: e.target.value }))}
            placeholder="What personal development goals do you have? Career, relationships, hobbies, skills..."
            rows={3}
          />
        </div>

        {/* Timeline */}
        <div>
          <Label className="text-base font-semibold text-gray-900 mb-3 block">
            What's your initial timeline?
          </Label>
          <div className="space-y-2">
            {timelineOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="timeline"
                  value={option.value}
                  checked={goals.timeline === option.value}
                  onChange={(e) => setGoals(prev => ({ ...prev, timeline: e.target.value }))}
                  className="rounded"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Success Measures */}
        <div>
          <Label className="text-base font-semibold text-gray-900 mb-3 block flex items-center">
            <Trophy className="h-4 w-4 mr-2" />
            How will you measure success?
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {successMeasureOptions.map((measure) => (
              <label key={measure} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={goals.successMeasures.includes(measure)}
                  onChange={() => toggleArrayItem(
                    goals.successMeasures, 
                    measure, 
                    (items) => setGoals(prev => ({ ...prev, successMeasures: items }))
                  )}
                  className="rounded"
                />
                <span className="text-sm">{measure}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          className="bg-recovery-500 hover:bg-recovery-600"
        >
          Continue
        </Button>
      </div>

      <div className="mt-6 p-4 bg-orange-50 rounded-lg">
        <h4 className="font-medium text-orange-900 mb-2">🔥 NoFap Goal Setting Tips</h4>
        <ul className="text-sm text-orange-800 space-y-1">
          <li>• Start with 7 days if you're new to NoFap</li>
          <li>• 90 days is the classic "reboot" goal</li>
          <li>• Focus on building discipline, not just avoiding urges</li>
          <li>• Your goals can evolve as you build stronger self-control</li>
        </ul>
      </div>
    </Card>
  )
}
