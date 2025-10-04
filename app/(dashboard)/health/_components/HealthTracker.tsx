'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { toast } from 'react-hot-toast'
import { Heart, Zap, Bed, Activity } from 'lucide-react'

interface HealthTrackerProps {
  userId: string
}

export function HealthTracker({ userId }: HealthTrackerProps) {
  const [mood, setMood] = useState([5])
  const [energy, setEnergy] = useState([5])
  const [sleep, setSleep] = useState('')
  const [exercise, setExercise] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/health/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moodRating: mood[0],
          energyLevel: energy[0],
          sleepHours: parseFloat(sleep),
          exerciseMinutes: parseInt(exercise),
          date: new Date()
        })
      })

      if (response.ok) {
        toast.success('Health data logged successfully!')
        setSleep('')
        setExercise('')
      } else {
        toast.error('Failed to log health data')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Daily Health Check-in</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="flex items-center space-x-2 mb-3">
            <Heart className="h-4 w-4 text-pink-500" />
            <span>Mood: {mood[0]}/10</span>
          </Label>
          <Slider
            value={mood}
            onValueChange={setMood}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Very Low</span>
            <span>Excellent</span>
          </div>
        </div>

        <div>
          <Label className="flex items-center space-x-2 mb-3">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span>Energy Level: {energy[0]}/10</span>
          </Label>
          <Slider
            value={energy}
            onValueChange={setEnergy}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Exhausted</span>
            <span>Energized</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="flex items-center space-x-2 mb-2">
              <Bed className="h-4 w-4 text-blue-500" />
              <span>Sleep Hours</span>
            </Label>
            <Input
              type="number"
              placeholder="7.5"
              value={sleep}
              onChange={(e) => setSleep(e.target.value)}
              step="0.5"
              min="0"
              max="24"
            />
          </div>
          
          <div>
            <Label className="flex items-center space-x-2 mb-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span>Exercise (minutes)</span>
            </Label>
            <Input
              type="number"
              placeholder="30"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              min="0"
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Logging...' : 'Log Health Data'}
        </Button>
      </form>
    </Card>
  )
}
