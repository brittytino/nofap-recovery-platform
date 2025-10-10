import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'

// Generate anonymous username
function generateAnonymousUsername(): string {
  const adjectives = ['Brave', 'Strong', 'Determined', 'Resilient', 'Focused', 'Mindful', 'Courageous', 'Steadfast']
  const nouns = ['Warrior', 'Champion', 'Phoenix', 'Eagle', 'Lion', 'Tiger', 'Guardian', 'Seeker']
  const number = Math.floor(Math.random() * 1000)
  
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${number}`
}

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const comments = await db.forumComment.findMany({
      where: {
        postId: params.postId
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            currentLevel: true,
            anonymousUsername: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Map comments to hide real usernames if anonymous
    const formattedComments = comments.map(comment => ({
      ...comment,
      user: comment.isAnonymous ? {
        id: comment.user.id,
        name: comment.user.anonymousUsername || 'Anonymous',
        image: null,
        level: comment.user.currentLevel,
        anonymousUsername: comment.user.anonymousUsername
      } : comment.user
    }))

    return NextResponse.json({ comments: formattedComments })
  } catch (error) {
    console.error('Comments fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()

    // Generate anonymous username if commenting anonymously and user doesn't have one
    if (data.isAnonymous) {
      const user = await db.user.findUnique({
        where: { id: session.user.id },
        select: { anonymousUsername: true }
      })
      
      if (!user?.anonymousUsername) {
        await db.user.update({
          where: { id: session.user.id },
          data: { anonymousUsername: generateAnonymousUsername() }
        })
      }
    }

    const comment = await db.forumComment.create({
      data: {
        userId: session.user.id,
        postId: params.postId,
        content: data.content,
        isAnonymous: data.isAnonymous ?? true
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            currentLevel: true,
            anonymousUsername: true
          }
        }
      }
    })

    // Award XP for commenting
    await db.userXPLog.create({
      data: {
        userId: session.user.id,
        activityType: 'FORUM_COMMENT',
        pointsEarned: 5,
        description: 'Commented on a forum post'
      }
    })

    await db.user.update({
      where: { id: session.user.id },
      data: {
        totalXP: { increment: 5 }
      }
    })

    return NextResponse.json({ 
      success: true,
      comment: {
        ...comment,
        user: comment.isAnonymous ? {
          id: comment.user.id,
          name: comment.user.anonymousUsername || 'Anonymous',
          image: null,
          level: comment.user.currentLevel,
          anonymousUsername: comment.user.anonymousUsername
        } : comment.user
      }
    })
  } catch (error) {
    console.error('Comment creation error:', error)
    return NextResponse.json(
      { message: 'Failed to create comment' },
      { status: 500 }
    )
  }
}
