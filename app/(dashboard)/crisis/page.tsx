import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SOSButton } from './_components/SOSButton'
import { CopingStrategies } from './_components/CopingStrategies'
import { BreathingExercise } from './_components/BreathingExercise'
import { EmergencyContacts } from './_components/EmergencyContacts'
import { UrgeLogger } from './_components/UrgeLogger'

export default async function CrisisPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Crisis Support</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          You're not alone. We're here to help you through difficult moments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SOSButton />
        <UrgeLogger userId={session!.user.id} />
      </div>

      <BreathingExercise />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CopingStrategies />
        <EmergencyContacts />
      </div>
    </div>
  )
}
