import { notFound } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

interface PostPageProps {
  params: {
    category: string
    postId: string
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const session = await getServerSession()
  const { category, postId } = params

  const post = await db.forumPost.findUnique({
    where: { id: postId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  })

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-4 mb-4">
          {post.user.image && (
            <img
              src={post.user.image}
              alt={post.user.name || 'User'}
              className="w-12 h-12 rounded-full"
            />
          )}
          <div>
            <h3 className="font-semibold">{post.user.name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
        <div className="prose max-w-none">
          <p>{post.content}</p>
        </div>

        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
          <span>👍 {post.upvoteCount}</span>
          <span>💬 {post.comments.length} comments</span>
          <span>👁️ {post.viewCount} views</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Comments ({post.comments.length})</h2>
        <div className="space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="border-l-4 border-gray-200 pl-4">
              <div className="flex items-center space-x-3 mb-2">
                {comment.user.image && (
                  <img
                    src={comment.user.image}
                    alt={comment.user.name || 'User'}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-sm">{comment.user.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

