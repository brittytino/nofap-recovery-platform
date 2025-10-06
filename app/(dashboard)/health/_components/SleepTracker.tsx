'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Moon, Bed, Clock } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface SleepTrackerProps {
  userId: string
}

export function SleepTracker({ userId }: SleepTrackerProps) {
  const [sleepHours, setSleepHours] = useState('')
  const [bedtime, setBedtime] = useState('')
  const [wakeTime, setWakeTime] = useState('')
  const [quality, setQuality] = useState([5])
  const [factors, setFactors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const sleepFactors = [
    'Caffeine late in day',
    'Screen time before bed',
    'Stress/anxiety',
    'Comfortable environment',
    'Exercise during day',
    'Heavy meal before bed',
    'Alcohol consumption',
    'Meditation/relaxation',
    'Room temperature',
    'Noise disturbances'
  ]

  const handleFactorToggle = (factor: string) => {
    setFactors(prev => 
      prev.includes(factor)
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/health/sleep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sleepHours: parseFloat(sleepHours),
          bedtime,
          wakeTime,
          quality: quality[0],
          factors,
          date: new Date()
        })
      })

      if (response.ok) {
        toast.success('Sleep data logged successfully!')
        setSleepHours('')
        setBedtime('')
        setWakeTime('')
        setFactors([])
        setQuality([5])
      } else {
        toast.error('Failed to log sleep data')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const getQualityColor = (rating: number) => {
    if (rating <= 3) return 'text-red-600'
    if (rating <= 6) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getQualityLabel = (rating: number) => {
    if (rating <= 2) return 'Very Poor'
    if (rating <= 4) return 'Poor'
    if (rating <= 6) return 'Fair'
    if (rating <= 8) return 'Good'
    return 'Excellent'
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Moon className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Sleep Tracker</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="sleep-hours" className="flex items-center space-x-1">
              <Bed className="h-4 w-4" />
              <span>Hours Slept</span>
            </Label>
            <Input
              id="sleep-hours"
              type="number"
              step="0.5"
              min="0"
              max="24"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              placeholder="7.5"
              required
            />
          </div>

          <div>
            <Label htmlFor="bedtime" className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Bedtime</span>
            </Label>
            <Input
              id="bedtime"
              type="time"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="wake-time" className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>Wake Time</span>
            </Label>
            <Input
              id="wake-time"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Label className={`text-base font-medium mb-3 block ${getQualityColor(quality[0])}`}>
            Sleep Quality: {quality[0]}/10 - {getQualityLabel(quality[0])}
          </Label>
          <Slider
            value={quality}
            onValueChange={setQuality}
            max={10}
            min={1}
            step={1}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Very Poor</span>
            <span>Fair</span>
            <span>Excellent</span>
          </div>
        </div>

        <div>
          <Label className="text-base font-medium text-gray-900 mb-3 block">
            What affected your sleep? (Select all that apply)
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sleepFactors.map((factor) => (
              <button
                key={factor}
                type="button"
                onClick={() => handleFactorToggle(factor)}
                className={`p-2 text-sm rounded-lg border transition-colors text-left ${
                  factors.includes(factor)
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {factor}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Logging...' : 'Log Sleep Data'}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">😴 Sleep Optimization Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Aim for 7-9 hours of sleep per night</li>
          <li>• Keep a consistent sleep schedule</li>
          <li>• Avoid screens 1 hour before bedtime</li>
          <li>• Create a relaxing bedtime routine</li>
          <li>• Keep your bedroom cool and dark</li>
        </ul>
      </div>
    </Card>
  )
}
