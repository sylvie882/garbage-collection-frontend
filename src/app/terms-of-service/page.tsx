// src/app/terms-of-service/page.tsx
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-br from-gray-50 to-green-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-lg">
            Effective date: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p>
                By accessing and using Sylvie Garbage Collection&apos;s services, you agree to be bound by these 
                Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, 
                you are prohibited from using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Services Description</h2>
              <p>
                Sylvie Garbage Collection provides waste management and environmental services including but not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Residential and commercial garbage collection</li>
                <li>Recycling services</li>
                <li>Waste disposal and management</li>
                <li>Environmental consulting</li>
                <li>Digital waste management solutions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate and complete information for service delivery</li>
                <li>Maintain safe access to waste collection points</li>
                <li>Comply with waste segregation guidelines</li>
                <li>Make timely payments for services rendered</li>
                <li>Notify us of any changes to service requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Payment Terms</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Fees are due as specified in your service agreement</li>
                <li>Late payments may incur additional charges</li>
                <li>Services may be suspended for non-payment</li>
                <li>Refund policies are outlined in individual service agreements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Cancellation and Termination</h2>
              <p>
                You may cancel services according to the terms outlined in your service agreement. 
                We reserve the right to terminate services for violation of these terms or non-payment.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
              <p>
                Sylvie Garbage Collection shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p>
                All content, trademarks, and data on this website and in our services are the property 
                of Sylvie Garbage Collection and are protected by intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Kenya, 
                without regard to its conflict of law provisions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of 
                significant changes through appropriate channels.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p><strong>Sylvie Garbage Collection</strong></p>
                <p>Email: legal@sylviegarbagecollection.co.ke</p>
                <p>Phone: +254 XXX XXX XXX</p>
                <p>Nairobi, Kenya</p>
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