export default function PrivacyPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>
  
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
          <p className="mb-6">
            Recovery Platform ("we," "our," or "us") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your 
            information when you use our platform.
          </p>
  
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
          <ul className="mb-6">
            <li>Email address and name for account creation</li>
            <li>Profile information you choose to provide</li>
            <li>Health and wellness data you input</li>
            <li>Community posts and interactions</li>
          </ul>
  
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Automatically Collected Information</h3>
          <ul className="mb-6">
            <li>Usage patterns and app interactions</li>
            <li>Device information and browser type</li>
            <li>IP address and general location</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <ul className="mb-6">
            <li>Provide and maintain our services</li>
            <li>Personalize your experience</li>
            <li>Send important updates and notifications</li>
            <li>Improve our platform and develop new features</li>
            <li>Ensure security and prevent fraud</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Sharing</h2>
          <p className="mb-6">
            We do NOT sell, trade, or otherwise transfer your personal information 
            to third parties. Your recovery journey is private, and we are committed 
            to keeping it that way.
          </p>
  
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
          <p className="mb-6">
            We implement appropriate security measures to protect your personal information:
          </p>
          <ul className="mb-6">
            <li>End-to-end encryption for sensitive data</li>
            <li>Secure server infrastructure</li>
            <li>Regular security audits and updates</li>
            <li>Limited access to personal information</li>
          </ul>
  
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
          <ul className="mb-6">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account and data</li>
            <li>Export your data</li>
            <li>Opt-out of communications</li>
          </ul>
  
          <h2 className="text-2xl font-semibent text-gray-900 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p>
            Email: privacy@recoveryplatform.com<br />
            Address: [Company Address]
          </p>
        </div>
      </div>
    )
  }
  