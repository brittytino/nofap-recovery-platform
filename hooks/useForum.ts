'use client'

import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

interface ForumPost {
  id: string
  title: string
  content: string
  category: string
  upvotes: number
  downvotes: number
  createdAt: Date
  anonymousUsername: string
  _count: { comments: number }
}

interface ForumState {
  posts: ForumPost[]
  isLoading: boolean
  hasNextPage: boolean
  currentPage: number
}

export function useForum(category?: string) {
  const [state, setState] = useState<ForumState>({
    posts: [],
    isLoading: true,
    hasNextPage: true,
    currentPage: 1
  })

  const fetchPosts = async (page: number = 1, reset: boolean = false) => {
    try {
      setState(prev => ({ ...prev, isLoading: true }))
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(category && { category })
      })

      const response = await fetch(`/api/forum/posts?${params}`)
      const data = await response.json()

      setState(prev => ({
        ...prev,
        posts: reset ? data.posts : [...prev.posts, ...data.posts],
        hasNextPage: data.pagination.hasNext,
        currentPage: page,
        isLoading: false
      }))
    } catch (error) {
      toast.error('Failed to load posts')
      setState(prev => ({ ...prev, isLoading: false }))
    }
  }

  const loadMore = () => {
    if (state.hasNextPage && !state.isLoading) {
      fetchPosts(state.currentPage + 1)
    }
  }

  const refresh = () => {
    fetchPosts(1, true)
  }

  const createPost = async (postData: {
    title: string
    content: string
    category: string
    isAnonymous: boolean
  }) => {
    try {
      const response = await fetch('/api/forum/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      })

      if (response.ok) {
        toast.success('Post created successfully!')
        refresh()
        return true
      } else {
        toast.error('Failed to create post')
        return false
      }
    } catch (error) {
      toast.error('Something went wrong')
      return false
    }
  }

  useEffect(() => {
    fetchPosts(1, true)
  }, [category])

  return {
    ...state,
    loadMore,
    refresh,
    createPost
  }
}
