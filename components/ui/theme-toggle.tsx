'use client'

import * as React from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme, toggleTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 relative overflow-hidden hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <Sun className={`h-4 w-4 transition-all duration-300 ${
            resolvedTheme === 'dark' 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
          }`} />
          <Moon className={`absolute h-4 w-4 transition-all duration-300 ${
            resolvedTheme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-lg dark:shadow-2xl"
      >
        <DropdownMenuItem 
          onClick={() => setTheme('light')} 
          className="flex items-center space-x-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')} 
          className="flex items-center space-x-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full" />}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')} 
          className="flex items-center space-x-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === 'system' && <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Simple toggle version for header
export function SimpleThemeToggle() {
  const { toggleTheme, resolvedTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9 relative overflow-hidden hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-300 hover:scale-105"
    >
      <Sun className={`h-4 w-4 transition-all duration-300 ${
        resolvedTheme === 'dark' 
          ? 'rotate-180 scale-0 opacity-0' 
          : 'rotate-0 scale-100 opacity-100'
      }`} />
      <Moon className={`absolute h-4 w-4 transition-all duration-300 ${
        resolvedTheme === 'dark' 
          ? 'rotate-0 scale-100 opacity-100' 
          : 'rotate-180 scale-0 opacity-0'
      }`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
