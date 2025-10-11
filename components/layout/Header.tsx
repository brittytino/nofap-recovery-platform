'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronRight, 
  Home, 
  User, 
  Settings, 
  LogOut, 
  Flame,
  Menu,
  X
} from 'lucide-react'
import { useUserData } from '@/hooks/useUserData'
import { SimpleThemeToggle } from '@/components/ui/theme-toggle'
import { cn } from '@/lib/utils'

// Breadcrumb mapping for different routes
const breadcrumbMap: Record<string, string[]> = {
  '/dashboard': ['Dashboard'],
  '/dashboard/check-in': ['Dashboard', 'Daily Check-In'],
  '/achievements': ['Achievements'],
  '/forum': ['Community', 'Forum'],
  '/forum/general': ['Community', 'Forum', 'General'],
  '/forum/success-stories': ['Community', 'Forum', 'Success Stories'],
  '/forum/accountability': ['Community', 'Forum', 'Accountability'],
  '/forum/crisis-support': ['Community', 'Forum', 'Crisis Support'],
  '/health': ['Health Tracking'],
  '/health/mood': ['Health Tracking', 'Mood'],
  '/health/energy': ['Health Tracking', 'Energy'],
  '/health/fitness': ['Health Tracking', 'Fitness'],
  '/challenges': ['Challenges'],
  '/challenges/tier': ['Challenges', 'Tier System'],
  '/crisis': ['Crisis Support'],
  '/profile': ['Profile'],
  '/profile/settings': ['Profile', 'Settings'],
  '/streak': ['Streak Analytics'],
  '/leaderboard': ['Leaderboard'],
}

export function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const { userData, isLoading } = useUserData()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = (path: string) => {
    return breadcrumbMap[path] || ['Dashboard']
  }

  const breadcrumbs = generateBreadcrumbs(pathname)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-lg border-b border-neutral-200 dark:border-neutral-800 lg:ml-70 transition-all duration-300">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          {/* Left: Breadcrumbs (Desktop) / Menu (Mobile) */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* Breadcrumbs - Desktop Only */}
            <nav className="hidden lg:flex items-center space-x-2 text-sm">
              <Link 
                href="/dashboard" 
                className="flex items-center text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <Home className="w-4 h-4" />
              </Link>
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <ChevronRight className="w-4 h-4 text-neutral-400 dark:text-neutral-600" />
                  <span className={cn(
                    "transition-colors",
                    index === breadcrumbs.length - 1 
                      ? "font-medium text-neutral-900 dark:text-white" 
                      : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
                  )}>
                    {crumb}
                  </span>
                </div>
              ))}
            </nav>

            {/* Mobile: Current Page Title */}
            <div className="lg:hidden">
              <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">
                {breadcrumbs[breadcrumbs.length - 1]}
              </h1>
            </div>
          </div>

          {/* Right: Streak Badge + Theme Toggle + User Menu */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Streak Fire Badge */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-danger-500 text-white px-2 sm:px-3 py-1.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 animate-fire-pulse group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-bold">
                {isLoading ? '...' : userData.currentStreak}
                <span className="hidden sm:inline"> days</span>
              </span>
            </div>

            {/* Theme Toggle */}
            <SimpleThemeToggle />

            {/* User Profile Dropdown */}
            {session?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <Avatar className="h-9 w-9 ring-2 ring-transparent hover:ring-primary-200 dark:hover:ring-primary-800 transition-all">
                      <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                      <AvatarFallback className="bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100 font-semibold">
                        {session.user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-64 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-lg dark:shadow-2xl" 
                  align="end" 
                  forceMount
                >
                  <div className="flex items-center justify-start gap-2 p-3 bg-neutral-50 dark:bg-neutral-800/50">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={session.user.image || ''} alt={session.user.name || ''} />
                      <AvatarFallback className="bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100">
                        {session.user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm text-neutral-900 dark:text-white">{session.user.name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[180px]">
                        {session.user.email}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant="secondary" className="text-xs bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                          Level {isLoading ? '...' : userData.currentLevel}
                        </Badge>
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                          {isLoading ? '...' : userData.totalXP} XP
                        </span>
                      </div>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-700" />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/settings" className="flex items-center hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-neutral-200 dark:bg-neutral-700" />
                  <DropdownMenuItem
                    className="text-red-600 dark:text-red-400 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/50 dark:bg-black/70 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed left-0 top-16 bottom-0 w-80 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="p-4">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Navigation</h2>
              {/* Mobile navigation content can be added here */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
