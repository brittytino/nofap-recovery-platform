import { Metadata } from 'next'
import Link from 'next/link'
import { RegisterForm } from './_components/RegisterForm'

export const metadata: Metadata = {
  title: 'Register - Recovery Platform',
  description: 'Create your recovery account',
}

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Start Your Journey</h1>
        <p className="text-gray-600 mt-2">Create your recovery account today</p>
      </div>
      
      <RegisterForm />
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="text-recovery-600 hover:text-recovery-700 font-medium"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  )
}
