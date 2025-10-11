'use client'

import { ThemeProvider as CustomThemeProvider } from '@/lib/ThemeContext'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <CustomThemeProvider defaultTheme="system" storageKey="streak-warrior-theme">
      {children}
    </CustomThemeProvider>
  )
}
