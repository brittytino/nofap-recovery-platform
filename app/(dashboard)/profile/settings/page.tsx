import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NotificationSettings } from './_components/NotificationSettings'
import { PrivacySettings } from './_components/PrivacySettings'
import { AccountSettings } from './_components/AccountSettings'
import { DataExport } from './_components/DataExport'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and privacy settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <AccountSettings userId={session!.user.id} />
          <NotificationSettings userId={session!.user.id} />
        </div>
        <div className="space-y-6">
          <PrivacySettings userId={session!.user.id} />
          <DataExport userId={session!.user.id} />
        </div>
      </div>
    </div>
  )
}
