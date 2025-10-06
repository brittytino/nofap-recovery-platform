'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'

interface MoodTrackerProps {
  userId: string
}

const moodEmojis = ['😢', '😕', '😐', '😊', '😁']
const moodLabels = ['Very Low', 'Low', 'Neutral', 'Good', 'Excellent']

export function MoodTracker({ userId }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedMood === null) {
      toast.error('Please select your mood')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/health/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moodRating: selectedMood,
          notes,
          date: new Date()
        })
      })

      if (response.ok) {
        toast.success('Mood logged successfully!')
        setNotes('')
        // Keep selected mood for easy re-entry
      } else {
        toast.error('Failed to log mood')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood Tracker</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="text-base font-medium text-gray-900 mb-3 block">
            How are you feeling right now?
          </Label>
          <div className="grid grid-cols-5 gap-3">
            {moodEmojis.map((emoji, index) => {
              const moodValue = index + 1
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedMood(moodValue)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedMood === moodValue
                      ? 'border-recovery-500 bg-recovery-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{emoji}</div>
                  <div className="text-xs text-gray-600 font-medium">
                    {moodLabels[index]}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <Label htmlFor="mood-notes">Notes (optional)</Label>
          <Textarea
            id="mood-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What's contributing to your mood today? Any thoughts or observations..."
            rows={3}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Logging...' : 'Log Mood'}
        </Button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Mood Tracking Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Track your mood consistently for better insights</li>
          <li>• Notice patterns between activities and mood</li>
          <li>• Be honest about how you're feeling</li>
          <li>• Remember that all feelings are valid</li>
        </ul>
      </div>
    </Card>
  )
}
