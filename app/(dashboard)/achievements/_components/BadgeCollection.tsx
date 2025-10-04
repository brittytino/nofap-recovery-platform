'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Trophy, Lock, Star } from 'lucide-react'

interface Achievement {
  id: string
  name: string
  description: string
  badgeImage: string
  category: string
  tier: string
  requirement: number
  isUnlocked: boolean
  progress: number
  unlockedAt?: Date
}

interface BadgeCollectionProps {
  userId: string
}

export function BadgeCollection({ userId }: BadgeCollectionProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAchievements()
  }, [userId])

  const fetchAchievements = async () => {
    try {
      const response = await fetch(`/api/achievements/list?userId=${userId}`)
      const data = await response.json()
      setAchievements(data.achievements)
    } catch (error) {
      console.error('Failed to fetch achievements:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAchievements = achievements.filter(achievement => {
    const statusMatch = filter === 'all' || 
      (filter === 'unlocked' && achievement.isUnlocked) ||
      (filter === 'locked' && !achievement.isUnlocked)
    
    const categoryMatch = categoryFilter === 'all' || achievement.category === categoryFilter
    
    return statusMatch && categoryMatch
  })

  const getTierColor = (tier: string) => {
    const colors = {
      'BRONZE': 'bg-amber-100 text-amber-800',
      'SILVER': 'bg-gray-100 text-gray-800', 
      'GOLD': 'bg-yellow-100 text-yellow-800',
      'DIAMOND': 'bg-blue-100 text-blue-800',
      'LEGENDARY': 'bg-purple-100 text-purple-800'
    }
    return colors[tier as keyof typeof colors] || colors.BRONZE
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'STREAK': return '🎯'
      case 'HEALTH': return '💪'
      case 'SOCIAL': return '🤝'
      case 'MILESTONE': return '🏆'
      default: return '⭐'
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </Card>
    )
  }

  const categories = ['all', ...Array.from(new Set(achievements.map(a => a.category)))]
  const unlockedCount = achievements.filter(a => a.isUnlocked).length

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Badge Collection</h2>
          <p className="text-gray-600">
            {unlockedCount} of {achievements.length} badges earned
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-recovery-600">{unlockedCount}</div>
          <div className="text-xs text-gray-500">Badges</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="flex space-x-2">
          {(['all', 'unlocked', 'locked'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded-full font-medium ${
                filter === f 
                  ? 'bg-recovery-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex space-x-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 text-xs rounded-full font-medium ${
                categoryFilter === cat 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat === 'all' ? 'All' : cat.charAt(0) + cat.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map(achievement => (
          <div
            key={achievement.id}
            className={`p-4 border rounded-lg transition-all duration-200 ${
              achievement.isUnlocked
                ? 'bg-white border-recovery-200 shadow-sm hover:shadow-md'
                : 'bg-gray-50 border-gray-200 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="text-2xl">
                  {achievement.isUnlocked ? getCategoryIcon(achievement.category) : '🔒'}
                </div>
                <Badge className={getTierColor(achievement.tier)} variant="secondary">
                  {achievement.tier}
                </Badge>
              </div>
              {achievement.isUnlocked && (
                <Trophy className="h-5 w-5 text-yellow-500" />
              )}
            </div>

            <h3 className={`font-semibold mb-1 ${
              achievement.isUnlocked ? 'text-gray-900' : 'text-gray-600'
            }`}>
              {achievement.name}
            </h3>
            
            <p className={`text-sm mb-3 ${
              achievement.isUnlocked ? 'text-gray-600' : 'text-gray-500'
            }`}>
              {achievement.description}
            </p>

            {!achievement.isUnlocked && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{achievement.progress}/{achievement.requirement}</span>
                </div>
                <Progress 
                  value={(achievement.progress / achievement.requirement) * 100}
                  className="h-2"
                />
              </div>
            )}

            {achievement.isUnlocked && achievement.unlockedAt && (
              <div className="text-xs text-gray-500">
                Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAchievements.length === 0 && (
        <div className="text-center py-12">
          <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No achievements found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more badges.</p>
        </div>
      )}
    </Card>
  )
}
