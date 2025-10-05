'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Camera, Edit, Calendar, Trophy } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ProfileHeaderProps {
  userId: string
}

interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
  relationshipStatus: string
  createdAt: Date
  currentStreak: number
  longestStreak: number
  level: number
}

export function ProfileHeader({ userId }: ProfileHeaderProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [userId])

  const fetchProfile = async () => {
    try {
      const response = await fetch(`/api/user/profile?userId=${userId}`)
      const data = await response.json()
      setProfile(data)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      toast.error('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/user/profile/image', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(prev => prev ? { ...prev, image: data.imageUrl } : null)
        toast.success('Profile image updated!')
      } else {
        toast.error('Failed to update image')
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const getRelationshipStatusColor = (status: string) => {
    const colors = {
      'SINGLE': 'bg-blue-100 text-blue-800',
      'COMMITTED': 'bg-green-100 text-green-800',
      'BROKEN_UP': 'bg-red-100 text-red-800',
      'MARRIED': 'bg-purple-100 text-purple-800'
    }
    return colors[status as keyof typeof colors] || colors.SINGLE
  }

  const formatRelationshipStatus = (status: string) => {
    return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (!profile) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.image} alt={profile.name} />
              <AvatarFallback className="text-xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <label className="absolute bottom-0 right-0 bg-recovery-500 text-white p-2 rounded-full cursor-pointer hover:bg-recovery-600 transition-colors">
              <Camera className="h-3 w-3" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h1>
            <p className="text-gray-600 mb-2">{profile.email}</p>
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getRelationshipStatusColor(profile.relationshipStatus)}>
                {formatRelationshipStatus(profile.relationshipStatus)}
              </Badge>
              <Badge variant="outline" className="flex items-center space-x-1">
                <Trophy className="h-3 w-3" />
                <span>Level {profile.level}</span>
              </Badge>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Joined {new Date(profile.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        
        <Button variant="outline" onClick={() => setIsEditing(true)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>
      
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-recovery-50 rounded-lg">
          <div className="text-2xl font-bold text-recovery-600">{profile.currentStreak}</div>
          <div className="text-sm text-recovery-700">Current Streak</div>
        </div>
        
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{profile.longestStreak}</div>
          <div className="text-sm text-yellow-700">Best Streak</div>
        </div>
        
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{profile.level}</div>
          <div className="text-sm text-blue-700">Current Level</div>
        </div>
        
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {Math.floor((Date.now() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
          </div>
          <div className="text-sm text-purple-700">Days on Platform</div>
        </div>
      </div>
    </Card>
  )
}
