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
    'Boredom',
    'Stress/Anxiety',
    'Alone at home',
    'Late night browsing',
    'Saw triggering content',
    'Loneliness',
    'Procrastination',
    'Social media scrolling',
    'Bad mood',
    'Other'
  ]

  const copingStrategies = [
    { id: 'cold_shower', label: '🚿 Take a cold shower NOW', description: 'Instant reset - most effective strategy' },
    { id: 'pushups', label: '💪 Do 20 push-ups immediately', description: 'Channel energy into strength' },
    { id: 'outside', label: '🚶 Go outside for a walk', description: 'Change environment completely' },
    { id: 'call_friend', label: '📞 Call a friend or accountability partner', description: 'Brotherhood support is powerful' },
    { id: 'breathing', label: '🌬️ Box breathing exercise', description: 'Calm your nervous system' },
    { id: 'meditation', label: '🧘 Meditate for 10 minutes', description: 'Observe urges without acting' },
    { id: 'review_goals', label: '🎯 Review your "why" and goals', description: 'Remember what you\'re fighting for' },
    { id: 'distraction', label: '🎮 Engage in healthy distraction', description: 'Watch motivational videos, read' }
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
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg text-center">
              <div className="mb-4">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">Follow the breathing pattern:</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <p className="text-neutral-700 dark:text-neutral-300">Breathe in for 4 seconds</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <p className="text-neutral-700 dark:text-neutral-300">Hold for 4 seconds</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <p className="text-neutral-700 dark:text-neutral-300">Breathe out for 4 seconds</p>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                    <p className="text-neutral-700 dark:text-neutral-300">Hold for 4 seconds</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="w-32 h-32 border-4 border-blue-500 dark:border-blue-400 rounded-lg mx-auto animate-pulse" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">Repeat this cycle 4-5 times</p>
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
            <DialogTitle className="text-2xl">🚨 URGE EMERGENCY</DialogTitle>
          </div>
          <p className="text-gray-600">You're having strong urges right now. That's normal - every warrior faces this battle. Let's fight this together.</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Immediate Actions */}
          <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-3 flex items-center">
              <Heart className="h-5 w-5 mr-2" />
              IMMEDIATE ACTION NEEDED
            </h3>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded border-l-4 border-red-500">
                <p className="text-sm font-medium text-red-700 mb-2">⏰ This urge will pass in 15 minutes. Don't think, just act:</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Button 
                  onClick={() => toast.success('🚿 COLD SHOWER NOW! This is your best weapon!')}
                  className="bg-blue-500 hover:bg-blue-600 w-full justify-start text-left"
                >
                  🚿 COLD SHOWER NOW
                </Button>
                <Button 
                  onClick={() => toast.success('💪 20 push-ups! Channel that energy!')}
                  className="bg-green-500 hover:bg-green-600 w-full justify-start"
                >
                  💪 20 PUSH-UPS NOW
                </Button>
                <Button 
                  onClick={handleBreathingExercise}
                  className="bg-purple-500 hover:bg-purple-600 w-full justify-start"
                >
                  <Wind className="h-4 w-4 mr-2" />
                  Box Breathing (4-4-4-4)
                </Button>
                <Button 
                  onClick={() => toast.success('🚶 Going outside! Change your environment!')}
                  className="bg-orange-500 hover:bg-orange-600 w-full justify-start"
                >
                  🚶 GO OUTSIDE NOW
                </Button>
              </div>
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

          <div className="text-center text-sm text-gray-600 bg-green-50 p-4 rounded-lg">
            <p className="font-bold text-green-800 text-lg mb-2">🔥 WARRIOR REMINDER 🔥</p>
            <p className="font-medium text-green-700">This urge is temporary. Your progress is permanent.</p>
            <p className="mt-1 text-green-600">You've resisted before. You're stronger than your urges.</p>
            <p className="mt-1 text-green-600 font-medium">Walk away from the screen. Walk toward your goals. 💪</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

