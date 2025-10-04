'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ThumbsUp, ThumbsDown, MessageCircle, Clock, Pin } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Post {
  id: string
  title: string
  content: string
  category: string
  upvotes: number
  downvotes: number
  isAnonymous: boolean
  anonymousUsername: string
  createdAt: Date
  isPinned: boolean
  _count: {
    comments: number
  }
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [votes, setVotes] = useState({
    upvotes: post.upvotes,
    downvotes: post.downvotes
  })
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null)

  const handleVote = async (type: 'up' | 'down') => {
    try {
      const response = await fetch(`/api/forum/posts/${post.id}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      })

      if (response.ok) {
        if (userVote === type) {
          // Remove vote
          setVotes(prev => ({
            ...prev,
            [type === 'up' ? 'upvotes' : 'downvotes']: prev[type === 'up' ? 'upvotes' : 'downvotes'] - 1
          }))
          setUserVote(null)
        } else {
          // Change or add vote
          if (userVote) {
            setVotes(prev => ({
              ...prev,
              [userVote === 'up' ? 'upvotes' : 'downvotes']: prev[userVote === 'up' ? 'upvotes' : 'downvotes'] - 1,
              [type === 'up' ? 'upvotes' : 'downvotes']: prev[type === 'up' ? 'upvotes' : 'downvotes'] + 1
            }))
          } else {
            setVotes(prev => ({
              ...prev,
              [type === 'up' ? 'upvotes' : 'downvotes']: prev[type === 'up' ? 'upvotes' : 'downvotes'] + 1
            }))
          }
          setUserVote(type)
        }
      }
    } catch (error) {
      console.error('Failed to vote:', error)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'GENERAL': 'bg-blue-100 text-blue-800',
      'SUCCESS_STORIES': 'bg-green-100 text-green-800',
      'STRUGGLES': 'bg-red-100 text-red-800',
      'FITNESS': 'bg-purple-100 text-purple-800',
      'RELATIONSHIPS': 'bg-pink-100 text-pink-800',
      'MENTAL_HEALTH': 'bg-indigo-100 text-indigo-800'
    }
    return colors[category as keyof typeof colors] || colors.GENERAL
  }

  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <Avatar className="w-10 h-10">
          <AvatarFallback>
            {post.anonymousUsername.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            {post.isPinned && <Pin className="h-4 w-4 text-green-600" />}
            <Badge className={getCategoryColor(post.category)} variant="secondary">
              {post.category.replace('_', ' ')}
            </Badge>
          </div>

          <Link href={`/forum/post/${post.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-recovery-600 transition-colors cursor-pointer line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-gray-600 mt-2 line-clamp-3">
            {post.content}
          </p>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Avatar className="w-4 h-4">
                  <AvatarFallback className="text-xs">
                    {post.anonymousUsername.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{post.anonymousUsername}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <Button
                  size="sm"
                  variant={userVote === 'up' ? 'default' : 'ghost'}
                  onClick={() => handleVote('up')}
                  className="h-8 px-2"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="ml-1">{votes.upvotes}</span>
                </Button>
                <Button
                  size="sm"
                  variant={userVote === 'down' ? 'destructive' : 'ghost'}
                  onClick={() => handleVote('down')}
                  className="h-8 px-2"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span className="ml-1">{votes.downvotes}</span>
                </Button>
              </div>

              <Link href={`/forum/post/${post.id}`}>
                <Button size="sm" variant="ghost" className="h-8 px-2">
                  <MessageCircle className="h-4 w-4" />
                  <span className="ml-1">{post._count.comments}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
