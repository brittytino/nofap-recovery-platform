import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Check if user already voted on this post
    const existingVote = await db.postUpvote.findUnique({
      where: {
        postId_userId: {
          userId: session.user.id,
          postId: params.postId
        }
      }
    })

    if (existingVote) {
      // Remove vote if already exists (toggle behavior)
      await db.postUpvote.delete({
        where: { id: existingVote.id }
      })

      // Decrement post upvote count
      await db.forumPost.update({
        where: { id: params.postId },
        data: {
          upvoteCount: { decrement: 1 }
        }
      })

      return NextResponse.json({ success: true, action: 'removed' })
    } else {
      // Create new upvote
      await db.postUpvote.create({
        data: {
          userId: session.user.id,
          postId: params.postId
        }
      })

      // Increment post upvote count
      await db.forumPost.update({
        where: { id: params.postId },
        data: {
          upvoteCount: { increment: 1 }
        }
      })

      return NextResponse.json({ success: true, action: 'added' })
    }
  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json(
      { message: 'Failed to process vote' },
      { status: 500 }
    )
  }
}

