import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/auth'
import { authOptions } from '@/lib/auth'
import LandingPage from '@/components/landing/LandingPage'

export default async function HomePage() {
  const session = await getServerSession()
  
  if (session) {
    redirect('/dashboard')
  }

  return <LandingPage />
}
