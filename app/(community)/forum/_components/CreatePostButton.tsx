'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { toast } from 'react-hot-toast'

export function CreatePostButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim() || !category) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          category,
          isAnonymous
        })
      })

      if (response.ok) {
        toast.success('Post created successfully!')
        setIsOpen(false)
        setTitle('')
        setContent('')
        setCategory('')
        setIsAnonymous(true)
        // Refresh the page to show the new post
        window.location.reload()
      } else {
        const data = await response.json()
        toast.error(data.message || 'Failed to create post')
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
        <Button className="bg-recovery-500 hover:bg-recovery-600">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's on your mind?"
              maxLength={200}
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              {title.length}/200 characters
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GENERAL">General Discussion</SelectItem>
                <SelectItem value="SUCCESS_STORIES">Success Stories</SelectItem>
                <SelectItem value="STRUGGLES">Struggles & Support</SelectItem>
                <SelectItem value="FITNESS">Fitness & Health</SelectItem>
                <SelectItem value="RELATIONSHIPS">Relationships</SelectItem>
                <SelectItem value="MENTAL_HEALTH">Mental Health</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, experiences, or ask for advice..."
              rows={6}
              maxLength={5000}
              required
            />
            <div className="text-xs text-gray-500 mt-1">
              {content.length}/5000 characters
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
            />
            <Label htmlFor="anonymous" className="text-sm">
              Post anonymously (recommended)
            </Label>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Community Guidelines:</strong> Be respectful, supportive, and avoid sharing personal information. 
              Posts that violate our guidelines will be removed.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-recovery-500 hover:bg-recovery-600"
            >
              {isLoading ? 'Creating...' : 'Create Post'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
