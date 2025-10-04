import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { generateAnonymousUsername } from '@/lib/utils'

const createPostSchema = z.object({
  title: z.string().min(5).max(200),
  content: z.string().min(10).max(5000),
  category: z.enum(['GENERAL', 'SUCCESS_STORIES', 'STRUGGLES', 'FITNESS', 'RELATIONSHIPS', 'MENTAL_HEALTH']),
  isAnonymous: z.boolean().default(true),
})

const postsQuerySchema = z.object({
  category: z.string().optional(),
  page: z.string().optional(),
  limit: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, content, category, isAnonymous } = createPostSchema.parse(body)

    const post = await db.forumPost.create({
      data: {
        userId: session.user.id,
        title,
        content,
        category,
        isAnonymous,
        anonymousUsername: isAnonymous ? generateAnonymousUsername() : null,
      },
      include: {
        _count: {
          select: { comments: true }
        }
      }
    })

    // Award XP for creating post
    await awardXP(session.user.id, 'FORUM_POST', 25)

    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch (error) {
    console.error('Post creation error:', error)
    return NextResponse.json(
      { message: 'Failed to create post' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const { category, page = '1', limit = '10' } = postsQuerySchema.parse(
      Object.fromEntries(searchParams)
    )

    const pageNum = parseInt(page)
    const limitNum = parseInt(limit)
    const skip = (pageNum - 1) * limitNum

    const where = category ? { category: category as any } : {}

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
          { createdAt: 'desc' }
        ],
        skip,
        take: limitNum,
      }),
      db.forumPost.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limitNum)

    return NextResponse.json({
      posts,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1,
      }
    })
  } catch (error) {
    console.error('Posts fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

async function awardXP(userId: string, activityType: string, points: number) {
  await db.userXP.create({
    data: {
      userId,
      activityType,
      pointsEarned: points,
      date: new Date(),
    }
  })
}
