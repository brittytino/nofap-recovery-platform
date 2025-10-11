import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { MobileMenu } from '@/components/layout/MobileMenu'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors">
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:block" />
      
      {/* Header - responsive with sidebar offset */}
      <Header />
      
      {/* Main Content Area */}
      <main className="lg:ml-70 min-h-screen transition-all duration-300 pb-20 lg:pb-0">
        <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
          <div className="animate-fade-in space-y-6">
            {children}
          </div>
        </div>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <MobileMenu />
    </div>
  )
}
