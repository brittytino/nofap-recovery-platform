'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Bell, Lock, Download, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface QuickSettingsProps {
  userId: string
}

export function QuickSettings({ userId }: QuickSettingsProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  const settings = [
    {
      icon: Settings,
      label: 'Account Settings',
      description: 'Manage your account',
      onClick: () => router.push('/profile/settings'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Configure alerts',
      onClick: () => router.push('/profile/settings#notifications'),
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Lock,
      label: 'Privacy',
      description: 'Privacy settings',
      onClick: () => router.push('/profile/settings#privacy'),
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Download,
      label: 'Export Data',
      description: 'Download your data',
      onClick: () => router.push('/profile/settings#export'),
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ]

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Settings</h3>
      <div className="space-y-2">
        {settings.map((setting, index) => (
          <button
            key={index}
            onClick={setting.onClick}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg ${setting.bgColor} hover:opacity-80 transition-opacity`}
          >
            <setting.icon className={setting.color} size={20} />
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-900">{setting.label}</p>
              <p className="text-xs text-gray-600">{setting.description}</p>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          className="w-full text-red-600 hover:bg-red-50 border-red-200"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </div>
    </Card>
  )
}

