import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { ProfileHeader } from './_components/ProfileHeader'
import { PersonalStats } from './_components/PersonalStats'
import { ActivityFeed } from './_components/ActivityFeed'
import { QuickSettings } from './_components/QuickSettings'

export default async function ProfilePage() {
  const session = await getServerSession()

  return (
    <div className="space-y-6">
      <ProfileHeader userId={session?.user?.id ?? ''} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PersonalStats userId={session?.user?.id ?? ''} />
          <ActivityFeed userId={session?.user?.id ?? ''} />
        </div>
        <div>
          <QuickSettings userId={session?.user?.id ?? ''} />
        </div>
      </div>
    </div>
  )
}
