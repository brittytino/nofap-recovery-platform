'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'

interface InitialAssessmentProps {
  onNext: (data: any) => void
  onPrevious?: () => void
  data: any
}

export function InitialAssessment({ onNext, onPrevious, data }: InitialAssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState({
    previousAttempts: data.previousAttempts || '',
    longestStreak: data.longestStreak || [0],
    mainTriggers: data.mainTriggers || [],
    supportSystem: data.supportSystem || [5],
    motivation: data.motivation || '',
    currentChallenges: data.currentChallenges || []
  })

  const questions = [
    {
      title: 'Previous Recovery Attempts',
      subtitle: 'Tell us about your past experiences (optional)',
      component: (
        <div className="space-y-4">
          <Label htmlFor="attempts">Have you tried recovery before?</Label>
          <Textarea
            id="attempts"
            value={responses.previousAttempts}
            onChange={(e) => setResponses(prev => ({ ...prev, previousAttempts: e.target.value }))}
            placeholder="Share about previous attempts, what worked, what didn't..."
            rows={4}
          />
        </div>
      )
    },
    {
      title: 'Longest Streak',
      subtitle: 'What\'s the longest you\'ve gone before?',
      component: (
        <div className="space-y-4">
          <Label>Longest streak: {responses.longestStreak[0]} days</Label>
          <Slider
            value={responses.longestStreak}
            onValueChange={(value) => setResponses(prev => ({ ...prev, longestStreak: value }))}
            max={365}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>0 days</span>
            <span>1 year</span>
          </div>
        </div>
      )
    },
    {
      title: 'Main Triggers',
      subtitle: 'What situations or feelings tend to be challenging?',
      component: (
        <div className="space-y-3">
          {[
            'Stress/Anxiety',
            'Boredom',
            'Loneliness',
            'Social Media',
            'Relationship Issues',
            'Work Pressure',
            'Sleep Issues',
            'Other'
          ].map((trigger) => (
            <label key={trigger} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={responses.mainTriggers.includes(trigger)}
                onChange={(e) => {
                  const newTriggers = e.target.checked
                    ? [...responses.mainTriggers, trigger]
                    : responses.mainTriggers.filter(t => t !== trigger)
                  setResponses(prev => ({ ...prev, mainTriggers: newTriggers }))
                }}
                className="rounded"
              />
              <span>{trigger}</span>
            </label>
          ))}
        </div>
      )
    },
    {
      title: 'Support System',
      subtitle: 'How would you rate your current support system?',
      component: (
        <div className="space-y-4">
          <Label>Support Level: {responses.supportSystem[0]}/10</Label>
          <Slider
            value={responses.supportSystem}
            onValueChange={(value) => setResponses(prev => ({ ...prev, supportSystem: value }))}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>No support</span>
            <span>Strong support</span>
          </div>
        </div>
      )
    },
    {
      title: 'Motivation',
      subtitle: 'What motivates you to pursue recovery?',
      component: (
        <div className="space-y-4">
          <Label htmlFor="motivation">Your main motivation</Label>
          <Textarea
            id="motivation"
            value={responses.motivation}
            onChange={(e) => setResponses(prev => ({ ...prev, motivation: e.target.value }))}
            placeholder="What drives you to make this change? What do you hope to achieve?"
            rows={4}
          />
        </div>
      )
    }
  ]

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onNext(responses)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else if (onPrevious) {
      onPrevious()
    }
  }

  const currentQuestion = questions[currentStep]

  return (
    <Card className="p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {currentStep + 1} of {questions.length}
          </span>
          <span className="text-sm text-recovery-600">
            {Math.round(((currentStep + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-recovery-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {currentQuestion.title}
        </h2>
        <p className="text-gray-600">{currentQuestion.subtitle}</p>
      </div>

      <div className="mb-8">
        {currentQuestion.component}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          className="bg-recovery-500 hover:bg-recovery-600"
        >
          {currentStep < questions.length - 1 ? 'Next' : 'Continue'}
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          All information is private and encrypted. You can skip any question you're not comfortable answering.
        </p>
      </div>
    </Card>
  )
}
