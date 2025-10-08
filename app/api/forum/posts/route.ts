import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'

// Generate anonymous username
function generateAnonymousUsername(): string {
  const adjectives = ['Brave', 'Strong', 'Determined', 'Resilient', 'Focused', 'Mindful', 'Courageous', 'Steadfast', 'Bold', 'Valiant']
  const nouns = ['Warrior', 'Champion', 'Phoenix', 'Eagle', 'Lion', 'Tiger', 'Guardian', 'Seeker', 'Voyager', 'Explorer']
  const number = Math.floor(Math.random() * 1000)
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  
  return `${adjective}${noun}${number}`
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const skip = (page - 1) * limit

    const where = category && category !== 'ALL' ? { category: category as any } : {}

    const [posts, total] = await Promise.all([
      db.forumPost.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              currentLevel: true
            }
          },
          _count: {
            select: {
              comments: true,
              votes: true
            }
          }
        },
        orderBy: [
          { isPinned: 'desc' },
          { createdAt: 'desc' }
        ],
        skip,
        take: limit
      }),
      db.forumPost.count({ where })
    ])

    // Map posts to hide real usernames if anonymous
    const formattedPosts = posts.map(post => ({
      ...post,
      user: post.isAnonymous ? {
        id: post.user.id,
        name: post.anonymousUsername || 'Anonymous',
        image: null,
        level: post.user.currentLevel
      } : post.user
    }))

    return NextResponse.json({ 
      posts: formattedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Forum posts fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch forum posts' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()

    // Generate anonymous username if posting anonymously
    const anonymousUsername = data.isAnonymous ? generateAnonymousUsername() : null

    const post = await db.forumPost.create({
      data: {
        userId: session.user.id,
        title: data.title,
        content: data.content,
        category: data.category,
        isAnonymous: data.isAnonymous ?? true,
        anonymousUsername
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            level: true
          }
        }
      }
    })

    // Award XP for creating a post
    await db.userXPLog.create({
      data: {
        userId: session.user.id,
        activityType: 'FORUM_POST',
        pointsEarned: 15,
        description: 'Created a forum post'
      }
    })

    await db.user.update({
      where: { id: session.user.id },
      data: {
        totalXP: { increment: 15 }
      }
    })

    return NextResponse.json({ 
      success: true,
      post: {
        ...post,
        user: post.isAnonymous ? {
          id: post.user.id,
          name: anonymousUsername,
          image: null,
          level: post.user.currentLevel
        } : post.user
      }
    })
  } catch (error) {
    console.error('Forum post creation error:', error)
    return NextResponse.json(
      { message: 'Failed to create post' },
      { status: 500 }
    )
  }
}
