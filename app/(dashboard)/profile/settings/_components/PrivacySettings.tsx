'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Shield, Eye, Users, BarChart } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface PrivacySettingsProps {
  userId: string
}

interface PrivacySettings {
  isPublicProfile: boolean
  showStreakOnProfile: boolean
  allowDataAnalytics: boolean
  showInLeaderboard: boolean
  allowCommunityMessages: boolean
}

export function PrivacySettings({ userId }: PrivacySettingsProps) {
  const [settings, setSettings] = useState<PrivacySettings>({
    isPublicProfile: false,
    showStreakOnProfile: true,
    allowDataAnalytics: true,
    showInLeaderboard: true,
    allowCommunityMessages: false
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [userId])

  const fetchSettings = async () => {
    try {
      const response = await fetch(`/api/user/settings/privacy?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Failed to fetch privacy settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSetting = (key: keyof PrivacySettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/user/settings/privacy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        toast.success('Privacy settings updated!')
      } else {
        toast.error('Failed to update settings')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  const privacyOptions = [
    {
      key: 'isPublicProfile' as keyof PrivacySettings,
      label: 'Public Profile',
      description: 'Allow other users to view your basic profile information',
      icon: Eye,
      warning: false
    },
    {
      key: 'showStreakOnProfile' as keyof PrivacySettings,
      label: 'Show Streak on Profile',
      description: 'Display your current streak on your profile page',
      icon: BarChart,
      warning: false
    },
    {
      key: 'showInLeaderboard' as keyof PrivacySettings,
      label: 'Participate in Leaderboard',
      description: 'Allow your progress to appear in community rankings (anonymized)',
      icon: Users,
      warning: false
    },
    {
      key: 'allowDataAnalytics' as keyof PrivacySettings,
      label: 'Anonymous Usage Analytics',
      description: 'Help improve the platform by sharing anonymous usage data',
      icon: BarChart,
      warning: false
    },
    {
      key: 'allowCommunityMessages' as keyof PrivacySettings,
      label: 'Community Direct Messages',
      description: 'Allow other community members to send you direct messages',
      icon: Users,
      warning: true
    }
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Shield className="h-5 w-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Privacy Settings</h3>
      </div>

      <div className="space-y-6">
        {privacyOptions.map((option, index) => (
          <div key={index} className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <option.icon className="h-4 w-4 text-gray-400" />
                <Label htmlFor={option.key} className="font-medium">
                  {option.label}
                </Label>
                {option.warning && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    Not Recommended
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 ml-6">
                {option.description}
              </p>
            </div>
            <Switch
              id={option.key}
              checked={settings[option.key]}
              onCheckedChange={(value) => updateSetting(option.key, value)}
              className="ml-4"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full sm:w-auto"
        >
          {isSaving ? 'Saving...' : 'Save Privacy Settings'}
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">🔒 Your Privacy is Protected</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All forum posts are anonymous by default</li>
            <li>• Personal data is never shared with third parties</li>
            <li>• Leaderboards use anonymous usernames only</li>
            <li>• You can delete your account and data anytime</li>
          </ul>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-medium text-yellow-900 mb-2">⚠️ Direct Messages</h4>
          <p className="text-sm text-yellow-800">
            We recommend keeping direct messages disabled to maintain healthy boundaries 
            and prevent potential triggers or harassment.
          </p>
        </div>
      </div>
    </Card>
  )
}
