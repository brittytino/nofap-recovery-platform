'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface InstallPromptProps {
  deferredPrompt: any
}

export function InstallPrompt({ deferredPrompt }: InstallPromptProps) {
  const [showPrompt, setShowPrompt] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const installed = localStorage.getItem('pwa-installed') === 'true'
    const dismissed = localStorage.getItem('pwa-dismissed') === 'true'
    
    setIsInstalled(installed)
    setShowPrompt(deferredPrompt && !installed && !dismissed)
  }, [deferredPrompt])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      localStorage.setItem('pwa-installed', 'true')
      setIsInstalled(true)
    }
    
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    localStorage.setItem('pwa-dismissed', 'true')
    setShowPrompt(false)
  }

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
        >
          <Card className="p-4 shadow-lg border-recovery-200 bg-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-recovery-500 rounded-lg flex items-center justify-center">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Install Recovery App</h3>
                  <p className="text-sm text-gray-600">Access your recovery journey anytime</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleInstall} className="flex-1 bg-recovery-500 hover:bg-recovery-600">
                Install
              </Button>
              <Button variant="outline" onClick={handleDismiss} className="flex-1">
                Later
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
