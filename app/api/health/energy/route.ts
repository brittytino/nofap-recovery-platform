import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { z } from 'zod'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const energySchema = z.object({
  energyLevel: z.number().min(1).max(10),
  date: z.string().datetime(),
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { energyLevel, date } = energySchema.parse(body)

    const logDate = new Date(date)
    logDate.setHours(0, 0, 0, 0)

    const dailyLog = await db.dailyLog.upsert({
      where: {
        userId_date: {
          userId: session.user.id,
          date: logDate,
        }
      },
      update: {
        energyLevel,
      },
      create: {
        userId: session.user.id,
        date: logDate,
        energyLevel,
      }
    })

    return NextResponse.json({ success: true, dailyLog })
  } catch (error) {
    console.error('Energy logging error:', error)
    return NextResponse.json(
      { message: 'Failed to log energy' },
      { status: 500 }
    )
  }
}
