'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, Globe, ExternalLink } from 'lucide-react'

export function EmergencyContacts() {
  const emergencyContacts = [
    {
      name: 'National Suicide Prevention Lifeline',
      number: '988',
      description: '24/7 crisis support',
      type: 'call',
      urgent: true
    },
    {
      name: 'Crisis Text Line',
      number: '741741',
      description: 'Text HOME for immediate help',
      type: 'text',
      urgent: true
    },
    {
      name: 'SAMHSA National Helpline',
      number: '1-800-662-4357',
      description: 'Mental health and substance abuse',
      type: 'call',
      urgent: false
    },
    {
      name: 'International Association for Suicide Prevention',
      number: null,
      description: 'Global crisis resources',
      type: 'website',
      url: 'https://www.iasp.info/resources/Crisis_Centres/',
      urgent: false
    }
  ]

  const handleContact = (contact: any) => {
    if (contact.type === 'call' && contact.number) {
      window.location.href = `tel:${contact.number}`
    } else if (contact.type === 'text' && contact.number) {
      window.location.href = `sms:${contact.number}`
    } else if (contact.type === 'website' && contact.url) {
      window.open(contact.url, '_blank')
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contacts</h2>
      <p className="text-gray-600 mb-6">
        If you're in crisis or need immediate support, these resources are available 24/7.
      </p>

      <div className="space-y-4">
        {emergencyContacts.map((contact, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg transition-colors ${
              contact.urgent 
                ? 'border-red-200 bg-red-50 hover:bg-red-100' 
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  contact.urgent ? 'text-red-900' : 'text-gray-900'
                }`}>
                  {contact.name}
                </h3>
                <p className={`text-sm ${
                  contact.urgent ? 'text-red-700' : 'text-gray-600'
                } mb-2`}>
                  {contact.description}
                </p>
                {contact.number && (
                  <div className={`flex items-center space-x-1 text-lg font-mono font-bold ${
                    contact.urgent ? 'text-red-800' : 'text-gray-800'
                  }`}>
                    {contact.type === 'call' ? (
                      <Phone className="h-4 w-4" />
                    ) : (
                      <MessageCircle className="h-4 w-4" />
                    )}
                    <span>{contact.number}</span>
                  </div>
                )}
              </div>
              
              <Button
                onClick={() => handleContact(contact)}
                className={`ml-4 ${
                  contact.urgent 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {contact.type === 'call' && <Phone className="h-4 w-4 mr-2" />}
                {contact.type === 'text' && <MessageCircle className="h-4 w-4 mr-2" />}
                {contact.type === 'website' && <ExternalLink className="h-4 w-4 mr-2" />}
                {contact.type === 'call' ? 'Call' : contact.type === 'text' ? 'Text' : 'Visit'}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ If you're in immediate danger:</h4>
        <p className="text-yellow-700 text-sm mb-3">
          Don't hesitate to call emergency services (911 in the US) or go to your nearest emergency room.
        </p>
        <Button 
          onClick={() => window.location.href = 'tel:911'}
          className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
        >
          <Phone className="h-4 w-4 mr-2" />
          Call 911
        </Button>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">🌍 International Users:</h4>
        <p className="text-blue-700 text-sm">
          Crisis hotline numbers vary by country. Visit the International Association for Suicide Prevention 
          website for resources in your region.
        </p>
      </div>
    </Card>
  )
}
