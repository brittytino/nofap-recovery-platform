'use client'

import { Trophy, Star, Award, Target } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface Badge {
  id: string
  name: string
  description: string
  icon?: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: Date
}

interface BadgeDisplayProps {
  badges: Badge[]
  showLocked?: boolean
}

export function BadgeDisplay({ badges, showLocked = false }: BadgeDisplayProps) {
  const getRarityColor = (rarity: Badge['rarity']) => {
    const colors = {
      common: 'bg-gray-100 text-gray-700 border-gray-300',
      rare: 'bg-blue-100 text-blue-700 border-blue-300',
      epic: 'bg-purple-100 text-purple-700 border-purple-300',
      legendary: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    }
    return colors[rarity]
  }

  const getRarityIcon = (rarity: Badge['rarity']) => {
    const icons = {
      common: Star,
      rare: Trophy,
      epic: Award,
      legendary: Target,
    }
    return icons[rarity]
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {badges.map((badge) => {
        const Icon = getRarityIcon(badge.rarity)
        const isUnlocked = !!badge.unlockedAt

        return (
          <Card
            key={badge.id}
            className={`p-4 text-center transition-all hover:scale-105 ${
              isUnlocked
                ? getRarityColor(badge.rarity)
                : 'bg-gray-50 text-gray-400 border-gray-200 opacity-50'
            }`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isUnlocked ? 'bg-white/50' : 'bg-gray-200'
                }`}
              >
                <Icon size={32} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{badge.name}</h3>
                <p className="text-xs mt-1">{badge.description}</p>
                {isUnlocked && badge.unlockedAt && (
                  <p className="text-xs mt-2 opacity-75">
                    {new Date(badge.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

