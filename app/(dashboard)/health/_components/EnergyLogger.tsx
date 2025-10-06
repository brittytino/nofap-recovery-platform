'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Zap, Coffee, Moon, Sun } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface EnergyLoggerProps {
  userId: string
}

export function EnergyLogger({ userId }: EnergyLoggerProps) {
  const [energyLevel, setEnergyLevel] = useState([5])
  const [timeOfDay, setTimeOfDay] = useState('')
  const [factors, setFactors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const energyFactors = [
    'Good sleep',
    'Exercise',
    'Healthy meal',
    'Caffeine',
    'Stress',
    'Work pressure',
    'Social interaction',
    'Weather',
    'Medication',
    'Meditation'
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
      const response = await fetch('/api/health/energy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          energyLevel: energyLevel[0],
          timeOfDay,
          factors,
          date: new Date()
        })
      })

      if (response.ok) {
        toast.success('Energy level logged!')
        setFactors([])
        setTimeOfDay('')
      } else {
        toast.error('Failed to log energy level')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const getEnergyIcon = (level: number) => {
    if (level <= 3) return <Moon className="h-5 w-5 text-gray-500" />
    if (level <= 6) return <Coffee className="h-5 w-5 text-yellow-500" />
    return <Sun className="h-5 w-5 text-orange-500" />
  }

  const getEnergyColor = (level: number) => {
    if (level <= 3) return 'text-gray-600'
    if (level <= 6) return 'text-yellow-600'
    return 'text-orange-600'
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="h-5 w-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">Energy Logger</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            {getEnergyIcon(energyLevel[0])}
            <Label className={`text-base font-medium ${getEnergyColor(energyLevel[0])}`}>
              Energy Level: {energyLevel[0]}/10
            </Label>
          </div>
          <Slider
            value={energyLevel}
            onValueChange={setEnergyLevel}
            max={10}
            min={1}
            step={1}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Exhausted</span>
            <span>Moderate</span>
            <span>Energized</span>
          </div>
        </div>

        <div>
          <Label htmlFor="time-of-day">Time of Day</Label>
          <Select value={timeOfDay} onValueChange={setTimeOfDay}>
            <SelectTrigger>
              <SelectValue placeholder="When are you logging this?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (6 AM - 12 PM)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
              <SelectItem value="evening">Evening (6 PM - 10 PM)</SelectItem>
              <SelectItem value="night">Night (10 PM - 6 AM)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-base font-medium text-gray-900 mb-3 block">
            What's affecting your energy? (Select all that apply)
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {energyFactors.map((factor) => (
              <button
                key={factor}
                type="button"
                onClick={() => handleFactorToggle(factor)}
                className={`p-2 text-sm rounded-lg border transition-colors ${
                  factors.includes(factor)
                    ? 'border-recovery-500 bg-recovery-50 text-recovery-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                {factor}
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Logging...' : 'Log Energy Level'}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-medium text-yellow-900 mb-2">⚡ Energy Tips</h4>
        <ul className="text-sm text-yellow-800 space-y-1">
          <li>• Track patterns between activities and energy</li>
          <li>• Notice how sleep quality affects your energy</li>
          <li>• Pay attention to energy crashes and their triggers</li>
          <li>• Use this data to optimize your daily routine</li>
        </ul>
      </div>
    </Card>
  )
}
