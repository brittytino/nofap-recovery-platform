'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Trophy, Star, Share2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
// import confetti from 'canvas-confetti' // Optional dependency

interface ChallengeCompletionProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  challenge: {
    id: string
    title: string
    points: number
    tier: string
  } | null
}

export function ChallengeCompletion({ isOpen, onOpenChange, challenge }: ChallengeCompletionProps) {
  const [reflection, setReflection] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleComplete = async () => {
    if (!challenge) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/challenges/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengeId: challenge.id,
          reflection
        })
      })

      if (response.ok) {
        // Trigger confetti animation
        // confetti({
        //   particleCount: 100,
        //   spread: 70,
        //   origin: { y: 0.6 }
        // })

        toast.success(`Congratulations! +${challenge.points} XP earned!`)
        setReflection('')
        onOpenChange(false)
      } else {
        toast.error('Failed to complete challenge')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleShare = async () => {
    if (!challenge) return

    const shareText = `I just completed the "${challenge.title}" challenge and earned ${challenge.points} XP! 🏆 #RecoveryJourney #Challenge`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Challenge Completed!',
          text: shareText,
          url: window.location.origin
        })
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText)
        toast.success('Achievement copied to clipboard!')
      }
    } else {
      navigator.clipboard.writeText(shareText)
      toast.success('Achievement copied to clipboard!')
    }
  }

  if (!challenge) return null

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'BEGINNER': return 'text-green-600'
      case 'INTERMEDIATE': return 'text-blue-600'
      case 'ADVANCED': return 'text-purple-600'
      case 'MASTER': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Challenge Complete!
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {challenge.title}
            </h3>
            <div className={`text-sm font-medium ${getTierColor(challenge.tier)} mb-4`}>
              {challenge.tier} Level Challenge
            </div>
            
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-xl font-bold text-recovery-600">
                +{challenge.points} XP Earned!
              </span>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
          </div>

          <div>
            <Label htmlFor="reflection">
              How do you feel about completing this challenge? (optional)
            </Label>
            <Textarea
              id="reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Share your thoughts, what you learned, or how it helped you..."
              rows={4}
            />
          </div>

          <div className="space-y-3">
            <Button 
              onClick={handleComplete}
              disabled={isSubmitting}
              className="w-full bg-recovery-500 hover:bg-recovery-600"
            >
              {isSubmitting ? 'Completing...' : 'Complete Challenge'}
            </Button>
            
            <Button 
              onClick={handleShare}
              variant="outline"
              className="w-full"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share Achievement
            </Button>
          </div>

          <div className="bg-recovery-50 p-4 rounded-lg text-center">
            <p className="text-sm text-recovery-700">
              🎉 Great job on completing this challenge! Keep building positive habits 
              and working towards your goals.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
