import { notFound } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'

interface CategoryPageProps {
  params: {
    category: string
  }
}

const CATEGORIES = {
  'general': 'General Discussion',
  'success': 'Success Stories',
  'challenges': 'Challenges',
  'support': 'Support',
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const session = await getServerSession()
  const { category } = params

  if (!CATEGORIES[category as keyof typeof CATEGORIES]) {
    notFound()
  }

  const posts = await db.forumPost.findMany({
    where: { category: category.toUpperCase() as any },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 20,
  })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/forum" className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block">
            ← Back to Forum
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {CATEGORIES[category as keyof typeof CATEGORIES]}
          </h1>
        </div>
        {session && (
          <Link
            href="/forum/new"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            New Post
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">No posts yet in this category</p>
            {session && (
              <Link
                href="/forum/new"
                className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Be the first to post
              </Link>
            )}
          </div>
        ) : (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/forum/${category}/${post.id}`}
              className="block bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-2 mb-4">
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      {post.user.image && (
                        <img
                          src={post.user.image}
                          alt={post.user.name || 'User'}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <span>{post.user.name}</span>
                    </div>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>💬 {post._count.comments}</span>
                    <span>•</span>
                    <span>👍 {post.upvoteCount}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

