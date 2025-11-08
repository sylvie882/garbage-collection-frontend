// src/app/cookie-policy/page.tsx
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-gray-50 to-green-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Cookie Policy
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
              <h2 className="text-2xl font-bold mb-4">1. What Are Cookies</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and 
                understanding how you use our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. How We Use Cookies</h2>
              
              <h3 className="text-xl font-semibold mb-3">Essential Cookies</h3>
              <p className="mb-4">
                These cookies are necessary for the website to function properly and cannot be switched off.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>User authentication and session management</li>
                <li>Security and fraud prevention</li>
                <li>Load balancing and performance</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Analytics Cookies</h3>
              <p className="mb-4">
                These cookies help us understand how visitors interact with our website.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Visitor counting and traffic analysis</li>
                <li>Page performance monitoring</li>
                <li>User behavior analysis</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">Functional Cookies</h3>
              <p className="mb-4">
                These cookies enable enhanced functionality and personalization.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Language preferences</li>
                <li>Region-specific settings</li>
                <li>Cookie consent management</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. Third-Party Cookies</h2>
              <p>
                We may use services from third parties that set their own cookies. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Google Analytics for website analytics</li>
                <li>Payment processors for secure transactions</li>
                <li>Social media platforms for sharing functionality</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Managing Cookies</h2>
              <p>
                You can control and/or delete cookies as you wish. You can delete all cookies that are 
                already on your computer and you can set most browsers to prevent them from being placed. 
                However, if you do this, you may have to manually adjust some preferences every time you 
                visit a site and some services and functionalities may not work.
              </p>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Browser Settings:</h3>
                <ul className="list-disc list-inside space-y-1 text-green-700">
                  <li>Google Chrome: Settings → Privacy and Security → Cookies</li>
                  <li>Mozilla Firefox: Preferences → Privacy & Security → Cookies</li>
                  <li>Safari: Preferences → Privacy → Cookies and website data</li>
                  <li>Microsoft Edge: Settings → Privacy, search, and services → Cookies</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Your Choices</h2>
              <p>
                When you first visit our website, you will be presented with a cookie consent banner 
                where you can:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Accept all cookies</li>
                <li>Decline non-essential cookies</li>
                <li>Customize your cookie preferences</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time. We will notify you of any changes 
                by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p><strong>Email:</strong> privacy@sylviegarbagecollection.co.ke</p>
                <p><strong>Phone:</strong> +254 XXX XXX XXX</p>
                <p><strong>Address:</strong> Nairobi, Kenya</p>
              </div>
            </section>
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