'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Calendar, 
  Trophy, 
  Users, 
  Heart, 
  Target, 
  AlertTriangle, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame
} from 'lucide-react'
import { useUserData } from '@/hooks/useUserData'

interface SidebarProps {
  className?: string
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Daily Check-In', href: '/dashboard/check-in', icon: Calendar },
  { name: 'Achievements', href: '/achievements', icon: Trophy },
  { name: 'Forum', href: '/forum', icon: Users },
  { name: 'Health Tracking', href: '/health', icon: Heart },
  { name: 'Challenges', href: '/challenges', icon: Target },
  { name: 'Crisis Support', href: '/crisis', icon: AlertTriangle, urgent: true },
  { name: 'Settings', href: '/profile/settings', icon: Settings },
]

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const { userData, isLoading } = useUserData()

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300",
      isCollapsed ? "w-16" : "w-70",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-lg">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-neutral-900 dark:text-white">Streak Warrior</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-primary-100 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100 border-l-4 border-primary-500"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100",
                item.urgent && "text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20",
                isCollapsed && "justify-center px-2"
              )}
            >
              <Icon className={cn(
                "flex-shrink-0 transition-colors",
                isCollapsed ? "w-5 h-5" : "w-4 h-4",
                item.urgent && "text-danger-500 dark:text-danger-400",
                isActive && "text-primary-600 dark:text-primary-400"
              )} />
              {!isCollapsed && (
                <span className="truncate">{item.name}</span>
              )}
              {/* Active indicator for collapsed state */}
              {isCollapsed && isActive && (
                <div className="absolute left-0 w-1 h-6 bg-primary-500 rounded-r-full" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Streak Badge */}
      <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
        <div className={cn(
          "bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group",
          isCollapsed ? "p-2" : "p-4"
        )}>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Flame className="w-6 h-6 animate-fire-pulse group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 w-6 h-6 bg-yellow-400/20 rounded-full animate-pulse" />
            </div>
            {!isCollapsed && (
              <div>
                <div className="text-2xl font-bold animate-number-pop">
                  {isLoading ? '...' : userData.currentStreak}
                </div>
                <div className="text-xs opacity-90">
                  Day{userData.currentStreak !== 1 ? 's' : ''} Strong
                </div>
              </div>
            )}
          </div>
          {isCollapsed && (
            <div className="text-center mt-1">
              <div className="text-sm font-bold">
                {isLoading ? '...' : userData.currentStreak}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
