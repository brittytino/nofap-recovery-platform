'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  Target, 
  Heart, 
  Trophy, 
  MessageCircle, 
  TrendingUp,
  Calendar,
  Users,
  Star,
  Shield,
  Settings
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Streak Tracker',
    href: '/streak',
    icon: Target,
  },
  {
    name: 'Health & Mood',
    href: '/health',
    icon: Heart,
  },
  {
    name: 'Challenges',
    href: '/challenges',
    icon: Trophy,
  },
  {
    name: 'Achievements',
    href: '/achievements',
    icon: Star,
  },
  {
    name: 'Community',
    href: '/forum',
    icon: MessageCircle,
  },
  {
    name: 'Success Stories',
    href: '/success-stories',
    icon: TrendingUp,
  },
  {
    name: 'Leaderboard',
    href: '/leaderboard',
    icon: Users,
  },
]

const secondaryNavigation = [
  {
    name: 'Crisis Support',
    href: '/crisis',
    icon: Shield,
    className: 'text-red-600 hover:text-red-700 hover:bg-red-50',
  },
  {
    name: 'Settings',
    href: '/profile/settings',
    icon: Settings,
  },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn('fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200', className)}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-recovery-500 to-recovery-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900">Recovery</span>
              <span className="text-xs text-gray-500">Your Journey</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-recovery-50 text-recovery-700 border border-recovery-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <item.icon className={cn('mr-3 h-5 w-5', isActive ? 'text-recovery-600' : 'text-gray-400')} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Secondary Navigation */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="space-y-1">
            {secondaryNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    item.className || (isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50')
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
