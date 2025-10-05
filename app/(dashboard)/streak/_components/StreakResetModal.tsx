'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface StreakResetModalProps {
  userId: string
}

export function StreakResetModal({ userId }: StreakResetModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const router = useRouter()

  const handleReset = async () => {
    if (confirmText !== 'RESET') {
      toast.error('Please type "RESET" to confirm')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/streak/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason,
          notes,
          timestamp: new Date()
        })
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setIsOpen(false)
        router.refresh()
      } else {
        toast.error(data.message || 'Failed to reset streak')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline"
          className="text-red-600 border-red-200 hover:bg-red-50"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Streak
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            <span>Reset Streak</span>
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. Your current streak will be reset to 0, 
            but your longest streak record will be preserved.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="reason">Reason for reset (optional)</Label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mt-1"
            >
              <option value="">Select a reason</option>
              <option value="relapse">Had a relapse</option>
              <option value="mistake">Made a mistake</option>
              <option value="restart">Want to start fresh</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <Label htmlFor="notes">Additional notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Reflect on what happened and what you'll do differently..."
              rows={3}
            />
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Remember:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Every setback is a setup for a comeback</li>
              <li>• Learning from mistakes is part of growth</li>
              <li>• The community is here to support you</li>
              <li>• Tomorrow is a new opportunity</li>
            </ul>
          </div>

          <div>
            <Label htmlFor="confirm">Type "RESET" to confirm</Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
              placeholder="RESET"
              className="font-mono"
            />
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReset}
              disabled={isLoading || confirmText !== 'RESET'}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {isLoading ? 'Resetting...' : 'Reset Streak'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
