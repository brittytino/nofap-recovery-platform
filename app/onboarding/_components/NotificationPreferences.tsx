'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import { Bell, Sun, Moon, AlertCircle, Trophy } from 'lucide-react'

interface NotificationPreferencesProps {
  onNext: (data: any) => void
  onPrevious?: () => void
  data: any
}

export function NotificationPreferences({ onNext, onPrevious, data }: NotificationPreferencesProps) {
  const [preferences, setPreferences] = useState({
    notificationEnabled: data.notificationEnabled ?? true,
    morningMotivation: data.morningMotivation ?? true,
    morningTime: data.morningTime || '08:00',
    midDayReminder: data.midDayReminder ?? true,
    midDayTime: data.midDayTime || '14:00',
    eveningReflection: data.eveningReflection ?? true,
    eveningTime: data.eveningTime || '20:00',
    urgeAlerts: data.urgeAlerts ?? true,
    milestoneAlerts: data.milestoneAlerts ?? true,
  })

  const handleNext = () => {
    onNext(preferences)
  }

  const NotificationToggle = ({
    icon: Icon,
    title,
    description,
    enabled,
    onToggle,
    time,
    onTimeChange,
    showTime = false,
  }: any) => (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start space-x-3 flex-1">
          <Icon className="h-5 w-5 text-recovery-500 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600 mt-0.5">{description}</p>
            {showTime && enabled && (
              <div className="mt-3">
                <Label htmlFor={`time-${title}`} className="text-xs text-gray-500">
                  Time
                </Label>
                <Input
                  id={`time-${title}`}
                  type="time"
                  value={time}
                  onChange={onTimeChange}
                  className="w-32 mt-1"
                />
              </div>
            )}
          </div>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={onToggle}
        />
      </div>
    </div>
  )

  return (
    <Card className="p-8">
      <div className="text-center mb-8">
        <Bell className="h-12 w-12 text-recovery-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Notification Preferences</h2>
        <p className="text-gray-600">
          Stay motivated with personalized reminders throughout your day
        </p>
      </div>

      {/* Master toggle */}
      <div className="mb-6 p-4 bg-recovery-50 border-2 border-recovery-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Enable Notifications</h3>
            <p className="text-sm text-gray-600">Turn all notifications on or off</p>
          </div>
          <Switch
            checked={preferences.notificationEnabled}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({ ...prev, notificationEnabled: checked }))
            }
          />
        </div>
      </div>

      {preferences.notificationEnabled && (
        <div className="space-y-4">
          <NotificationToggle
            icon={Sun}
            title="Morning Motivation"
            description="Start your day with inspiring messages and daily challenges"
            enabled={preferences.morningMotivation}
            onToggle={(checked: boolean) =>
              setPreferences((prev) => ({ ...prev, morningMotivation: checked }))
            }
            time={preferences.morningTime}
            onTimeChange={(e: any) =>
              setPreferences((prev) => ({ ...prev, morningTime: e.target.value }))
            }
            showTime={true}
          />

          <NotificationToggle
            icon={AlertCircle}
            title="Mid-Day Check-In"
            description="Gentle reminders to log your progress and stay on track"
            enabled={preferences.midDayReminder}
            onToggle={(checked: boolean) =>
              setPreferences((prev) => ({ ...prev, midDayReminder: checked }))
            }
            time={preferences.midDayTime}
            onTimeChange={(e: any) =>
              setPreferences((prev) => ({ ...prev, midDayTime: e.target.value }))
            }
            showTime={true}
          />

          <NotificationToggle
            icon={Moon}
            title="Evening Reflection"
            description="End your day by reflecting on your progress and wins"
            enabled={preferences.eveningReflection}
            onToggle={(checked: boolean) =>
              setPreferences((prev) => ({ ...prev, eveningReflection: checked }))
            }
            time={preferences.eveningTime}
            onTimeChange={(e: any) =>
              setPreferences((prev) => ({ ...prev, eveningTime: e.target.value }))
            }
            showTime={true}
          />

          <NotificationToggle
            icon={Trophy}
            title="Milestone Celebrations"
            description="Get notified when you unlock achievements and reach streak milestones"
            enabled={preferences.milestoneAlerts}
            onToggle={(checked: boolean) =>
              setPreferences((prev) => ({ ...prev, milestoneAlerts: checked }))
            }
          />

          <NotificationToggle
            icon={AlertCircle}
            title="Urge Support Alerts"
            description="Receive encouragement and coping strategies when you need them most"
            enabled={preferences.urgeAlerts}
            onToggle={(checked: boolean) =>
              setPreferences((prev) => ({ ...prev, urgeAlerts: checked }))
            }
          />
        </div>
      )}

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={handleNext} className="bg-recovery-500 hover:bg-recovery-600">
          Complete Setup
        </Button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">🔔 About Notifications</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• All notifications can be customized later in settings</li>
          <li>• We respect your privacy and never share personal data</li>
          <li>• Notifications work offline with our PWA</li>
          <li>• You can pause notifications anytime you need a break</li>
        </ul>
      </div>
    </Card>
  )
}

