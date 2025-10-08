export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
      <div className="prose max-w-none">
        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using this recovery platform, you accept and agree to be bound by the terms and provision of this agreement.</p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">2. Use License</h2>
        <p>Permission is granted to temporarily use this platform for personal, non-commercial recovery purposes.</p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">3. Privacy</h2>
        <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.</p>
      </div>
    </div>
  )
}

