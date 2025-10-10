import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { title, message, type, actionUrl } = await req.json()

    // Create notification in database
    const notification = await db.notification.create({
      data: {
        userId: session.user.id,
        type: type || 'COMMUNITY_UPDATE',
        title,
        message,
        link: actionUrl
      }
    })

    // In a production environment, this would trigger a push notification
    // using Web Push API with VAPID keys
    // For now, we're just storing it in the database

    return NextResponse.json({ 
      success: true,
      notification
    })
  } catch (error) {
    console.error('Notification send error:', error)
    return NextResponse.json(
      { message: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const notifications = await db.notification.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 50
    })

    const unreadCount = notifications.filter(n => !n.isRead).length

    return NextResponse.json({ 
      notifications,
      unreadCount
    })
  } catch (error) {
    console.error('Notifications fetch error:', error)
    return NextResponse.json(
      { message: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

