'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Target, 
  Users, 
  Trophy, 
  Heart, 
  Zap, 
  Shield,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  MessageCircle
} from 'lucide-react'

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState('features')

  const features = [
    {
      icon: Target,
      title: 'Streak Tracking',
      description: 'Visual progress tracking with milestone celebrations and heat map calendar',
      color: 'text-green-600 bg-green-50'
    },
    {
      icon: Trophy,
      title: 'Gamified Challenges',
      description: 'Tier-based challenges and achievement system to keep you motivated',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      icon: Heart,
      title: 'Health Monitoring',
      description: 'Track mood, energy levels, and overall wellness improvements',
      color: 'text-red-600 bg-red-50'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with others on similar journeys through public forums',
      color: 'text-blue-600 bg-blue-50'
    },
    {
      icon: Zap,
      title: 'Smart Motivation',
      description: 'Personalized daily motivations based on your relationship status',
      color: 'text-purple-600 bg-purple-50'
    },
    {
      icon: Shield,
      title: 'Crisis Support',
      description: 'Immediate access to coping strategies and emergency resources',
      color: 'text-orange-600 bg-orange-50'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '2.5M+', label: 'Days Recovered' },
    { number: '89%', label: 'Success Rate' },
    { number: '24/7', label: 'Support Available' }
  ]

  const testimonials = [
    {
      name: 'Alex M.',
      streak: 180,
      text: 'The gamification aspect made all the difference. Seeing my progress visually kept me motivated every day.'
    },
    {
      name: 'Sarah K.',
      streak: 365,
      text: 'The community support helped me through the toughest moments. I\'m now helping others on their journey.'
    },
    {
      name: 'Mike R.',
      streak: 90,
      text: 'The daily motivations based on my relationship status were incredibly personalized and helpful.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-recovery-500 to-recovery-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">Recovery Platform</span>
                <span className="text-xs text-gray-500">Your Journey to Better Health</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-recovery-500 hover:bg-recovery-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Start Your
            <span className="bg-gradient-to-r from-recovery-500 to-recovery-600 bg-clip-text text-transparent">
              {' '}Recovery Journey
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join thousands who have transformed their lives through our comprehensive platform 
            for personal recovery, streak tracking, and community support.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link href="/register">
              <Button size="lg" className="bg-recovery-500 hover:bg-recovery-600 text-lg px-8 py-3">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-recovery-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines proven recovery techniques with modern technology 
              to support your journey every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to start your recovery journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-recovery-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-recovery-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Account</h3>
              <p className="text-gray-600">
                Sign up and complete your personalized profile to get started
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-recovery-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-recovery-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Goals</h3>
              <p className="text-gray-600">
                Define your recovery goals and choose challenges that motivate you
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-recovery-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-recovery-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your streaks, mood, and celebrate achievements along the way
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real people, real transformations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified User</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-recovery-600">{testimonial.streak}</p>
                    <p className="text-xs text-gray-500">Day Streak</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-recovery-500 to-recovery-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-recovery-100 mb-8">
            Join thousands of people who have already transformed their lives. 
            Your recovery starts today.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Get Started Now - It's Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-recovery-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">R</span>
                </div>
                <span className="font-semibold">Recovery Platform</span>
              </div>
              <p className="text-gray-400 text-sm">
                Supporting your journey to better health and personal growth.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/testimonials" className="hover:text-white">Testimonials</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/crisis" className="hover:text-white">Crisis Support</Link></li>
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Recovery Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
