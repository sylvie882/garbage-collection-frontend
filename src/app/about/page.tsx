'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/./components/Header'; // Adjust import path as needed
import Carousel from '@/./components/Carousel'; // Adjust import path as needed
import Footer from '@/./components/Footer'; // Adjust import path as needed

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Carousel Section */}
      <Carousel />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              ABOUT SYLVIE GARBAGE COLLECTION
            </h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Reliable Garbage Collection Services in Nairobi Kenya
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We are leading company in this field, We provide specific solutions for our every customers.
                We have more of experience in the Residential & industrial waste management, we provide 
                expert services that removes responsibility from waste generating companies by 100% recycling.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our staff are responsible, qualified, fully trained, experienced and inducted at every site. 
                Stringent employment and medical checks are in place for all staff including cleaners, 
                supervisors, team leaders and managers. All staff are trained to comply with company policy, 
                Workplace Health and Safety and safe work place methods.
              </p>
            </div>
            <div className="bg-green-100 rounded-lg p-8">
              <h4 className="text-xl font-bold text-green-800 mb-4">Why Choose Us?</h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Experienced & Qualified Staff
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  100% Recycling Commitment
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Health & Safety Compliant
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Residential & Industrial Services
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Environmental Commitment */}
        <section className="mb-16 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Our Environmental Commitment
          </h3>
          <p className="text-gray-600 mb-6 leading-relaxed text-center max-w-4xl mx-auto">
            We strive to conserve precious resources by focusing on waste reduction as well as the sorting 
            and transportation of recyclables to recovery facilities. As a last resort, we dispose of the 
            ultimate waste at the recommended landfill site. As a waste management company, our competitive 
            advantage stems from our ability to generate new ideas that take into account our unique local conditions.
          </p>
          <p className="text-gray-600 leading-relaxed text-center max-w-4xl mx-auto">
            We hope to eventually achieve zero waste to landfill by continuing to empower our thriving informal 
            sector while keeping costs low for our valued customers.
          </p>
        </section>

        {/* Services Highlights */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-orange-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">✓</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              Get rid of those insects
            </h4>
            <p className="text-gray-600 leading-relaxed">
              We are a company committed to developing solutions that accommodate continuing growth through 
              research, innovation and a firm commitment to deliver value-added services to our customers.
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-8">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">✓</span>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">
              Clean Up exercise for residents
            </h4>
            <p className="text-gray-600 leading-relaxed">
              Our company's mission is to deliver value-added services that protect people and improve the 
              environment. We aim to be a company that uses its industry knowledge and experience, to provide 
              sustainable environmental protection solutions and services.
            </p>
          </div>
        </section>

        {/* Vision, Mission & Values */}
        <section className="grid md:grid-cols-3 gap-8">
          {/* Vision */}
          <div className="text-center bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-4">OUR VISION</h3>
            <p className="text-gray-600 leading-relaxed">
              To become a highly innovative and sought after waste management solution provider in Kenya and beyond.
            </p>
          </div>

          {/* Mission */}
          <div className="text-center bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-4">OUR MISSION</h3>
            <p className="text-gray-600 leading-relaxed">
              To help our clients maintain clean, healthy environments through efficient waste management 
              solutions that cut unnecessary costs, improve efficiency and offer value to their communities.
            </p>
          </div>

          {/* Values */}
          <div className="text-center bg-white rounded-2xl shadow-lg p-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-4">OUR VALUES</h3>
            <p className="text-gray-600 leading-relaxed">
              We are committed to the values of excellence, reliability, growth, innovation,
              professionalism and integrity. We do what we say and do it well the – first time!
            </p>
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="bg-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in creating a cleaner, healthier environment for Nairobi and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-lg"
            >
              Contact Us Today
            </Link>
            <Link 
              href="/services" 
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition-colors text-lg"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}