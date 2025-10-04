'use client'

import { useState, useEffect } from 'react'

export function usePWA() {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  useEffect(() => {
    // Check if app is installed
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
    
    // Check if app is already installed
    const isAppInstalled = localStorage.getItem('pwa-installed') === 'true'
    setIsInstalled(isAppInstalled)

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true)
      localStorage.setItem('pwa-installed', 'true')
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return false

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setIsInstalled(true)
      localStorage.setItem('pwa-installed', 'true')
    }
    
    setDeferredPrompt(null)
    return outcome === 'accepted'
  }

  return {
    isInstalled,
    isStandalone,
    canInstall: !!deferredPrompt,
    installApp
  }
}
