import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { StreakHistory } from './_components/StreakHistory'
import { MilestoneAchievements } from './_components/MilestoneAchievements'
import { ShareStreak } from './_components/ShareStreak'
import { StreakInsights } from './_components/StreakInsights'
import { StreakResetModal } from './_components/StreakResetModal'

export default async function StreakPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Streak Tracker</h1>
          <p className="text-gray-600">Monitor your progress and celebrate milestones</p>
        </div>
        <div className="flex items-center space-x-3">
          <ShareStreak userId={session!.user.id} />
          <StreakResetModal userId={session!.user.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StreakHistory userId={session!.user.id} />
        </div>
        <div className="space-y-6">
          <StreakInsights userId={session!.user.id} />
          <MilestoneAchievements userId={session!.user.id} />
        </div>
      </div>
    </div>
  )
}
