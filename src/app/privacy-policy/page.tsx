// src/app/privacy-policy/page.tsx
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-gray-50 to-green-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Last updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                Welcome to Sylvie Garbage Collection (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). 
                We are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Name and contact details (email, phone number, address)</li>
                <li>Billing and payment information</li>
                <li>Service preferences and scheduling information</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Technical Information</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>IP address and browser type</li>
                <li>Device information</li>
                <li>Usage data and analytics</li>
                <li>Cookies and tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide and maintain our waste management services</li>
                <li>Process payments and send invoices</li>
                <li>Communicate with you about service updates</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Disclosure</h2>
              <p>
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Third parties with your explicit consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information 
                from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p><strong>Email:</strong> sylviegarbagecollection@gmail.com</p>
                <p><strong>Phone:</strong> +254 711 515 752</p>
                <p><strong>Address:</strong> Nairobi, Kenya</p>
              </div>
            </section>

            <div className="border-t pt-8 mt-8">
              <p className="text-sm text-gray-500">
                This Privacy Policy may be updated from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-green-600 hover:text-green-700 font-medium inline-flex items-center gap-2"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}