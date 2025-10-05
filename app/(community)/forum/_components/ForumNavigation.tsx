'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, TrendingUp, Heart, Dumbbell, Users, Brain } from 'lucide-react'

const categories = [
  { id: 'all', name: 'All Posts', icon: MessageCircle, count: 0 },
  { id: 'GENERAL', name: 'General', icon: MessageCircle, count: 0 },
  { id: 'SUCCESS_STORIES', name: 'Success Stories', icon: TrendingUp, count: 0 },
  { id: 'STRUGGLES', name: 'Struggles', icon: Heart, count: 0 },
  { id: 'FITNESS', name: 'Fitness', icon: Dumbbell, count: 0 },
  { id: 'RELATIONSHIPS', name: 'Relationships', icon: Users, count: 0 },
  { id: 'MENTAL_HEALTH', name: 'Mental Health', icon: Brain, count: 0 }
]

interface ForumNavigationProps {
  activeCategory?: string
  onCategoryChange?: (category: string) => void
}

export function ForumNavigation({ activeCategory = 'all', onCategoryChange }: ForumNavigationProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange?.(category.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
              activeCategory === category.id
                ? 'bg-recovery-50 text-recovery-700 border border-recovery-200'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <category.icon className="h-5 w-5" />
              <span className="font-medium">{category.name}</span>
            </div>
            {category.count > 0 && (
              <Badge variant="secondary" className="bg-gray-100">
                {category.count}
              </Badge>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
