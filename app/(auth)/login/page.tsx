import { Metadata } from 'next'
import Link from 'next/link'
import { LoginForm } from './_components/LoginForm'

export const metadata: Metadata = {
  title: 'Login - Recovery Platform',
  description: 'Sign in to your recovery account',
}

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Continue your recovery journey</p>
      </div>
      
      <LoginForm />
      
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            href="/register" 
            className="text-recovery-600 hover:text-recovery-700 font-medium"
          >
            Sign up here
          </Link>
        </p>
      </div>
      
      <div className="text-center">
        <Link 
          href="/forgot-password" 
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Forgot your password?
        </Link>
      </div>
    </div>
  )
}
