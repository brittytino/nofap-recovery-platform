import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { getUserStats } from '@/services/database/user'
import { DashboardStats } from './_components/DashboardStats'
import { StreakCounter } from './_components/StreakCounter'
import { HeatmapCalendar } from './_components/HeatmapCalendar'
import { DailyMotivation } from './_components/DailyMotivation'
import { QuickActions } from './_components/QuickActions'
import { ProgressChart } from './_components/ProgressChart'

export default async function DashboardPage() {
  const session = await getServerSession()
  const userStats = await getUserStats(session?.user?.id ?? '')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Friend'}!
          </h1>
          <p className="text-gray-600">
            Keep building those healthy digital habits
          </p>
        </div>
        <DailyMotivation relationshipStatus={userStats.relationshipStatus} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StreakCounter
          currentStreak={userStats.currentStreak}
          longestStreak={userStats.longestStreak}
          streakStart={userStats.streakStartDate}
        />
        <DashboardStats stats={userStats} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <HeatmapCalendar userId={session?.user?.id ?? ''} />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart userId={session?.user?.id ?? ''} />
        <div className="space-y-4">
          {/* Recent achievements or upcoming challenges */}
        </div>
      </div>
    </div>
  )
}
