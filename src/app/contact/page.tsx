// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './Contact.module.css';

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
            <h1>Get In Touch</h1>
            <p>We're here to help with all your waste management needs. Reach out to us for quotes, inquiries, or any questions.</p>
          </div>

          <div className={styles.contactGrid}>
            {/* Contact Information */}
            <div className={styles.contactInfo}>
              <div className={styles.infoCard}>
                <h2>Contact Information</h2>
                <p className={styles.infoDescription}>
                  Feel free to reach out to us through any of the following channels. We're always ready to assist you.
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
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className={styles.contactText}>
                      <h3>Phone Number</h3>
                      <p>(+254) 711515752</p>
                      <p>Mon-Mon: 24 Hours</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className={styles.contactText}>
                      <h3>Email Address</h3>
                      <p>sylviegarbagecollection@gmail.com</p>
                      <p>We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className={styles.contactText}>
                      <h3>Business Hours</h3>
                      <p>Monday - Monday: 24 Hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Overview */}
              <div className={styles.servicesCard}>
                <h3>Our Services</h3>
                <div className={styles.servicesList}>
                  <div className={styles.serviceItem}>
                    <i className="fas fa-trash"></i>
                    <span>Garbage Collection & Waste Disposal</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <i className="fas fa-broom"></i>
                    <span>Cleaning & Washroom Consumables</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <i className="fas fa-bug"></i>
                    <span>Pest Control Services</span>
                  </div>
                  <div className={styles.serviceItem}>
                    <i className="fas fa-building"></i>
                    <span>Commercial & Residential Solutions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contactForm}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h2>Send Us a Message</h2>
                  <p>Fill out the form below and our team will get back to you promptly.</p>
                </div>

                {submitStatus === 'success' && (
                  <div className={`${styles.alert} ${styles.success}`}>
                    <div className={styles.alertIcon}>
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <div className={styles.alertContent}>
                      <h4>Message Sent Successfully!</h4>
                      <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
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
                      <p>There was an error sending your message. Please try again or contact us directly.</p>
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
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`${styles.formInput} ${errors.subject ? styles.inputError : ''}`}
                      placeholder="e.g., Request for Quote, Service Inquiry"
                    />
                    {errors.subject && <span className={styles.fieldError}>{errors.subject[0]}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.formLabel}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className={styles.formTextarea}
                      placeholder="Tell us more about your requirements, location, and any specific needs you have..."
                    ></textarea>
                    {errors.message && <span className={styles.fieldError}>{errors.message[0]}</span>}
                  </div>

                  <button 
                    type="submit" 
                    className={styles.submitButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i>
                        Send Message
                      </>
                    )}
                  </button>
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