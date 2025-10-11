import { getServerSession } from '@/lib/auth'
import { StreakCounter } from './_components/StreakCounter'
import { HeatmapCalendar } from './_components/HeatmapCalendar'
import { QuickActions } from './_components/QuickActions'
import { ProgressChart } from './_components/ProgressChart'

export default async function DashboardPage() {
  const session = await getServerSession()

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'Warrior'}! 🔥
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 mt-1">
            Build self-control. Reclaim your time. Transform your life.
          </p>
        </div>
      </div>

      {/* HERO STREAK COUNTER - Center of gravity (now uses dynamic data) */}
      <div className="mb-8">
        <StreakCounter />
      </div>

      {/* Main Content Grid - Responsive */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <HeatmapCalendar userId={session?.user?.id ?? ''} />
        </div>
        <div className="space-y-6">
          <QuickActions />
        </div>
      </div>

      {/* Bottom Content Grid - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressChart userId={session?.user?.id ?? ''} />
        <div className="space-y-6">
          {/* Recent achievements or upcoming challenges */}
          <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">
              Recent Achievements
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">🏆</span>
                </div>
                <div>
                  <p className="font-medium text-green-900 dark:text-green-100">Week Warrior</p>
                  <p className="text-xs text-green-700 dark:text-green-300">7 day streak achieved!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
