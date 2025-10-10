import { db } from '@/lib/db'
import { generateAnonymousUsername } from '@/lib/utils'

export async function createForumPost(data: {
  userId: string
  title: string
  content: string
  category: string
  categoryId: string
  isAnonymous: boolean
}) {
  // Generate anonymous username if posting anonymously and user doesn't have one
  if (data.isAnonymous) {
    const user = await db.user.findUnique({
      where: { id: data.userId },
      select: { anonymousUsername: true }
    })
    
    if (!user?.anonymousUsername) {
      await db.user.update({
        where: { id: data.userId },
        data: { anonymousUsername: generateAnonymousUsername() }
      })
    }
  }

  return await db.forumPost.create({
    data: {
      userId: data.userId,
      categoryId: data.categoryId,
      title: data.title,
      content: data.content,
      isAnonymous: data.isAnonymous
    } as any,
    include: {
      _count: {
        select: { comments: true, upvotes: true }
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
}) {
  const existingVote = await db.postUpvote.findUnique({
    where: {
      postId_userId: {
        userId: data.userId,
        postId: data.postId
      }
    }
  })

  if (existingVote) {
    // Remove upvote if already exists (toggle behavior)
    await db.postUpvote.delete({
      where: { id: existingVote.id }
    })
    
    // Decrement post upvote count
    await db.forumPost.update({
      where: { id: data.postId },
      data: {
        upvoteCount: { decrement: 1 }
      }
    })
  } else {
    // Create new upvote
    await db.postUpvote.create({
      data: {
        userId: data.userId,
        postId: data.postId
      }
    })
    
    // Increment post upvote count
    await db.forumPost.update({
      where: { id: data.postId },
      data: {
        upvoteCount: { increment: 1 }
      }
    })
  }
}
