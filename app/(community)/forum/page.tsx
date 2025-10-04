import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ForumNavigation } from './_components/ForumNavigation'
import { PostsList } from './_components/PostsList'
import { CreatePostButton } from './_components/CreatePostButton'
import { ForumStats } from './_components/ForumStats'

export default async function ForumPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
          <p className="text-gray-600">Connect, share, and support each other</p>
        </div>
        <CreatePostButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="space-y-6">
            <ForumNavigation />
            <PostsList />
          </div>
        </div>
        <div>
          <ForumStats />
        </div>
      </div>
    </div>
  )
}
