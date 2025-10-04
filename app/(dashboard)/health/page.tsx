import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { HealthTracker } from './_components/HealthTracker'
import { MoodChart } from './_components/MoodChart'
import { EnergyChart } from './_components/EnergyChart'
import { HealthInsights } from './_components/HealthInsights'
import { FitnessTracker } from './_components/FitnessTracker'

export default async function HealthPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Health & Wellness</h1>
          <p className="text-gray-600">Track your physical and mental health progress</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HealthTracker userId={session!.user.id} />
        </div>
        <div>
          <HealthInsights userId={session!.user.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoodChart userId={session!.user.id} />
        <EnergyChart userId={session!.user.id} />
      </div>

      <FitnessTracker userId={session!.user.id} />
    </div>
  )
}
