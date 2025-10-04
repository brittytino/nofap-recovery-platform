'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, Phone, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function SOSButton() {
  const [isActivated, setIsActivated] = useState(false)

  const handleSOS = () => {
    setIsActivated(true)
    // Log the SOS activation
    fetch('/api/crisis/sos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp: new Date() })
    })
  }

  if (isActivated) {
    return (
      <Card className="p-8 text-center bg-red-50 border-red-200">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="space-y-6"
        >
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto" />
          <h2 className="text-2xl font-bold text-red-800">Help is Here</h2>
          <p className="text-red-700">
            Take a deep breath. You've taken the right step by reaching out.
          </p>
          
          <div className="space-y-4">
            <Button className="w-full bg-red-600 hover:bg-red-700" size="lg">
              <Phone className="mr-2 h-5 w-5" />
              Call Crisis Hotline: 988
            </Button>
            
            <Button variant="outline" className="w-full" size="lg">
              <MessageCircle className="mr-2 h-5 w-5" />
              Text Crisis Line: Text HOME to 741741
            </Button>
          </div>
          
          <p className="text-sm text-red-600">
            If you're in immediate danger, call emergency services: 911
          </p>
        </motion.div>
      </Card>
    )
  }

  return (
    <Card className="p-8 text-center">
      <AlertTriangle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Support</h2>
      <p className="text-gray-600 mb-6">
        Having intense urges or feeling overwhelmed? Get immediate support.
      </p>
      
      <Button 
        onClick={handleSOS}
        className="w-full bg-red-600 hover:bg-red-700 text-white" 
        size="lg"
      >
        <AlertTriangle className="mr-2 h-5 w-5" />
        I Need Help Now
      </Button>
      
      <p className="text-xs text-gray-500 mt-4">
        This will connect you to crisis resources and coping strategies
      </p>
    </Card>
  )
}
