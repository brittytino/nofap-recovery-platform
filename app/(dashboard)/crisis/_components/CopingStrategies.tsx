'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Brain, 
  Heart, 
  Activity, 
  Users, 
  Book, 
  Music,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

const strategies = [
  {
    category: 'Mindfulness',
    icon: Brain,
    color: 'text-purple-600 bg-purple-50',
    strategies: [
      'Practice the 5-4-3-2-1 grounding technique',
      'Focus on your breathing for 2 minutes',
      'Observe your thoughts without judgment',
      'Use progressive muscle relaxation'
    ]
  },
  {
    category: 'Physical',
    icon: Activity,
    color: 'text-green-600 bg-green-50',
    strategies: [
      'Take a cold shower',
      'Do 20 push-ups or jumping jacks',
      'Go for a walk or run',
      'Practice yoga or stretching'
    ]
  },
  {
    category: 'Emotional',
    icon: Heart,
    color: 'text-red-600 bg-red-50',
    strategies: [
      'Write in your journal about your feelings',
      'Call a trusted friend or family member (in person, not text)',
      'Practice self-compassion and forgiveness',
      'Remember your "why" for digital wellness'
    ]
  },
  {
    category: 'Social',
    icon: Users,
    color: 'text-blue-600 bg-blue-50',
    strategies: [
      'Reach out to your accountability partner',
      'Join a community discussion',
      'Help someone else in the community',
      'Attend a support group meeting'
    ]
  },
  {
    category: 'Creative',
    icon: Music,
    color: 'text-yellow-600 bg-yellow-50',
    strategies: [
      'Listen to your favorite uplifting music',
      'Draw, paint, or create art',
      'Write poetry or creative writing',
      'Play a musical instrument'
    ]
  },
  {
    category: 'Learning',
    icon: Book,
    color: 'text-indigo-600 bg-indigo-50',
    strategies: [
      'Read an inspiring book or article',
      'Watch an educational video',
      'Practice a new skill or hobby',
      'Study something you\'re passionate about'
    ]
  }
]

export function CopingStrategies() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category)
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Coping Strategies</h2>
      <p className="text-gray-600 mb-6">
        When the urge to scroll, game, or binge hits, try one of these strategies
      </p>

      <div className="space-y-3">
        {strategies.map((strategy, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => toggleCategory(strategy.category)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg ${strategy.color} flex items-center justify-center`}>
                  <strategy.icon className="h-5 w-5" />
                </div>
                <span className="font-medium text-gray-900">{strategy.category}</span>
              </div>
              {expandedCategory === strategy.category ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </Button>
            
            {expandedCategory === strategy.category && (
              <div className="px-4 pb-4">
                <ul className="space-y-2">
                  {strategy.strategies.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-recovery-50 rounded-lg">
        <p className="text-sm text-recovery-700 font-medium">
          💡 Pro tip: Try combining strategies from different categories for maximum effectiveness
        </p>
      </div>
    </Card>
  )
}
