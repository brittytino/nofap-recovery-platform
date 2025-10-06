import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { name: 'About', href: '/about' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Contact', href: '/contact' },
  ]

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com', icon: '𝕏' },
    { name: 'Discord', href: 'https://discord.com', icon: '💬' },
    { name: 'GitHub', href: 'https://github.com', icon: '⚡' },
  ]

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-recovery-500 to-recovery-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Recovery Platform</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Supporting your journey to better health, personal growth, and recovery 
              through community, tracking, and evidence-based techniques.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-recovery-500 transition-colors"
                  title={link.name}
                >
                  <span className="text-lg">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/crisis" className="text-sm text-gray-600 hover:text-recovery-600">
                  Crisis Support
                </Link>
              </li>
              <li>
                <Link href="/forum" className="text-sm text-gray-600 hover:text-recovery-600">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-sm text-gray-600 hover:text-recovery-600">
                  Help Center
                </Link>
              </li>
              <li>
                <a 
                  href="tel:988" 
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Crisis Hotline: 988
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-gray-600 hover:text-recovery-600"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {currentYear} Recovery Platform. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2 md:mt-0">
              This platform provides support and information. For medical concerns, 
              consult healthcare professionals.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
