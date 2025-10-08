'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { AlertCircle, Wind, Heart, Brain, Phone, CheckCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface CrisisModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CrisisModal({ isOpen, onClose }: CrisisModalProps) {
  const [currentView, setCurrentView] = useState<'main' | 'breathing' | 'log'>('main')
  const [urgeData, setUrgeData] = useState({
    intensity: [5],
    triggers: [] as string[],
    context: '',
    copingStrategies: [] as string[]
  })
  const [breathingActive, setBreathingActive] = useState(false)

  const triggerOptions = [
    'Stress/Anxiety',
    'Boredom',
    'Loneliness',
    'Social Media',
    'Work Pressure',
    'Relationship Issues',
    'Sleep Deprivation',
    'Other'
  ]

  const copingStrategies = [
    { id: 'exercise', label: '🏃 Do 20 push-ups or jumping jacks', description: 'Physical activity releases endorphins' },
    { id: 'cold', label: '🚿 Take a cold shower', description: 'Resets your nervous system' },
    { id: 'walk', label: '🚶 Go for a 10-minute walk', description: 'Change your environment' },
    { id: 'call', label: '📞 Call a friend or accountability partner', description: 'Social support is powerful' },
    { id: 'meditation', label: '🧘 Practice mindfulness meditation', description: 'Observe urges without acting' },
    { id: 'breathing', label: '🌬️ Box breathing exercise', description: 'Calm your nervous system' },
    { id: 'journaling', label: '📝 Write in your journal', description: 'Process your emotions' },
    { id: 'music', label: '🎵 Listen to uplifting music', description: 'Shift your mood' }
  ]

  const emergencyContacts = [
    { name: 'SAMHSA National Helpline', number: '1-800-662-4357', description: '24/7 free and confidential treatment referral' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Free 24/7 crisis support via text' },
    { name: 'National Suicide Prevention Lifeline', number: '988', description: 'If you\'re in crisis or having thoughts of self-harm' }
  ]

  const handleBreathingExercise = () => {
    setCurrentView('breathing')
    setBreathingActive(true)
  }

  const handleLogUrge = async (wasSuccessful: boolean) => {
    try {
      const response = await fetch('/api/crisis/urge-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intensity: urgeData.intensity[0],
          triggers: urgeData.triggers,
          context: urgeData.context,
          copingStrategies: urgeData.copingStrategies,
          wasSuccessful
        })
      })

      const result = await response.json()
      
      if (response.ok) {
        toast.success(result.message)
        onClose()
      } else {
        toast.error('Failed to log urge')
      }
    } catch (error) {
      console.error('Urge log error:', error)
      toast.error('An error occurred')
    }
  }

  if (currentView === 'breathing') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center space-x-2 mb-4">
              <Wind className="h-6 w-6 text-blue-500" />
              <DialogTitle>Box Breathing Exercise</DialogTitle>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-6">Follow the breathing pattern:</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <p className="text-gray-700">Breathe in for 4 seconds</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <p className="text-gray-700">Hold for 4 seconds</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <p className="text-gray-700">Breathe out for 4 seconds</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <p className="text-gray-700">Hold for 4 seconds</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="w-32 h-32 border-4 border-blue-500 rounded-lg mx-auto animate-pulse" />
                <p className="text-sm text-gray-600 mt-4">Repeat this cycle 4-5 times</p>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                onClick={() => setCurrentView('main')} 
                variant="outline" 
                className="w-full"
              >
                Back to Strategies
              </Button>
              <Button 
                onClick={() => {
                  toast.success('Great job! You\'re doing amazing.')
                  setCurrentView('log')
                }} 
                className="w-full bg-green-500 hover:bg-green-600"
              >
                I Feel Better Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (currentView === 'log') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Log This Experience</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Label className="mb-2 block">Urge Intensity: {urgeData.intensity[0]}/10</Label>
              <Slider
                value={urgeData.intensity}
                onValueChange={(value) => setUrgeData(prev => ({ ...prev, intensity: value }))}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
            </div>

            <div>
              <Label className="mb-2 block">What triggered this urge?</Label>
              <div className="grid grid-cols-2 gap-2">
                {triggerOptions.map((trigger) => (
                  <label key={trigger} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={urgeData.triggers.includes(trigger)}
                      onChange={(e) => {
                        const newTriggers = e.target.checked
                          ? [...urgeData.triggers, trigger]
                          : urgeData.triggers.filter(t => t !== trigger)
                        setUrgeData(prev => ({ ...prev, triggers: newTriggers }))
                      }}
                      className="rounded"
                    />
                    <span>{trigger}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2 block">What strategies did you use?</Label>
              <div className="space-y-2">
                {copingStrategies.map((strategy) => (
                  <label key={strategy.id} className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={urgeData.copingStrategies.includes(strategy.id)}
                      onChange={(e) => {
                        const newStrategies = e.target.checked
                          ? [...urgeData.copingStrategies, strategy.id]
                          : urgeData.copingStrategies.filter(s => s !== strategy.id)
                        setUrgeData(prev => ({ ...prev, copingStrategies: newStrategies }))
                      }}
                      className="rounded"
                    />
                    <span>{strategy.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="context" className="mb-2 block">Additional notes (optional)</Label>
              <Textarea
                id="context"
                value={urgeData.context}
                onChange={(e) => setUrgeData(prev => ({ ...prev, context: e.target.value }))}
                placeholder="How are you feeling now? What did you learn?"
                rows={3}
              />
            </div>

            <div className="flex space-x-2">
              <Button 
                onClick={() => handleLogUrge(true)} 
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                I Resisted Successfully
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <DialogTitle className="text-2xl">Crisis Support</DialogTitle>
          </div>
          <p className="text-gray-600">You're experiencing an urge. That's normal. Let's work through this together.</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Immediate Actions */}
          <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-3 flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              Quick Actions (Do This Now)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button 
                onClick={handleBreathingExercise}
                className="bg-blue-500 hover:bg-blue-600 w-full justify-start"
              >
                <Wind className="h-4 w-4 mr-2" />
                Start Breathing Exercise
              </Button>
              <Button 
                onClick={() => toast.success('Taking a 5-minute break!')}
                className="bg-green-500 hover:bg-green-600 w-full justify-start"
              >
                <Brain className="h-4 w-4 mr-2" />
                5-Minute Distraction Timer
              </Button>
            </div>
          </div>

          {/* Coping Strategies */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Coping Strategies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {copingStrategies.map((strategy) => (
                <div key={strategy.id} className="p-3 border border-gray-200 rounded-lg hover:border-recovery-500 hover:bg-recovery-50 transition-colors">
                  <div className="font-medium text-gray-900">{strategy.label}</div>
                  <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Emergency Support
            </h3>
            <div className="space-y-2">
              {emergencyContacts.map((contact) => (
                <div key={contact.number} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-900">{contact.name}</div>
                      <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                    </div>
                    <a 
                      href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                      className="text-blue-600 font-semibold hover:underline whitespace-nowrap ml-4"
                    >
                      {contact.number}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-4 border-t">
            <Button 
              onClick={() => setCurrentView('log')} 
              variant="outline"
              className="flex-1"
            >
              Log This Urge
            </Button>
            <Button 
              onClick={onClose} 
              className="flex-1 bg-recovery-500 hover:bg-recovery-600"
            >
              I'm Feeling Better
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p className="font-medium">Remember: Urges are temporary. You've overcome them before, and you can do it again.</p>
            <p className="mt-1">Every time you resist, you become stronger. 💪</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

