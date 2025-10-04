import Image from 'next/image'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Auth forms */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
      
      {/* Right side - Motivational content */}
      <div className="hidden lg:flex bg-gradient-to-br from-recovery-500 to-recovery-700 items-center justify-center p-8">
        <div className="text-center text-white max-w-lg">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Start Your Recovery Journey
            </h1>
            <p className="text-xl opacity-90">
              Join thousands who have transformed their lives through our supportive community
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Track Your Progress</h3>
                <p className="opacity-80">Visual streak tracking and milestone celebrations</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💪</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Build Healthy Habits</h3>
                <p className="opacity-80">Gamified challenges and fitness integration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🤝</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold">Community Support</h3>
                <p className="opacity-80">Connect with others on similar journeys</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
