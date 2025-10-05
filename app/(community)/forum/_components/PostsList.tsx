'use client'

import { useState, useEffect } from 'react'
import { PostCard } from './PostCard'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/useDebounce'

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
  _count: { comments: number }
}

export function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState('newest')
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  
  const debouncedSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    fetchPosts(1, true) // Reset and fetch first page
  }, [sortBy, filterCategory, debouncedSearch])

  const fetchPosts = async (page: number, reset: boolean = false) => {
    try {
      setIsLoading(true)
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        sort: sortBy,
        ...(filterCategory !== 'all' && { category: filterCategory }),
        ...(debouncedSearch && { search: debouncedSearch })
      })

      const response = await fetch(`/api/forum/posts?${params}`)
      const data = await response.json()

      setPosts(prev => reset ? data.posts : [...prev, ...data.posts])
      setHasNextPage(data.pagination.hasNext)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = () => {
    if (hasNextPage && !isLoading) {
      fetchPosts(currentPage + 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
            <SelectItem value="commented">Most Discussed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="GENERAL">General</SelectItem>
            <SelectItem value="SUCCESS_STORIES">Success Stories</SelectItem>
            <SelectItem value="STRUGGLES">Struggles</SelectItem>
            <SelectItem value="FITNESS">Fitness</SelectItem>
            <SelectItem value="RELATIONSHIPS">Relationships</SelectItem>
            <SelectItem value="MENTAL_HEALTH">Mental Health</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        
        {posts.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">
              {searchQuery || filterCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Be the first to start a discussion!'
              }
            </p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="text-center">
          <Button
            onClick={loadMore}
            disabled={isLoading}
            variant="outline"
            className="min-w-32"
          >
            {isLoading ? 'Loading...' : 'Load More Posts'}
          </Button>
        </div>
      )}
    </div>
  )
}
