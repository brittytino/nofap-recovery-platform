import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Users, Shield, Target } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Recovery Platform
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive platform dedicated to supporting individuals on their journey 
            to better health, personal growth, and recovery through community, tracking, and evidence-based techniques.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Health First</h3>
            <p className="text-gray-600 text-sm">
              Prioritizing mental and physical wellness through comprehensive tracking and support
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-gray-600 text-sm">
              Building supportive connections while maintaining privacy and safety
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Safe Space</h3>
            <p className="text-gray-600 text-sm">
              Creating a judgment-free environment for growth and recovery
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Goal Focused</h3>
            <p className="text-gray-600 text-sm">
              Helping users achieve their personal goals through structured challenges
            </p>
          </Card>
        </div>

        <div className="prose max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Recovery Platform was created to provide a comprehensive, supportive environment 
            for individuals seeking to improve their lives and overcome challenges. We believe 
            that recovery is a journey that requires multiple tools, community support, and 
            personal commitment.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Progress Tracking</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Visual streak counters and heat maps</li>
                <li>• Mood and energy level monitoring</li>
                <li>• Milestone celebrations and badges</li>
                <li>• Comprehensive analytics dashboard</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Support</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Anonymous forum discussions</li>
                <li>• Success story sharing</li>
                <li>• Peer encouragement system</li>
                <li>• Moderated safe environment</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Gamification</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Tier-based challenge system</li>
                <li>• Achievement unlocking</li>
                <li>• XP points and level progression</li>
                <li>• Leaderboards and competition</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Crisis Support</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Immediate coping strategies</li>
                <li>• Breathing exercises and meditation</li>
                <li>• Emergency resource contacts</li>
                <li>• Real-time support access</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy & Safety</h2>
          <p className="text-gray-600 mb-6">
            We take privacy seriously. All community interactions are anonymous, 
            your personal data is encrypted, and we never share information with 
            third parties. Our platform is designed to be a safe space where you 
            can focus on your recovery without judgment or privacy concerns.
          </p>

          <div className="text-center pt-8">
            <Link href="/register">
              <Button size="lg" className="bg-recovery-500 hover:bg-recovery-600">
                Start Your Journey Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
