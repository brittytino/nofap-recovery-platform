import { db } from '@/lib/db'
import { generateAnonymousUsername } from '@/lib/utils'

export async function createForumPost(data: {
  userId: string
  title: string
  content: string
  category: string
  isAnonymous: boolean
}) {
  return await db.forumPost.create({
    data: {
      ...data,
      anonymousUsername: data.isAnonymous ? generateAnonymousUsername() : null,
    },
    include: {
      _count: {
        select: { comments: true, votes: true }
      }
    }
  })
}

export async function getForumPosts(params: {
  category?: string
  page: number
  limit: number
  sort: 'newest' | 'oldest' | 'popular' | 'commented'
  search?: string
}) {
  const { category, page, limit, sort, search } = params
  const skip = (page - 1) * limit

  let orderBy: any = { createdAt: 'desc' }
  
  switch (sort) {
    case 'oldest':
      orderBy = { createdAt: 'asc' }
      break
    case 'popular':
      orderBy = { upvotes: 'desc' }
      break
    case 'commented':
      orderBy = { comments: { _count: 'desc' } }
      break
  }

  const where: any = {}
  
  if (category && category !== 'all') {
    where.category = category
  }
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { content: { contains: search, mode: 'insensitive' } }
    ]
  }

  const [posts, totalCount] = await Promise.all([
    db.forumPost.findMany({
      where,
      include: {
        _count: {
          select: { comments: true }
        }
      },
      orderBy: [
        { isPinned: 'desc' },
        orderBy
      ],
      skip,
      take: limit,
    }),
    db.forumPost.count({ where })
  ])

  return {
    posts,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      hasNext: page < Math.ceil(totalCount / limit),
      hasPrev: page > 1,
    }
  }
}

export async function voteOnPost(data: {
  userId: string
  postId: string
  type: 'up' | 'down'
}) {
  const existingVote = await db.postVote.findUnique({
    where: {
      userId_postId: {
        userId: data.userId,
        postId: data.postId
      }
    }
  })

  if (existingVote) {
    if (existingVote.type === data.type) {
      // Remove vote
      await db.postVote.delete({
        where: { id: existingVote.id }
      })
      
      // Update post vote count
      const updateData = data.type === 'up' 
        ? { upvotes: { decrement: 1 } }
        : { downvotes: { decrement: 1 } }
        
      await db.forumPost.update({
        where: { id: data.postId },
        data: updateData
      })
    } else {
      // Change vote
      await db.postVote.update({
        where: { id: existingVote.id },
        data: { type: data.type }
      })
      
      // Update post vote counts
      const updateData = data.type === 'up'
        ? { upvotes: { increment: 1 }, downvotes: { decrement: 1 } }
        : { upvotes: { decrement: 1 }, downvotes: { increment: 1 } }
        
      await db.forumPost.update({
        where: { id: data.postId },
        data: updateData
      })
    }
  } else {
    // Create new vote
    await db.postVote.create({
      data: {
        userId: data.userId,
        postId: data.postId,
        type: data.type
      }
    })
    
    // Update post vote count
    const updateData = data.type === 'up' 
      ? { upvotes: { increment: 1 } }
      : { downvotes: { increment: 1 } }
      
    await db.forumPost.update({
      where: { id: data.postId },
      data: updateData
    })
  }
}
