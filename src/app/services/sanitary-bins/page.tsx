'use client';
// app/services/sanitary-bins/page.tsx

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SanitaryBinQuoteForm from '@/components/SanitaryBinQuoteForm';

// ── SEO Metadata ──────────────────────────────────────────────────────────────
const countyList =
  "Nairobi, Mombasa, Kisumu, Nakuru, Uasin Gishu, Kiambu, Machakos, Kajiado, Murang'a, Nyeri, Meru, Embu, Kirinyaga, Laikipia, Nyandarua, Tharaka-Nithi, Kitui, Makueni, Garissa, Wajir, Mandera, Marsabit, Isiolo, Samburu, Turkana, West Pokot, Elgeyo-Marakwet, Nandi, Baringo, Kakamega, Vihiga, Bungoma, Busia, Siaya, Homa Bay, Migori, Kisii, Nyamira, Bomet, Kericho, Narok, Trans Nzoia, Taita-Taveta, Kwale, Kilifi, Lamu, Tana River";

const metadata = {
  title: 'Sanitary Bin Services in Kenya | Pedal & Automatic Bins Rental',
  description: `Professional sanitary bin rental and servicing across all 47 counties in Kenya including ${countyList}. Pedal and automatic bins with weekly/bi-weekly/monthly servicing. Disposal certificates provided.`,
  keywords: `sanitary bin services Kenya, sanitary bin rental, feminine hygiene bins, washroom servicing Nairobi, pedal bins, automatic sanitary bins, ${countyList}`,
  openGraph: {
    title: 'Sanitary Bin Services in Kenya | Pedal & Automatic Bins Rental',
    description: 'Professional sanitary bin rental and servicing across all 47 counties in Kenya. Disposal certificates provided.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanitary Bin Services in Kenya | Pedal & Automatic Bins Rental',
    description: 'Professional sanitary bin rental and servicing across all 47 counties in Kenya.',
  },
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const Check = ({ cls = "w-5 h-5" }: { cls?: string }) => (
  <svg className={`${cls} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);


// ── FAQ Accordion (inline client component) ───────────────────────────────────
const faqItems = [
  {
    q: 'How many bins do I need?',
    a: 'Typically one bin per female washroom cubicle. High-traffic sites such as hospitals or malls may require larger capacity bins or more frequent servicing schedules. We advise on this during your free site assessment.',
  },
  {
    q: 'Do you provide disposal certificates?',
    a: 'Yes. We issue official waste transfer notes and disposal certificates after every service cycle — essential for regulatory compliance, environmental audits, and internal reporting.',
  },
  {
    q: 'How often do you service the bins?',
    a: 'We offer weekly, bi-weekly, or monthly servicing. We will recommend the best schedule based on your site footfall, industry type, and washroom usage patterns.',
  },
  {
    q: 'What areas do you cover?',
    a: 'We cover all 47 counties across Kenya — from Nairobi, Mombasa, and Kisumu to remote locations like Marsabit, Turkana, and Mandera. No location is too far.',
  },
  {
    q: 'Are the bins discreet and odour-free?',
    a: 'Absolutely. All bins are fitted with antimicrobial liners and deodorising cartridges that neutralise odours and inhibit bacterial growth between service visits.',
  },
  {
    q: 'What is the difference between pedal and automatic bins?',
    a: 'Pedal bins use a foot-operated lever — hands-free and cost-effective, ideal for most sites. Automatic bins have a sensor-activated lid — fully contactless with a premium finish, ideal for high-end washroom environments.',
  },
  {
    q: 'Are there contracts or lock-in periods?',
    a: 'No long-term lock-in contracts. We offer flexible month-to-month agreements as well as discounted annual plans. You can scale up or down at any time.',
  },
  {
    q: 'Can you handle multi-branch organisations?',
    a: 'Yes. We specialise in national rollouts for corporates, NGOs, and retail chains — with centralised billing, unified SLA reporting, and a dedicated account manager.',
  },
];

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-700 text-base">
            Can&apos;t find what you&apos;re looking for?{' '}
            <Link href="/contact" className="text-green-600 font-semibold hover:underline">
              Contact our team.
            </Link>
          </p>
        </div>

        {/* Accordion */}
        <div className="divide-y divide-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {faqItems.map(({ q, a }, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={q} className="bg-white">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-gray-900 pr-4">{q}</span>
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-green-600' : 'bg-gray-100'}`}>
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'rotate-0 text-gray-500'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Answer panel */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-5 pt-0">
                    <div className="h-px bg-gray-100 mb-4" />
                    <p className="text-gray-700 text-base leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-white border border-green-200 rounded-2xl px-7 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <p className="text-gray-900 font-bold text-base">Still have questions?</p>
            <p className="text-gray-600 text-base">Monday – Saturday, 8am – 6pm.</p>
          </div>
          <div className="flex gap-3">
            <a
              href="tel:0711515752"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition-colors text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-green-600 text-green-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-colors text-base"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Us
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default function SanitaryBinsPage() {

  const trustStats = [
    { value: '47', label: 'Counties Served' },
    { value: '500+', label: 'Active Clients' },
    { value: '24hr', label: 'Response Time' },
    { value: '100%', label: 'Certified Disposal' },
  ];

  const whyUs = [
    {
      title: 'Nationwide Reach',
      desc: 'Reliable servicing in Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and every county.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Two Bin Options',
      desc: 'Sensor-activated automatic or hands-free pedal bins to fit any budget.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      title: 'Flexible Schedules',
      desc: 'Weekly, bi-weekly, or monthly servicing tailored to your foot traffic.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Certified Disposal',
      desc: 'Waste transfer notes and disposal certificates issued after every service.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Odour-Free Guarantee',
      desc: 'Antimicrobial liners and deodorising cartridges keep washrooms fresh.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
    },
    {
      title: 'Transparent Pricing',
      desc: 'Simple rental + service fee. No hidden charges. Volume discounts for 10+ bins.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const steps = [
    {
      n: '01', title: 'Site Assessment',
      desc: 'We assess your washroom layout, foot traffic, and recommend the right bin and schedule.',
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    },
    {
      n: '02', title: 'Delivery & Install',
      desc: 'Bins delivered and installed discreetly in every cubicle, nationwide.',
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
    },
    {
      n: '03', title: 'Scheduled Servicing',
      desc: 'Our trained team replaces liners, cleans bins, and removes waste on your schedule.',
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      n: '04', title: 'Certification & Support',
      desc: 'Disposal certificates issued after every visit. Ongoing support and rapid call-outs.',
      icon: <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    },
  ];

  const industries = [
    { name: 'Offices & Corporate', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
    { name: 'Schools & Universities', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg> },
    { name: 'Hospitals & Clinics', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16M3 21h18M9 21v-4a2 2 0 012-2h2a2 2 0 012 2v4M12 7v6m-3-3h6" /></svg> },
    { name: 'Hotels & Malls', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
    { name: 'Manufacturing', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
    { name: 'Government & NGOs', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg> },
    { name: 'Gyms & Co-Working', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h4V4m12 4h-4V4M4 16h4v4m12-4h-4v4M2 12h20" /></svg> },
    { name: 'Events & Temp Sites', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  ];

  const additionalServices = [
    { name: 'Air Fresheners & Dispensers', bg: 'bg-blue-600', icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
    { name: 'Soap & Sanitiser Dispensers', bg: 'bg-teal-600', icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg> },
    { name: 'Paper Towel & Tissue Supply', bg: 'bg-amber-600', icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> },
    { name: 'Nappy / Diaper Bins', bg: 'bg-pink-600', icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="7" r="3" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 13h8M9 13v6M15 13v6M9 19h6" /></svg> },
    { name: 'Sharps & Clinical Waste', bg: 'bg-red-600', icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { name: 'Deep Cleaning & Disinfection', bg: 'bg-emerald-600', icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
  ];

  const faqs = [
    { q: 'How many bins do I need?', a: 'Typically one bin per female washroom cubicle. High-traffic sites may need larger capacity or more frequent servicing.' },
    { q: 'Do you provide disposal certificates?', a: 'Yes — we issue waste transfer notes and disposal certificates after each service cycle.' },
    { q: 'How often do you service?', a: "Weekly, bi-weekly, or monthly. We'll recommend the right schedule based on footfall and industry." },
    { q: 'What areas do you cover?', a: 'All 47 counties in Kenya, including remote locations.' },
    { q: 'Are the bins discreet and odour-free?', a: 'Yes. Antimicrobial liners and deodorising cartridges control odours and bacteria between visits.' },
    { q: 'Can you handle multi-branch organisations?', a: 'Absolutely — we manage national rollouts, central billing, and SLA reporting for large clients.' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />

      {/* ════════════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-green-800 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div>
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 bg-green-700 border border-green-500 rounded-full px-4 py-1.5 mb-6">
                <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-green-200 text-sm font-medium">Serving All 47 Counties in Kenya</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-5">
                Professional<br />
                Sanitary Bin<br />
                <span className="text-green-300">Services</span>
              </h1>

              <p className="text-green-100 text-lg leading-relaxed mb-8">
                Pedal and automatic sanitary bin rental &amp; servicing for offices, schools, hospitals,
                hotels, factories and SMEs — on-time, discreet, and fully certified.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="#quote-form"
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Get a Free Quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-green-800 font-bold px-8 py-4 rounded-xl transition-colors shadow-lg text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Request Site Survey
                </Link>
              </div>

              {/* Contact line */}
              <div className="flex flex-wrap gap-5">
                <span className="flex items-center gap-2 text-green-200 font-medium">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  0711 515 752
                </span>
                <span className="flex items-center gap-2 text-green-200 font-medium">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  sylviegarbagecollection@gmail.com
                </span>
              </div>
            </div>

            <div className="relative rounded-2xl  overflow-hidden h-80 lg:h-96 shadow-2xl">
            
              <Image
                src="/images/prof.png"
                alt="Sanitary bin service technician Kenya"
                fill
                className="object-cover"
                priority
              />
              {/* Stats bar overlaid at the bottom of the image */}
              <div className="absolute bottom-0 left-0 right-0 bg-green-900/85 grid grid-cols-4 divide-x divide-green-700">
                {trustStats.map(({ value, label }) => (
                  <div key={label} className="py-3 text-center">
                    <div className="text-xl font-extrabold text-white leading-none">{value}</div>
                    <div className="text-green-300 text-xs font-medium mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          ABOUT STRIP
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-14 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Kenya's Trusted Sanitary Bin Partner</h2>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                At <strong className="text-green-700">Sylvie Waste and Garbage Collection Limited</strong> we provide professional
                sanitary bin rental and servicing in every county across Kenya. Our bins deliver safe,
                discreet disposal of feminine hygiene waste — keeping your workplace compliant, clean, and welcoming.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                We handle everything from delivery and installation to scheduled servicing, waste removal,
                and environmental documentation — so you never have to worry about washroom hygiene again.
              </p>
            </div>
            
            <div className="space-y-5">
              <div className="relative rounded-2xl overflow-hidden h-52 shadow-md">
                <Image
                  src="/images/hero.jpeg"
                  alt="Sylvie Waste Collection Kenya team"
                  fill
                  className="object-cover"
                />
              </div>
              <ul className="grid grid-cols-2 gap-3">
              {[
                'No long-term lock-in contracts',
                'Disposal certificates every visit',
                'Volume discounts for 10+ bins',
                'Same service in all 47 counties',
                'PPE-trained, uniformed staff',
                'Rapid emergency call-outs',
              ].map((pt) => (
                <li key={pt} className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                  <Check cls="w-5 h-5 text-green-600 mt-0.5" />
                  <span className="text-gray-900 font-medium text-base leading-snug">{pt}</span>
                </li>
              ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          WHY CHOOSE US
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Why Choose Us</h2>
            <p className="text-gray-700 text-base max-w-xl mx-auto">Six reasons businesses across Kenya trust us with their washroom hygiene.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(({ title, desc, icon }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-700 mb-4">
                  {icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-700 text-base leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          BIN PRODUCTS
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Our Sanitary Bins</h2>
            <p className="text-gray-700 text-base">Two proven options — choose by budget and washroom environment.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pedal */}
            <div className="rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-green-400 hover:shadow-xl transition-all">
              {/* Coloured header band */}
              <div className="bg-green-700 px-8 pt-8 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </div>
                  <span className="bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full">Most Popular</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">Pedal Sanitary Bins</h3>
                <p className="text-green-200 font-medium mt-1">Hands-Free Operation</p>
              </div>
              {/* ── IMAGE: pedal-bin.jpg
                  Suggested: close-up of a slim white pedal sanitary bin in a cubicle
                  Size: 800×400px, place in /public/images/pedal-bin.jpg ── */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src="/images/pedal.png"
                  alt="Pedal sanitary bin Kenya"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Body */}
              <div className="bg-white px-8 py-7">
                <ul className="space-y-3 mb-7">
                  {['15–20L capacity options', 'Slim design fits any cubicle', 'Antimicrobial liners & scented cartridges', 'Most cost-effective compliance solution'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-800 text-base font-medium">
                      <Check cls="w-5 h-5 text-green-600" />{f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-4xl font-extrabold text-green-700">KES 1,500</span>
                    <span className="text-gray-600 text-base font-medium"> / bin / month</span>
                    <p className="text-gray-600 text-sm mt-0.5">Servicing included</p>
                  </div>
                  <Link href="#quote-form?bin=pedal" className="bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-xl transition-colors text-base">
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>

            {/* Automatic */}
            <div className="rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-blue-400 hover:shadow-xl transition-all">
              <div className="bg-blue-700 px-8 pt-8 pb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <span className="bg-blue-500 text-white text-sm font-bold px-3 py-1 rounded-full">Premium</span>
                </div>
                <h3 className="text-2xl font-extrabold text-white">Automatic Sanitary Bins</h3>
                <p className="text-blue-200 font-medium mt-1">Sensor-Activated Contactless Lid</p>
              </div>
                            {/* ── IMAGE: automatic-bin.jpg
                  Suggested: sensor automatic sanitary bin in modern office washroom
                  Size: 800×400px, place in /public/images/automatic-bin.jpg ── */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src="/images/automatic.png"
                  alt="Automatic sensor sanitary bin Kenya"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-white px-8 py-7">
                <ul className="space-y-3 mb-7">
                  {['Touchless lid — zero contact hygiene', 'Premium finish for high-end washrooms', 'Advanced odour control technology', 'Ideal for hotels, hospitals & corporates'].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-gray-800 text-base font-medium">
                      <Check cls="w-5 h-5 text-blue-600" />{f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-4xl font-extrabold text-blue-700">KES 2,500</span>
                    <span className="text-gray-600 text-base font-medium"> / bin / month</span>
                    <p className="text-gray-600 text-sm mt-0.5">Servicing included</p>
                  </div>
                  <Link href="#quote-form?bin=automatic" className="bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl transition-colors text-base">
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing footnotes */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Weekly, bi-weekly, or monthly pricing', 'Volume discounts for 10+ bins', 'Free site assessment before quoting'].map((pt) => (
              <div key={pt} className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
                <Check cls="w-5 h-5 text-green-600" />
                <span className="text-gray-900 font-medium text-base">{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-700 text-base">Up and running in four simple steps.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 relative">
            {steps.map(({ n, title, desc, icon }) => (
              <div key={n} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-extrabold text-green-200 leading-none">{n}</span>
                  <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-green-700">
                    {icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-700 text-base leading-relaxed flex-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          INDUSTRIES
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Industries We Serve</h2>
            <p className="text-gray-700 text-base">Trusted by businesses of every kind, from startups to government.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {industries.map(({ name, icon }) => (
              <div key={name} className="group bg-gray-50 border border-gray-100 rounded-2xl p-5 flex flex-col items-center gap-3 text-center hover:bg-green-700 hover:border-green-700 transition-all cursor-default">
                <span className="text-green-700 group-hover:text-white transition-colors">{icon}</span>
                <span className="text-gray-900 group-hover:text-white font-semibold text-base transition-colors">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          ADDITIONAL SERVICES
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Additional Washroom Services</h2>
            <p className="text-gray-700 text-base">Complete your washroom hygiene programme with our optional add-ons.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {additionalServices.map(({ name, bg, icon }) => (
              <div key={name} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col items-center gap-3 text-center hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center`}>
                  {icon}
                </div>
                <span className="text-gray-900 font-semibold text-sm leading-snug">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          QUOTE FORM
      ════════════════════════════════════════════════════════════════════════ */}
      <section id="quote-form" className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Get a Free Quote</h2>
            <p className="text-gray-700 text-base">Fill in the form and we'll respond within 24 hours.</p>
          </div>
          <SanitaryBinQuoteForm />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FAQ — ACCORDION
      ════════════════════════════════════════════════════════════════════════ */}
      <FaqAccordion />

      {/* ════════════════════════════════════════════════════════════════════════
          COMPLIANCE

      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Compliance & Standards</h2>
            <p className="text-gray-700 text-base">We operate to the highest hygiene and environmental standards in Kenya.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Licensed & Registered', desc: 'Registered Kenyan business with professionally trained technicians.', bg: 'bg-green-700', icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
              { title: 'PPE-Compliant Teams', desc: 'All staff operate in full PPE and are trained in safe waste handling.', bg: 'bg-blue-700', icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
              { title: 'Licensed Disposal', desc: 'Waste processed through licensed and certified disposal facilities.', bg: 'bg-orange-600', icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg> },
              { title: 'Regular Audits', desc: 'Internal audits and SLA performance reviews for every client.', bg: 'bg-purple-700', icon: <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg> },
            ].map(({ title, desc, bg, icon }) => (
              <div key={title} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className={`${bg} px-6 py-5 flex items-center gap-4`}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
                </div>
                <div className="bg-white px-6 py-5">
                  <p className="text-gray-700 text-base leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="bg-green-800 py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-green-200 text-lg mb-8">
            Get a free quote or book a site survey today. We serve all 47 counties in Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="#quote-form" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-9 py-4 rounded-xl transition-colors shadow-lg text-base">
              Get Free Quote
            </Link>
            <Link href="/contact" className="bg-white hover:bg-gray-100 text-green-800 font-bold px-9 py-4 rounded-xl transition-colors text-base">
              Contact Us
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-green-200 font-medium">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              0711 515 752
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              sylviegarbagecollection@gmail.com
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}