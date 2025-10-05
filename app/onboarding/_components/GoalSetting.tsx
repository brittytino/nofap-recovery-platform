'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Target, Calendar, Trophy } from 'lucide-react'

interface GoalSettingProps {
  onNext: (data: any) => void
  onPrevious?: () => void
  data: any
}

export function GoalSetting({ onNext, onPrevious, data }: GoalSettingProps) {
  const [goals, setGoals] = useState({
    primaryGoal: data.primaryGoal || '',
    streakGoal: data.streakGoal || '',
    healthGoals: data.healthGoals || [],
    personalGoals: data.personalGoals || '',
    timeline: data.timeline || '',
    successMeasures: data.successMeasures || []
  })

  const healthGoalOptions = [
    'Improve sleep quality',
    'Increase energy levels',
    'Better mood stability',
    'Enhanced focus',
    'Reduced anxiety',
    'Improved confidence',
    'Better relationships',
    'Increased motivation',
    'Physical fitness',
    'Mental clarity'
  ]

  const timelineOptions = [
    { value: '30', label: '30 days (Foundation building)' },
    { value: '90', label: '90 days (Habit formation)' },
    { value: '180', label: '6 months (Life transformation)' },
    { value: '365', label: '1 year (Complete lifestyle change)' },
    { value: 'ongoing', label: 'Ongoing journey' }
  ]

  const successMeasureOptions = [
    'Increased productivity',
    'Better sleep patterns',
    'Improved relationships',
    'Enhanced self-control',
    'Greater life satisfaction',
    'Reduced shame/guilt',
    'Increased confidence',
    'Better physical health',
    'Mental clarity',
    'Spiritual growth'
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
        <Target className="h-12 w-12 text-recovery-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Your Recovery Goals</h2>
        <p className="text-gray-600">
          Clear goals help maintain focus and motivation throughout your journey
        </p>
      </div>

      <div className="space-y-8">
        {/* Primary Goal */}
        <div>
          <Label htmlFor="primaryGoal" className="text-base font-semibold text-gray-900 mb-3 block">
            What's your primary recovery goal?
          </Label>
          <Textarea
            id="primaryGoal"
            value={goals.primaryGoal}
            onChange={(e) => setGoals(prev => ({ ...prev, primaryGoal: e.target.value }))}
            placeholder="e.g., I want to break free from compulsive behaviors and live a more fulfilling life..."
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

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Goal Setting Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Start with small, achievable goals</li>
          <li>• Be specific about what you want to accomplish</li>
          <li>• Focus on positive outcomes, not just avoiding negatives</li>
          <li>• Your goals can evolve as you progress</li>
        </ul>
      </div>
    </Card>
  )
}
