'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Calendar, 
  AlertTriangle, 
  Users, 
  User 
} from 'lucide-react'

const mobileNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Check-In', href: '/dashboard/check-in', icon: Calendar },
  { name: 'Urge Help', href: '/crisis', icon: AlertTriangle, urgent: true },
  { name: 'Forum', href: '/forum', icon: Users },
  { name: 'Profile', href: '/profile', icon: User },
]

export function MobileMenu() {
  const pathname = usePathname()

  return (
    <>
      {/* Bottom Navigation Bar - Mobile Only */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 pb-safe shadow-lg">
        <div className="flex items-center justify-around px-1 py-2">
          {mobileNavigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center space-y-1 px-2 py-2 rounded-xl text-xs font-medium transition-all duration-200 min-w-0 flex-1 group relative",
                  isActive
                    ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800/50",
                  item.urgent && !isActive && "text-danger-600 dark:text-danger-400 hover:bg-danger-50 dark:hover:bg-danger-900/20"
                )}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-500 rounded-full" />
                )}
                
                <div className="relative">
                  <Icon className={cn(
                    "w-5 h-5 flex-shrink-0 transition-all duration-200",
                    item.urgent && !isActive && "text-danger-500 dark:text-danger-400",
                    isActive && "text-primary-500 dark:text-primary-400 scale-110",
                    !isActive && "group-hover:scale-105"
                  )} />
                  
                  {/* Notification dot for urgent items */}
                  {item.urgent && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-danger-500 rounded-full animate-pulse" />
                  )}
                </div>
                
                <span className={cn(
                  'text-xs font-medium transition-colors',
                  isActive ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-500 dark:text-neutral-400'
                )}>
                  {item.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
      
      {/* Bottom padding for mobile content to avoid overlap */}
      <div className="lg:hidden h-16" />
    </>
  )
}
