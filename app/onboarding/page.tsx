'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WelcomeSteps } from './_components/WelcomeSteps'
import { InitialAssessment } from './_components/InitialAssessment'
import { GoalSetting } from './_components/GoalSetting'
import { RelationshipStatusSelector } from './_components/RelationshipStatusSelector'

const STEPS = [
  { id: 'welcome', title: 'Welcome', component: WelcomeSteps },
  { id: 'assessment', title: 'Assessment', component: InitialAssessment },
  { id: 'goals', title: 'Goals', component: GoalSetting },
  { id: 'relationship', title: 'Relationship', component: RelationshipStatusSelector },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState({})
  const router = useRouter()

  const handleNext = (data: any) => {
    setOnboardingData(prev => ({ ...prev, ...data }))
    
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete onboarding
      completeOnboarding({ ...onboardingData, ...data })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = async (data: any) => {
    try {
      const response = await fetch('/api/user/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Onboarding completion error:', error)
    }
  }

  const CurrentStepComponent = STEPS[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-recovery-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 ${
                  index <= currentStep ? 'text-recovery-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-recovery-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-recovery-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current step content */}
        <CurrentStepComponent
          onNext={handleNext}
          onPrevious={currentStep > 0 ? handlePrevious : undefined}
          data={onboardingData}
        />
      </div>
    </div>
  )
}
