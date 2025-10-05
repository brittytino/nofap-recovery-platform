'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface UpdateNotificationProps {
  isVisible: boolean
}

export function UpdateNotification({ isVisible }: UpdateNotificationProps) {
  const [showUpdate, setShowUpdate] = useState(false)

  useEffect(() => {
    setShowUpdate(isVisible)
  }, [isVisible])

  const handleUpdate = () => {
    window.location.reload()
  }

  const handleDismiss = () => {
    setShowUpdate(false)
  }

  return (
    <AnimatePresence>
      {showUpdate && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md"
        >
          <Card className="p-4 shadow-lg border-blue-200 bg-white">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Download className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Update Available</h3>
                  <p className="text-sm text-gray-600">A new version is ready</p>
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
              <Button onClick={handleUpdate} className="flex-1 bg-blue-500 hover:bg-blue-600">
                Update Now
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
