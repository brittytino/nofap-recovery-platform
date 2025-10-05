'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, User, Users, HeartHandshake } from 'lucide-react'

interface RelationshipStatusSelectorProps {
  onNext: (data: any) => void
  onPrevious?: () => void
  data: any
}

export function RelationshipStatusSelector({ onNext, onPrevious, data }: RelationshipStatusSelectorProps) {
  const [selectedStatus, setSelectedStatus] = useState(data.relationshipStatus || '')
  const [customMotivation, setCustomMotivation] = useState(data.customMotivation || '')

  const relationshipOptions = [
    {
      value: 'SINGLE',
      label: 'Single',
      icon: User,
      description: 'Focusing on personal growth and self-improvement',
      motivations: [
        'Enjoy your freedom and focus on self-improvement',
        'Build the life you want before sharing it with someone',
        'Use this time to become the best version of yourself',
        'Focus on your passions and discover who you really are'
      ]
    },
    {
      value: 'COMMITTED',
      label: 'In a Relationship',
      icon: Heart,
      description: 'Building a healthy relationship through personal growth',
      motivations: [
        'Be loyal to your partner and build trust together',
        'Show your commitment through your actions',
        'A healthy you contributes to a healthy relationship',
        'Channel your energy into strengthening your bond'
      ]
    },
    {
      value: 'BROKEN_UP',
      label: 'Recently Ended Relationship',
      icon: HeartHandshake,
      description: 'Healing and moving forward after a breakup',
      motivations: [
        'Focus on moving forward and healing',
        'This ending is a new beginning in disguise',
        'Use this time to rebuild yourself stronger',
        'Your future holds better things than your past'
      ]
    },
    {
      value: 'MARRIED',
      label: 'Married',
      icon: Users,
      description: 'Strengthening your marriage through personal commitment',
      motivations: [
        'Honor your marriage through your daily choices',
        'Be the partner you\'d want to be married to',
        'Strong marriages are built on daily commitments',
        'Lead by example in your household'
      ]
    }
  ]

  const selectedOption = relationshipOptions.find(option => option.value === selectedStatus)

  const handleNext = () => {
    if (!selectedStatus) {
      alert('Please select your relationship status')
      return
    }
    
    onNext({
      relationshipStatus: selectedStatus,
      customMotivation
    })
  }

  return (
    <Card className="p-8">
      <div className="text-center mb-8">
        <Heart className="h-12 w-12 text-recovery-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Relationship Status</h2>
        <p className="text-gray-600">
          We'll personalize your daily motivations based on your current relationship situation
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {relationshipOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedStatus(option.value)}
            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
              selectedStatus === option.value
                ? 'border-recovery-500 bg-recovery-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <option.icon className={`h-5 w-5 ${
                selectedStatus === option.value ? 'text-recovery-600' : 'text-gray-400'
              }`} />
              <span className="font-semibold text-gray-900">{option.label}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{option.description}</p>
            
            {selectedStatus === option.value && (
              <div className="mt-3 pt-3 border-t border-recovery-200">
                <p className="text-sm font-medium text-recovery-700 mb-2">
                  Sample daily motivations you'll receive:
                </p>
                <ul className="text-sm text-recovery-600 space-y-1">
                  {option.motivations.slice(0, 2).map((motivation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>{motivation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </button>
        ))}
      </div>

      {selectedOption && (
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any specific motivation or goal related to your {selectedOption.label.toLowerCase()} status? (Optional)
          </label>
          <textarea
            value={customMotivation}
            onChange={(e) => setCustomMotivation(e.target.value)}
            placeholder="e.g., I want to be more present with my partner, or I want to focus on self-love..."
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
          />
        </div>
      )}

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedStatus}
          className="bg-recovery-500 hover:bg-recovery-600"
        >
          Complete Setup
        </Button>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">🎉 Almost Done!</h4>
        <p className="text-sm text-green-800">
          You're about to complete your personalized setup. Your daily motivations 
          will be tailored to support your specific situation and goals.
        </p>
      </div>
    </Card>
  )
}
