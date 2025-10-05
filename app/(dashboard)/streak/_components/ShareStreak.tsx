'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Share2, Twitter, Facebook, Instagram, Copy } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ShareStreakProps {
  userId: string
}

export function ShareStreak({ userId }: ShareStreakProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [currentStreak, setCurrentStreak] = useState(0)

  const handleShare = async (platform: string) => {
    try {
      const shareText = message || `I'm ${currentStreak} days strong on my recovery journey! 💪 #RecoveryJourney #StayStrong`
      
      if (platform === 'copy') {
        await navigator.clipboard.writeText(shareText)
        toast.success('Copied to clipboard!')
        return
      }

      // Log the share
      await fetch('/api/streak/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform,
          message: shareText,
          streak: currentStreak
        })
      })

      // Platform-specific sharing
      const urls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`,
        instagram: 'https://www.instagram.com/' // Instagram doesn't support direct sharing
      }

      if (urls[platform as keyof typeof urls]) {
        window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
      }
      
      toast.success('Streak shared successfully!')
      setIsOpen(false)
    } catch (error) {
      toast.error('Failed to share streak')
    }
  }

  const fetchCurrentStreak = async () => {
    try {
      const response = await fetch(`/api/streak/current?userId=${userId}`)
      const data = await response.json()
      setCurrentStreak(data.currentStreak)
      setMessage(`I'm ${data.currentStreak} days strong on my recovery journey! 💪 #RecoveryJourney #StayStrong`)
    } catch (error) {
      console.error('Failed to fetch streak:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          onClick={fetchCurrentStreak}
          className="flex items-center space-x-2"
        >
          <Share2 className="h-4 w-4" />
          <span>Share Streak</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Progress</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center p-6 bg-recovery-50 rounded-lg">
            <div className="text-3xl font-bold text-recovery-600 mb-2">
              {currentStreak} Days
            </div>
            <p className="text-recovery-700">Strong and counting!</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Customize your message
            </label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your journey..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => handleShare('twitter')}
              className="flex items-center space-x-2 bg-blue-400 hover:bg-blue-500"
            >
              <Twitter className="h-4 w-4" />
              <span>Twitter</span>
            </Button>
            
            <Button
              onClick={() => handleShare('facebook')}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <Facebook className="h-4 w-4" />
              <span>Facebook</span>
            </Button>
            
            <Button
              onClick={() => handleShare('instagram')}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </Button>
            
            <Button
              onClick={() => handleShare('copy')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
