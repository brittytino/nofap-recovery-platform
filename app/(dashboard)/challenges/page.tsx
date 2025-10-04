import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ChallengeGrid } from './_components/ChallengeGrid'
import { TierProgression } from './_components/TierProgression'
import { DailyChallenge } from './_components/DailyChallenge'
import { ChallengeStats } from './_components/ChallengeStats'

export default async function ChallengesPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Challenges</h1>
          <p className="text-gray-600">Level up through tier-based challenges</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DailyChallenge userId={session!.user.id} />
        </div>
        <div>
          <ChallengeStats userId={session!.user.id} />
        </div>
      </div>

      <TierProgression userId={session!.user.id} />

      <ChallengeGrid userId={session!.user.id} />
    </div>
  )
}
