import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { ToastProvider } from '@/components/providers/ToastProvider'
import { PWAProvider } from '@/components/providers/PWAProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Recovery Platform - Your Journey to Better Health',
  description: 'A comprehensive platform for personal recovery, streak tracking, and community support',
  manifest: '/manifest.json',
  themeColor: '#22c55e',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    apple: '/icons/icon-152x152.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PWAProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </PWAProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
