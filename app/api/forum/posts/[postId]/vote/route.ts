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

    const data = await req.json()
    const voteType = data.type // 'UP' or 'DOWN'

    // Check if user already voted on this post
    const existingVote = await db.postVote.findUnique({
      where: {
        userId_postId: {
          userId: session.user.id,
          postId: params.postId
        }
      }
    })

    if (existingVote) {
      if (existingVote.type === voteType) {
        // Remove vote if clicking same button
        await db.postVote.delete({
          where: { id: existingVote.id }
        })

        // Update post vote count
        await db.forumPost.update({
          where: { id: params.postId },
          data: {
            upvotes: voteType === 'UP' ? { decrement: 1 } : undefined,
            downvotes: voteType === 'DOWN' ? { decrement: 1 } : undefined
          }
        })

        return NextResponse.json({ success: true, action: 'removed' })
      } else {
        // Change vote type
        await db.postVote.update({
          where: { id: existingVote.id },
          data: { type: voteType }
        })

        // Update post vote counts
        await db.forumPost.update({
          where: { id: params.postId },
          data: {
            upvotes: voteType === 'UP' ? { increment: 1 } : { decrement: 1 },
            downvotes: voteType === 'DOWN' ? { increment: 1 } : { decrement: 1 }
          }
        })

        return NextResponse.json({ success: true, action: 'changed' })
      }
    } else {
      // Create new vote
      await db.postVote.create({
        data: {
          userId: session.user.id,
          postId: params.postId,
          type: voteType
        }
      })

      // Update post vote count
      await db.forumPost.update({
        where: { id: params.postId },
        data: {
          upvotes: voteType === 'UP' ? { increment: 1 } : undefined,
          downvotes: voteType === 'DOWN' ? { increment: 1 } : undefined
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

