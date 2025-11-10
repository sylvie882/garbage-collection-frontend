// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Contact.module.css';

// Structured Data for Local Business
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  'name': 'Contact Sylvie Garbage Collection',
  'description': 'Contact page for Sylvie Garbage Collection - Professional waste management services in Kenya',
  'url': 'https://sylviegarbagecollection.co.ke/contact',
  'mainEntity': {
    '@type': 'Organization',
    'name': 'Sylvie Garbage Collection',
    'description': 'Professional waste management and garbage collection services in Nairobi, Kenya',
    'url': 'https://sylviegarbagecollection.co.ke',
    'telephone': '+254-711-515752',
    'email': 'sylviegarbagecollection@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Dale House, Fox Cl Off Rhapta Rd',
      'addressLocality': 'Westlands',
      'addressRegion': 'Nairobi',
      'addressCountry': 'KE'
    },
    'openingHours': 'Mo-Su 00:00-23:59',
    'areaServed': ['Nairobi', 'Nakuru', 'Narok', 'Laikipia'],
    'serviceType': [
      'Garbage Collection',
      'Waste Disposal',
      'Recycling Services',
      'Pest Control',
      'Cleaning Services'
    ]
  }
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: []
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        if (data.errors) {
          setErrors(data.errors);
        }
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Hidden SEO content for search engines */}
      <div className="sr-only" aria-hidden="true">
        <h1>Contact Sylvie Garbage Collection - Waste Management Services Kenya</h1>
        <h2>Get Free Quote for Garbage Collection Services</h2>
        <p>
          Contact Sylvie Garbage Collection for professional waste management services in Nairobi, Nakuru, Narok, 
          and Laikipia counties. We provide reliable garbage collection, recycling services, pest control, and 
          cleaning solutions for residential and commercial properties across Kenya.
        </p>
        <h3>Service Areas We Cover</h3>
        <p>
          We offer garbage collection and waste management services throughout Nairobi County including Karen, 
          Runda, Westlands, Kilimani, Lavington, and surrounding areas. Our services also extend to Nakuru County, 
          Narok County, and Laikipia County with reliable weekly and monthly collection schedules.
        </p>
        <h4>Why Contact Sylvie Garbage Collection?</h4>
        <ul>
          <li>Free quotes and waste management assessments</li>
          <li>24/7 customer support and emergency services</li>
          <li>Experienced and qualified waste management team</li>
          <li>100% recycling commitment and eco-friendly solutions</li>
          <li>Affordable pricing with flexible service plans</li>
          <li>Same-day service available in most areas</li>
        </ul>
        <p>
          Located at Dale House, Fox Close Off Rhapta Road in Westlands Nairobi, we are easily accessible 
          for clients across Kenya. Call us at +254 711 515 752 or email sylviegarbagecollection@gmail.com 
          for immediate assistance with your waste management needs.
        </p>
      </div>

      <Header />
      
      {/* Breadcrumb */}
      <section className={styles.breadcrumb}>
        <div className={styles.container}>
          <nav aria-label="Breadcrumb">
            <ol className={styles.breadcrumbList}>
              <li><a href="/">Home</a></li>
              <li aria-current="page">Contact Us</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <h1>Contact Sylvie Garbage Collection</h1>
            <p className={styles.pageSubtitle}>
              Get Professional Waste Management Solutions Across Kenya. Contact us for free quotes, 
              service inquiries, or emergency garbage collection in Nairobi, Nakuru, Narok, and Laikipia.
            </p>
          </div>

          <div className={styles.contactGrid}>
            {/* Contact Information */}
            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <h2>Contact Information</h2>
                <p className={styles.infoDescription}>
                  Get in touch with Kenya's leading waste management company. We serve residential and 
                  commercial clients across multiple counties with reliable garbage collection and 
                  recycling services.
                </p>
                
                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className={styles.contactText}>
                      <h3>Our Location</h3>
                      <p>Dale House, Fox Cl Off Rhapta Rd</p>
                      <p>Westlands-Nairobi, Kenya</p>
                      <p className={styles.serviceNote}>Serving Nairobi, Nakuru, Narok & Laikipia</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className={styles.contactText}>
                      <h3>Phone Number</h3>
                      <p>(+254) 711515752</p>
                      <p>24/7 Emergency Services Available</p>
                      <p className={styles.serviceNote}>Call for immediate waste collection</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className={styles.contactText}>
                      <h3>Email Address</h3>
                      <p>sylviegarbagecollection@gmail.com</p>
                      <p>Quick response within 2 hours</p>
                      <p className={styles.serviceNote}>Ideal for quotes and detailed inquiries</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className={styles.contactText}>
                      <h3>Business Hours</h3>
                      <p>Monday - Sunday: 24/7 Operations</p>
                      <p>Emergency Services: Always Available</p>
                      <p className={styles.serviceNote}>Same-day service in most areas</p>
                    </div>
                  </div>
                </div>

                {/* Service Coverage Badges */}
                <div className={styles.coverageSection}>
                  <h4>Service Coverage Areas</h4>
                  <div className={styles.coverageBadges}>
                    <span className={styles.coverageBadge}>Nairobi County</span>
                    <span className={styles.coverageBadge}>Nakuru County</span>
                    <span className={styles.coverageBadge}>Narok County</span>
                    <span className={styles.coverageBadge}>Laikipia County</span>
                  </div>
                </div>
              </div>

              {/* Services Overview */}
              <div className={styles.servicesCard}>
                <h3>Our Waste Management Services</h3>
                <p className={styles.servicesDescription}>
                  Comprehensive solutions for residential, commercial, and industrial clients across Kenya
                </p>
                <div className={styles.servicesList}>
                  <div className={styles.serviceItem}>
                    <i className="fas fa-trash"></i>
                    <div>
                      <span>Garbage Collection & Waste Disposal</span>
                      <small>Regular pickup & eco-friendly disposal</small>
                    </div>
                  </div>
                  <div className={styles.serviceItem}>
                    <i className="fas fa-broom"></i>
                    <div>
                      <span>Cleaning & Washroom Consumables</span>
                      <small>Professional cleaning supplies & services</small>
                    </div>
                  </div>
                  <div className={styles.serviceItem}>
                    <i className="fas fa-bug"></i>
                    <div>
                      <span>Pest Control Services</span>
                      <small>Effective pest elimination & prevention</small>
                    </div>
                  </div>
                  <div className={styles.serviceItem}>
                    <i className="fas fa-building"></i>
                    <div>
                      <span>Commercial & Residential Solutions</span>
                      <small>Tailored services for all property types</small>
                    </div>
                  </div>
                  <div className={styles.serviceItem}>
                    <i className="fas fa-recycle"></i>
                    <div>
                      <span>Recycling Programs</span>
                      <small>100% recycling commitment</small>
                    </div>
                  </div>
                  <div className={styles.serviceItem}>
                    <i className="fas fa-truck"></i>
                    <div>
                      <span>Bulk Waste Removal</span>
                      <small>Large item & construction waste disposal</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Action Cards */}
              <div className={styles.quickActions}>
                <div className={styles.quickAction}>
                  <i className="fas fa-calendar-check"></i>
                  <div>
                    <h4>Schedule Pickup</h4>
                    <p>Book regular garbage collection service</p>
                  </div>
                </div>
                <div className={styles.quickAction}>
                  <i className="fas fa-file-invoice-dollar"></i>
                  <div>
                    <h4>Get Free Quote</h4>
                    <p>No obligation pricing for your needs</p>
                  </div>
                </div>
                <div className={styles.quickAction}>
                  <i className="fas fa-exclamation-triangle"></i>
                  <div>
                    <h4>Emergency Service</h4>
                    <p>Urgent waste removal when you need it</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contactForm}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h2>Get Your Free Waste Management Quote</h2>
                  <p>
                    Fill out the form below and our waste management experts will provide you with a 
                    customized solution and pricing for your specific needs.
                  </p>
                </div>

                {submitStatus === 'success' && (
                  <div className={`${styles.alert} ${styles.success}`}>
                    <div className={styles.alertIcon}>
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className={styles.alertContent}>
                      <h4>Message Sent Successfully!</h4>
                      <p>
                        Thank you for contacting Sylvie Garbage Collection. Our waste management expert 
                        will contact you within 2 hours to discuss your requirements and provide a free quote.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className={`${styles.alert} ${styles.error}`}>
                    <div className={styles.alertIcon}>
                      <i className="fas fa-exclamation-triangle"></i>
                    </div>
                    <div className={styles.alertContent}>
                      <h4>Submission Error</h4>
                      <p>
                        There was an error sending your message. Please try again or contact us directly 
                        at <strong>+254 711 515 752</strong> for immediate assistance.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.formLabel}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && <span className={styles.fieldError}>{errors.name[0]}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.formLabel}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && <span className={styles.fieldError}>{errors.email[0]}</span>}
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.formLabel}>
                      Service Needed *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`${styles.formInput} ${errors.subject ? styles.inputError : ''}`}
                      placeholder="e.g., Residential Garbage Collection, Commercial Waste Management"
                    />
                    {errors.subject && <span className={styles.fieldError}>{errors.subject[0]}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.formLabel}>
                      Service Details & Location
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={styles.formTextarea}
                      placeholder="Please include: Your location/area, Type of waste, Frequency needed, Property type (residential/commercial), Any specific requirements..."
                    ></textarea>
                    {errors.message && <span className={styles.fieldError}>{errors.message[0]}</span>}
                  </div>

                  <div className={styles.formNote}>
                    <i className="fas fa-info-circle"></i>
                    <span>
                      <strong>Quick Response Guarantee:</strong> We respond to all inquiries within 2 hours 
                      during business hours. Emergency services available 24/7.
                    </span>
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Sending Your Quote Request...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Get Free Quote Now
                      </>
                    )}
                  </button>

                  <div className={styles.alternativeContact}>
                    <p>
                      <strong>Prefer to call?</strong> Speak directly with our waste management experts:
                    </p>
                    <a href="tel:+254711515752" className={styles.phoneLink}>
                      <i className="fas fa-phone"></i>
                      +254 711 515 752
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}