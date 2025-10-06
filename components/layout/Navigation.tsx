'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Target, 
  Heart, 
  Trophy, 
  Award,
  User,
  AlertTriangle,
  MessageCircle,
  Users,
  BarChart3
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Streak', href: '/streak', icon: Target },
  { name: 'Health', href: '/health', icon: Heart },
  { name: 'Challenges', href: '/challenges', icon: Trophy },
  { name: 'Achievements', href: '/achievements', icon: Award },
  { name: 'Community', href: '/forum', icon: MessageCircle },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Crisis Support', href: '/crisis', icon: AlertTriangle },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
              isActive
                ? 'bg-recovery-100 text-recovery-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <item.icon
              className={cn(
                'mr-3 h-5 w-5 flex-shrink-0',
                isActive
                  ? 'text-recovery-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
