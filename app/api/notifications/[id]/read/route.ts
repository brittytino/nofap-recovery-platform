import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Update notification to mark as read
    const notification = await db.notification.update({
      where: {
        id: params.id
      },
      data: {
        isRead: true
      }
    })

    return NextResponse.json({ 
      success: true,
      notification
    })
  } catch (error) {
    console.error('Mark notification read error:', error)
    return NextResponse.json(
      { message: 'Failed to mark notification as read' },
      { status: 500 }
    )
  }
}

