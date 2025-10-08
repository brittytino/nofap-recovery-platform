'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Upload, Loader2, X } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface ProfileImageUploadProps {
  currentImage?: string | null
  userName?: string | null
}

export function ProfileImageUpload({ currentImage, userName }: ProfileImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState(currentImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const MAX_FILE_SIZE = 100 * 1024 // 100KB

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`Image must be less than 100KB. Current size: ${Math.round(file.size / 1024)}KB`)
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/user/upload-avatar', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        setImageUrl(data.imageUrl)
        toast.success(data.message)
        // Reload to update nav avatar
        window.location.reload()
      } else {
        toast.error(data.message || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveImage = async () => {
    if (!imageUrl) return

    setUploading(true)

    try {
      const response = await fetch('/api/user/upload-avatar', {
        method: 'DELETE'
      })

      if (response.ok) {
        setImageUrl(null)
        toast.success('Profile picture removed')
        window.location.reload()
      } else {
        toast.error('Failed to remove image')
      }
    } catch (error) {
      console.error('Remove error:', error)
      toast.error('Failed to remove image')
    } finally {
      setUploading(false)
    }
  }

  const getInitials = () => {
    if (!userName) return 'U'
    return userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-32 w-32">
          <AvatarImage src={imageUrl || undefined} alt={userName || 'User'} />
          <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
        </Avatar>
        
        {imageUrl && !uploading && (
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />

        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          variant="outline"
          className="relative"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              {imageUrl ? 'Change' : 'Upload'} Photo
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 mt-2">
          Max 100KB • JPG, PNG, or WebP
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Stored securely in Cloudinary
        </p>
      </div>
    </div>
  )
}

