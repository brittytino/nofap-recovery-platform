import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { BadgeCollection } from './_components/BadgeCollection'
import { XPProgress } from './_components/XPProgress'
import { Leaderboard } from './_components/Leaderboard'
import { AchievementStats } from './_components/AchievementStats'

export default async function AchievementsPage() {
  const session = await getServerSession()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <p className="text-gray-600">Track your progress and unlock badges</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BadgeCollection userId={session?.user?.id ?? ''} />
        </div>
        <div className="space-y-6">
          <XPProgress userId={session?.user?.id ?? ''} />
          <AchievementStats userId={session?.user?.id ?? ''} />
        </div>
      </div>

      <Leaderboard userId={session?.user?.id ?? ''} />
    </div>
  )
}
