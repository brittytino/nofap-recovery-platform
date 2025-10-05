'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Bell, Smartphone, Mail, MessageCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface NotificationSettingsProps {
  userId: string
}

interface Settings {
  pushNotifications: boolean
  emailNotifications: boolean
  dailyReminders: boolean
  streakMilestones: boolean
  communityUpdates: boolean
  weeklyDigest: boolean
  achievementAlerts: boolean
  crisisSupport: boolean
}

export function NotificationSettings({ userId }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<Settings>({
    pushNotifications: true,
    emailNotifications: true,
    dailyReminders: true,
    streakMilestones: true,
    communityUpdates: false,
    weeklyDigest: true,
    achievementAlerts: true,
    crisisSupport: true
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [userId])

  const fetchSettings = async () => {
    try {
      const response = await fetch(`/api/user/settings/notifications?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error('Failed to fetch notification settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSetting = (key: keyof Settings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/user/settings/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        toast.success('Notification settings updated!')
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
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="h-6 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  const notificationGroups = [
    {
      title: 'Push Notifications',
      icon: Smartphone,
      settings: [
        { key: 'pushNotifications' as keyof Settings, label: 'Enable push notifications', description: 'Receive notifications on your device' },
        { key: 'dailyReminders' as keyof Settings, label: 'Daily check-in reminders', description: 'Gentle reminders to log your mood and progress' },
        { key: 'achievementAlerts' as keyof Settings, label: 'Achievement notifications', description: 'Get notified when you unlock new badges' },
      ]
    },
    {
      title: 'Email Notifications',
      icon: Mail,
      settings: [
        { key: 'emailNotifications' as keyof Settings, label: 'Enable email notifications', description: 'Receive important updates via email' },
        { key: 'weeklyDigest' as keyof Settings, label: 'Weekly progress digest', description: 'Summary of your week\'s progress and insights' },
        { key: 'communityUpdates' as keyof Settings, label: 'Community highlights', description: 'Featured posts and community news' },
      ]
    },
    {
      title: 'Recovery Support',
      icon: Bell,
      settings: [
        { key: 'streakMilestones' as keyof Settings, label: 'Streak milestones', description: 'Celebrate your progress milestones' },
        { key: 'crisisSupport' as keyof Settings, label: 'Crisis support alerts', description: 'Important: Emergency support notifications (always recommended)' },
      ]
    }
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Bell className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
      </div>

      <div className="space-y-6">
        {notificationGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h4 className="flex items-center space-x-2 font-medium text-gray-900 mb-4">
              <group.icon className="h-4 w-4" />
              <span>{group.title}</span>
            </h4>
            
            <div className="space-y-4 ml-6">
              {group.settings.map((setting, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div className="flex-1">
                    <Label htmlFor={setting.key} className="font-medium">
                      {setting.label}
                    </Label>
                    <p className="text-sm text-gray-600 mt-1">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    id={setting.key}
                    checked={settings[setting.key]}
                    onCheckedChange={(value) => updateSetting(setting.key, value)}
                    className="ml-4"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t">
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full sm:w-auto"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Crisis support notifications are highly recommended and will help 
          ensure you receive immediate assistance when needed.
        </p>
      </div>
    </Card>
  )
}
