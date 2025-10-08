import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const MAX_FILE_SIZE = 100 * 1024 // 100KB in bytes

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ message: 'No file provided' }, { status: 400 })
    }

    // Check file size (max 100KB)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        message: `Image size must be less than 100KB. Current size: ${Math.round(file.size / 1024)}KB` 
      }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const dataURI = `data:${file.type};base64,${base64}`

    // Upload to Cloudinary with moderation and transformations
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: 'recovery-platform/avatars',
      public_id: `user_${session.user.id}`,
      overwrite: true,
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto:low', fetch_format: 'auto' }
      ],
      tags: ['avatar', `user_${session.user.id}`]
    })

    // Update user profile with new image URL
    await db.user.update({
      where: { id: session.user.id },
      data: {
        image: uploadResult.secure_url
      }
    })

    return NextResponse.json({ 
      success: true,
      imageUrl: uploadResult.secure_url,
      message: 'Profile picture updated successfully'
    })
  } catch (error) {
    console.error('Avatar upload error:', error)
    return NextResponse.json(
      { message: 'Failed to upload avatar' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession()
    
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(`recovery-platform/avatars/user_${session.user.id}`)

    // Update user profile to remove image
    await db.user.update({
      where: { id: session.user.id },
      data: {
        image: null
      }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Profile picture removed successfully'
    })
  } catch (error) {
    console.error('Avatar deletion error:', error)
    return NextResponse.json(
      { message: 'Failed to delete avatar' },
      { status: 500 }
    )
  }
}

