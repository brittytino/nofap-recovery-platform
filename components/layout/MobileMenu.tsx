'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet'
import { Navigation } from './Navigation'
import { Menu, LogOut, Settings } from 'lucide-react'

export function MobileMenu() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = () => {
    setIsOpen(false)
    signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-recovery-500 to-recovery-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span>Recovery Platform</span>
          </SheetTitle>
        </SheetHeader>

        <div className="py-6">
          {/* User Profile */}
          <div className="flex items-center space-x-3 mb-6 p-3 bg-gray-50 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={session?.user?.image || ''} />
              <AvatarFallback>
                {session?.user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">
                {session?.user?.name || 'User'}
              </p>
              <p className="text-sm text-gray-600 truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mb-6">
            <Navigation />
          </div>

          {/* Actions */}
          <div className="space-y-2 border-t pt-4">
            <Link 
              href="/profile/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-3 w-full p-2 text-left text-gray-700 hover:bg-gray-50 rounded-md"
            >
              <Settings className="h-5 w-5 text-gray-400" />
              <span>Settings</span>
            </Link>
            
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="flex items-center space-x-3 w-full justify-start p-2 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
