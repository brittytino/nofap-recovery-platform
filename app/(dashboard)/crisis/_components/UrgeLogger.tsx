'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { AlertTriangle, Clock, MapPin } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface UrgeLoggerProps {
  userId: string
}

export function UrgeLogger({ userId }: UrgeLoggerProps) {
  const [intensity, setIntensity] = useState([5])
  const [trigger, setTrigger] = useState('')
  const [location, setLocation] = useState('')
  const [emotion, setEmotion] = useState('')
  const [isLogging, setIsLogging] = useState(false)

  const handleLogUrge = async () => {
    setIsLogging(true)

    try {
      const response = await fetch('/api/crisis/urge-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intensity: intensity[0],
          trigger,
          location,
          emotion,
          timestamp: new Date()
        })
      })

      if (response.ok) {
        toast.success('Urge logged. You\'re taking the right steps!')
        setTrigger('')
        setLocation('')
        setEmotion('')
        setIntensity([5])
        
        // Redirect to coping strategies
        setTimeout(() => {
          const strategiesSection = document.getElementById('coping-strategies')
          if (strategiesSection) {
            strategiesSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 1000)
      } else {
        toast.error('Failed to log urge')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLogging(false)
    }
  }

  const getIntensityColor = (value: number) => {
    if (value <= 3) return 'text-green-600'
    if (value <= 6) return 'text-yellow-600'
    if (value <= 8) return 'text-orange-600'
    return 'text-red-600'
  }

  const getIntensityMessage = (value: number) => {
    if (value <= 3) return 'Manageable - you\'ve got this!'
    if (value <= 6) return 'Moderate - use your coping strategies'
    if (value <= 8) return 'Strong - reach out for support'
    return 'Very intense - immediate action needed'
  }

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-orange-500" />
        <h2 className="text-xl font-semibold text-gray-900">Urge Logger</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Tracking urges helps identify patterns and triggers. This information stays private and helps your recovery.
      </p>

      <div className="space-y-6">
        <div>
          <Label className="text-base font-medium text-gray-900 mb-3 block">
            Urge Intensity: <span className={`font-bold ${getIntensityColor(intensity[0])}`}>
              {intensity[0]}/10
            </span>
          </Label>
          <Slider
            value={intensity}
            onValueChange={setIntensity}
            max={10}
            min={1}
            step={1}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Mild</span>
            <span>Moderate</span>
            <span>Severe</span>
          </div>
          <p className={`text-sm font-medium ${getIntensityColor(intensity[0])}`}>
            {getIntensityMessage(intensity[0])}
          </p>
        </div>

        <div>
          <Label htmlFor="trigger">What triggered this urge?</Label>
          <Textarea
            id="trigger"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            placeholder="e.g., stress, boredom, seeing certain content, being alone..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="location" className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>Where are you?</span>
            </Label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select location</option>
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="school">School</option>
              <option value="public">Public place</option>
              <option value="transport">Transportation</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <Label htmlFor="emotion">Primary emotion?</Label>
            <select
              id="emotion"
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select emotion</option>
              <option value="stressed">Stressed</option>
              <option value="bored">Bored</option>
              <option value="lonely">Lonely</option>
              <option value="anxious">Anxious</option>
              <option value="angry">Angry</option>
              <option value="sad">Sad</option>
              <option value="excited">Excited</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <Button 
          onClick={handleLogUrge}
          disabled={isLogging}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          {isLogging ? 'Logging...' : 'Log Urge & Get Help'}
        </Button>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start space-x-2">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Remember:</h4>
              <p className="text-sm text-blue-800 mt-1">
                Urges are temporary. They peak and then fade away. You have the strength to get through this moment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
