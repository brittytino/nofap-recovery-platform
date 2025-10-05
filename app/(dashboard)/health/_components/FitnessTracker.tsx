'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'react-hot-toast'
import { Activity, Clock, Zap, Target } from 'lucide-react'

interface FitnessTrackerProps {
  userId: string
}

export function FitnessTracker({ userId }: FitnessTrackerProps) {
  const [exerciseType, setExerciseType] = useState('')
  const [duration, setDuration] = useState('')
  const [intensity, setIntensity] = useState('')
  const [calories, setCalories] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!exerciseType || !duration) {
      toast.error('Please fill in exercise type and duration')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/health/fitness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseType,
          duration: parseInt(duration),
          intensity,
          calories: calories ? parseInt(calories) : null,
          date: new Date()
        })
      })

      if (response.ok) {
        toast.success('Exercise logged successfully!')
        setExerciseType('')
        setDuration('')
        setIntensity('')
        setCalories('')
      } else {
        toast.error('Failed to log exercise')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fitness Tracker</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="exercise-type">Exercise Type</Label>
            <Select value={exerciseType} onValueChange={setExerciseType}>
              <SelectTrigger>
                <SelectValue placeholder="Select exercise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="walking">Walking</SelectItem>
                <SelectItem value="cycling">Cycling</SelectItem>
                <SelectItem value="weightlifting">Weight Lifting</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
                <SelectItem value="swimming">Swimming</SelectItem>
                <SelectItem value="pushups">Push-ups</SelectItem>
                <SelectItem value="squats">Squats</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input
              id="duration"
              type="number"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
            />
          </div>

          <div>
            <Label htmlFor="intensity">Intensity</Label>
            <Select value={intensity} onValueChange={setIntensity}>
              <SelectTrigger>
                <SelectValue placeholder="Select intensity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="very-high">Very High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="calories">Calories Burned (optional)</Label>
            <Input
              id="calories"
              type="number"
              placeholder="200"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              min="1"
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Logging...' : 'Log Exercise'}
        </Button>
      </form>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <Activity className="h-6 w-6 text-blue-600 mx-auto mb-1" />
          <div className="text-sm font-medium text-blue-900">Today</div>
          <div className="text-xs text-blue-700">45 min</div>
        </div>
        
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
          <div className="text-sm font-medium text-green-900">Goal</div>
          <div className="text-xs text-green-700">60 min</div>
        </div>
        
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <Zap className="h-6 w-6 text-purple-600 mx-auto mb-1" />
          <div className="text-sm font-medium text-purple-900">Calories</div>
          <div className="text-xs text-purple-700">320 kcal</div>
        </div>
      </div>
    </Card>
  )
}
