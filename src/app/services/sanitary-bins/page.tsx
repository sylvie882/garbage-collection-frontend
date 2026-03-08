// app/sanitary-bin/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Menu, X, Phone, Mail, ChevronDown, 
  CheckCircle, Truck, Shield, Recycle, 
  Clock, Star, Users, Award, ChevronLeft, 
  ChevronRight, MapPin, Calendar, FileText,
  Droplets, Wind, Sparkles, Building2,
  GraduationCap, Stethoscope, Hotel, Factory,
  Landmark, Dumbbell, CalendarDays
} from 'lucide-react';

import SanitaryBinQuoteForm from '../../../components/SanitaryBinQuoteForm';

// ==================== HEADER COMPONENT ====================
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [countiesDropdown, setCountiesDropdown] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Services', 
      href: '#',
      dropdown: [
        { name: 'Pedal Sanitary Bins', href: '/services/pedal-bins' },
        { name: 'Automatic Sanitary Bins', href: '/services/automatic-bins' },
        { name: 'Servicing Schedules', href: '/services/servicing' },
        { name: 'Additional Washroom Services', href: '/services/additional' },
      ]
    },
    { name: 'Industries', href: '/industries' },
    { 
      name: 'Counties', 
      href: '#',
      dropdown: [
        { name: 'Nairobi', href: '/counties/nairobi' },
        { name: 'Mombasa', href: '/counties/mombasa' },
        { name: 'Kisumu', href: '/counties/kisumu' },
        { name: 'Nakuru', href: '/counties/nakuru' },
        { name: 'All 47 Counties', href: '/counties' },
      ]
    },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar with contact info */}
      <div className="bg-teal-700 text-white py-2 px-4 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone size={14} className="mr-1" /> 0711 515 752
            </span>
            <span className="flex items-center">
              <Mail size={14} className="mr-1" /> info@sylvie.co.ke
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <MapPin size={14} className="mr-1" /> All 47 Counties
            </span>
            <span className="bg-teal-600 px-2 py-1 rounded">Mon-Sat: 8am-6pm</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="font-bold text-xl">
              <span className="text-teal-700">SYLVIE</span>
              <span className="text-gray-700 text-sm block">waste & garbage collection</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <>
                    <button className="flex items-center text-gray-700 hover:text-teal-600 font-medium">
                      {item.name} <ChevronDown size={16} className="ml-1" />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className="text-gray-700 hover:text-teal-600 font-medium">
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link 
              href="/quote" 
              className="bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-700 transition"
            >
              Get Free Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="lg:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div className="py-2">
                    <button className="flex items-center text-gray-700 font-medium w-full justify-between">
                      {item.name} <ChevronDown size={16} />
                    </button>
                    <div className="pl-4 mt-2 space-y-2">
                      {item.dropdown.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block text-sm text-gray-600 hover:text-teal-600"
                          onClick={() => setIsOpen(false)}
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-teal-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t">
              <Link 
                href="/quote" 
                className="block text-center bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// ==================== AUTO-SLIDING CAROUSEL ====================
const AutoSlidingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
      alt: "Modern automatic sanitary bin in washroom",
      title: "Automatic Sensor Bins",
      description: "Contactless operation for maximum hygiene"
    },
    {
      src: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?auto=format&fit=crop&w=1200&q=80",
      alt: "Pedal sanitary bin installation",
      title: "Durable Pedal Bins",
      description: "Hands-free with antimicrobial protection"
    },
    {
      src: "https://images.unsplash.com/photo-1571781418606-70265b9cce90?auto=format&fit=crop&w=1200&q=80",
      alt: "Service technician servicing sanitary bin",
      title: "Professional Servicing",
      description: "Scheduled maintenance with disposal certificates"
    },
    {
      src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80",
      alt: "Clean washroom with sanitary bin",
      title: "Nationwide Coverage",
      description: "All 47 counties in Kenya"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Images */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40" />
            
            {/* Caption */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="text-white max-w-3xl px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{image.title}</h2>
                <p className="text-xl md:text-2xl">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-8 bg-white' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ==================== QUOTE FORM COMPONENT ====================
const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    location: '',
    binType: '',
    quantity: '',
    frequency: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you shortly with a free quote.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Get a Free Quote</h3>
      <p className="text-gray-600 mb-6">Fill in the form below and we'll respond within 2 hours</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location (County/Town) *</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Nairobi, Mombasa"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bin Type *</label>
            <select
              name="binType"
              required
              value={formData.binType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select bin type</option>
              <option value="pedal">Pedal Sanitary Bin</option>
              <option value="automatic">Automatic Sanitary Bin</option>
              <option value="both">Both Types</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Bins *</label>
            <input
              type="number"
              name="quantity"
              required
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Frequency *</label>
            <select
              name="frequency"
              required
              value={formData.frequency}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select frequency</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="07XX XXX XXX"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Additional Message</label>
          <textarea
            name="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            placeholder="Tell us about your requirements..."
          />
        </div>

        <p className="text-xs text-gray-500">
          We respect your privacy. Your details are used only to provide quotations and service updates.
        </p>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          Request Free Quote
        </button>
      </form>
    </div>
  );
};

// ==================== FOOTER COMPONENT ====================
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div className="font-bold text-xl">
                <span className="text-white">SYLVIE</span>
                <span className="text-gray-400 text-sm block">waste & garbage collection</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Professional sanitary bin rental and servicing across all 47 counties in Kenya.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-500">📘</a>
              <a href="#" className="text-gray-400 hover:text-teal-500">📱</a>
              <a href="#" className="text-gray-400 hover:text-teal-500">💼</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-teal-500">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-teal-500">Services</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-teal-500">Pricing</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-teal-500">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-teal-500">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li><Link href="/services/pedal-bins" className="text-gray-400 hover:text-teal-500">Pedal Sanitary Bins</Link></li>
              <li><Link href="/services/automatic-bins" className="text-gray-400 hover:text-teal-500">Automatic Sanitary Bins</Link></li>
              <li><Link href="/services/servicing" className="text-gray-400 hover:text-teal-500">Scheduled Servicing</Link></li>
              <li><Link href="/services/additional" className="text-gray-400 hover:text-teal-500">Additional Washroom Services</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>0711 515 752</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>info@sylvie.co.ke</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>All 47 Counties, Kenya</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Mon-Sat: 8:00am - 6:00pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Sylvie Waste and Garbage Collection Limited. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-teal-500">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-teal-500">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ==================== MAIN PAGE ====================
export default function SanitaryBinPage() {
  // Trust badges data
  const trustBadges = [
    { icon: MapPin, text: 'Nationwide Coverage (All 47 Counties)' },
    { icon: FileText, text: 'Scheduled Servicing & Waste Disposal Certificates' },
    { icon: Shield, text: 'Discreet Female Hygiene Solutions' },
    { icon: Recycle, text: 'Eco-conscious Disposal Practices' },
  ];

  // Why choose us data
  const whyChooseUs = [
    { icon: Truck, title: 'Nationwide Reach', description: 'Reliable deliveries and servicing in Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, and all counties.' },
    { icon: Sparkles, title: 'Two Bin Options', description: 'Contactless automatic bins or hands-free pedal bins to fit your budget and hygiene goals.' },
    { icon: Calendar, title: 'Regular Servicing', description: 'Weekly, bi-weekly, or monthly servicing to match foot traffic and budgets.' },
    { icon: FileText, title: 'Compliance & Documentation', description: 'Waste transfer notes and disposal certificates provided.' },
    { icon: Wind, title: 'Discreet, Odour-Free', description: 'Antimicrobial liners and deodorising cartridges reduce odours and germs.' },
    { icon: Award, title: 'Fair, Transparent Pricing', description: 'Simple rental + service fee. No hidden charges.' },
  ];

  // Industries data
  const industries = [
    { icon: Building2, name: 'Offices & Corporate Buildings' },
    { icon: GraduationCap, name: 'Schools, Colleges & Universities' },
    { icon: Stethoscope, name: 'Hospitals & Clinics' },
    { icon: Hotel, name: 'Hotels, Restaurants & Malls' },
    { icon: Factory, name: 'Manufacturing & Warehouses' },
    { icon: Landmark, name: 'Government & NGOs' },
    { icon: Dumbbell, name: 'Gyms & Co-Working Spaces' },
    { icon: CalendarDays, name: 'Events & Temporary Sites' },
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How many bins do I need?',
      answer: 'Typically one bin per female washroom cubicle. High-traffic sites may need larger capacity or more frequent servicing.'
    },
    {
      question: 'Do you provide disposal certificates?',
      answer: 'Yes, we issue waste transfer notes and disposal certificates after each service cycle.'
    },
    {
      question: 'How often do you service?',
      answer: 'Weekly, bi-weekly, or monthly. We’ll recommend a schedule based on footfall and industry.'
    },
    {
      question: 'What areas do you cover?',
      answer: 'All 47 counties in Kenya, including remote locations.'
    },
    {
      question: 'Are the bins discreet and odour-free?',
      answer: 'Yes. Our bins use antimicrobial liners and deodorising cartridges to control odours and bacteria.'
    },
    {
      question: 'Can you handle multi-branch organisations?',
      answer: 'Yes. We manage national rollouts, central billing, and SLA reporting.'
    }
  ];

  return (
    <main className="min-h-screen">
      {/* Header */}
      <Header />

      {/* Auto-sliding Carousel */}
      <AutoSlidingCarousel />

      {/* Hero Section with CTA */}
      <section className="bg-gradient-to-br from-teal-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Hygienic, Compliant Sanitary Bin Services Across All 47 Counties in Kenya
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                We supply, rent, and service pedal and automatic sanitary bins for offices, schools, hospitals,
                malls, hotels, factories, and SMEs—on-time, discreet, and compliant with Kenyan hygiene standards.
              </p>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-start">
                    <badge.icon className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                    <span className="text-sm text-gray-700">{badge.text}</span>
                  </div>
                ))}
              </div>

              {/* Primary CTA */}
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="#quote" 
                  className="bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition shadow-lg"
                >
                  Get a Free Quote Today
                </Link>
                <div className="flex items-center space-x-4 text-gray-700">
                  <span className="flex items-center">
                    <Phone size={18} className="mr-1" /> 0711 515 752
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center">
                    <Mail size={18} className="mr-1" /> info@sylvie.co.ke
                  </span>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div id="quote" className="lg:ml-auto">
              <SanitaryBinQuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Copy */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-xl text-gray-700 leading-relaxed">
            At <strong>Sylvie Waste and Garbage Collection Limited</strong>, we provide professional sanitary bin rental and 
            servicing in every county in Kenya. Our pedal and automatic sanitary bins offer safe, discreet disposal of 
            feminine hygiene waste, helping your business stay compliant, clean, and welcoming. We handle delivery, 
            installation, scheduled servicing, waste removal, and environmental documentation—so you never worry about 
            washroom hygiene again.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                <item.icon className="text-teal-600 mb-4" size={32} />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Sanitary Bins */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Sanitary Bins</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pedal Bins */}
            <div className="bg-teal-50 p-8 rounded-xl border border-teal-100">
              <h3 className="text-2xl font-bold text-teal-700 mb-4">Pedal Sanitary Bins (Hands-Free)</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span>15–20L capacity options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span>Durable, slim design fits most cubicles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span>Antimicrobial liners and scented cartridges</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span>Best for cost-effective compliance</span>
                </li>
              </ul>
            </div>

            {/* Automatic Bins */}
            <div className="bg-teal-50 p-8 rounded-xl border border-teal-100">
              <h3 className="text-2xl font-bold text-teal-700 mb-4">Automatic Sanitary Bins (Sensor-Activated)</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span>Contactless lid for maximum hygiene</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span>Premium look for high-end facilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span>Advanced odour control</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-teal-700 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Site Assessment', desc: 'We help you choose bin type, capacity, and service frequency.' },
              { step: '2', title: 'Delivery & Installation', desc: 'Nationwide delivery and professional setup.' },
              { step: '3', title: 'Scheduled Servicing', desc: 'On-time liner replacement, cleaning, and waste removal.' },
              { step: '4', title: 'Support', desc: 'Responsive customer service and quick call-outs.' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white text-teal-700 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-teal-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-md transition">
                <industry.icon className="text-teal-600 mx-auto mb-3" size={32} />
                <span className="text-gray-700 font-medium">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Blurb (Hidden but present for SEO) */}
      <div className="sr-only">
        <h2>Sanitary Bin Services Kenya Wide</h2>
        <p>
          Looking for sanitary bin services in Kenya? We offer sanitary bin rental, feminine hygiene bins,
          and washroom servicing in Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Nyeri, Meru,
          Embu, Machakos, and every county nationwide. Choose pedal bins or automatic sanitary bins
          with scheduled service visits and proper waste disposal certificates.
        </p>
      </div>

      {/* Secondary CTA */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready for a Cleaner Washroom?</h2>
          <p className="text-xl text-gray-600 mb-8">Request a free site survey today</p>
          <Link 
            href="#quote" 
            className="inline-block bg-teal-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition shadow-lg"
          >
            Request a Free Site Survey
          </Link>
        </div>
      </section>

      {/* About Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">About Sylvie Waste and Garbage Collection Limited</h2>
            <p className="text-lg text-gray-600 mb-8">
              We're a Kenyan hygiene services provider dedicated to safer, cleaner washrooms. Our team combines 
              reliable logistics with professional sanitation practices to deliver timely sanitary bin solutions 
              across the country. We believe in dignity, discretion, and environmental responsibility.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-teal-50 p-6 rounded-xl">
                <h3 className="font-semibold text-teal-700 mb-3">Our Commitment</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">Hygiene First: Contactless or hands-free options</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">People & Dignity: Female hygiene supported with privacy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">Environment: Approved disposal routes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">Compliance: Adherence to local regulations</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-teal-50 p-6 rounded-xl">
                <h3 className="font-semibold text-teal-700 mb-3">Credentials</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Award className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">Registered Kenyan business</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">Trained technicians</span>
                  </li>
                  <li className="flex items-start">
                    <Shield className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">PPE-compliant service teams</span>
                  </li>
                  <li className="flex items-start">
                    <Recycle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm">Licensed disposal partners</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Sanitary Bin Rental */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-teal-700 mb-4">Sanitary Bin Rental & Servicing</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span><strong>Bin Options:</strong> Pedal and automatic sensor bins</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span><strong>Capacities:</strong> 15L–20L (larger on request)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span><strong>Servicing:</strong> Weekly, bi-weekly, monthly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={18} />
                  <span><strong>Included:</strong> Delivery, installation, liners, deodoriser, cleaning, waste removal, disposal certificate</span>
                </li>
              </ul>
            </div>

            {/* Additional Services */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-teal-700 mb-4">Additional Washroom Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Air Fresheners & Dispensers',
                  'Soap & Hand Sanitiser Dispensers',
                  'Paper Towel & Toilet Tissue Supply',
                  'Nappy/Diaper Bins',
                  'Sharps & Clinical Waste Bins',
                  'Deep Cleaning & Disinfection',
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="text-teal-600 mr-2 flex-shrink-0" size={16} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Process */}
          <div className="bg-teal-700 text-white p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6">Service Process</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold mb-2">1.</div>
                <h4 className="font-semibold mb-2">Survey</h4>
                <p className="text-teal-100 text-sm">Free assessment to determine bin count and service frequency</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">2.</div>
                <h4 className="font-semibold mb-2">Contract</h4>
                <p className="text-teal-100 text-sm">Flexible rental terms (3–12 months+)</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">3.</div>
                <h4 className="font-semibold mb-2">Onboarding</h4>
                <p className="text-teal-100 text-sm">Rollout plan for multi-site or multi-county clients</p>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">4.</div>
                <h4 className="font-semibold mb-2">SLA</h4>
                <p className="text-teal-100 text-sm">Service windows, emergency call-outs, and replacement guarantees</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Transparent Pricing Made Simple</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Simple rental + service fee. No hidden charges. Pricing varies by location, bin quantity, and frequency.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-teal-200 rounded-xl p-8 text-center hover:shadow-lg transition">
              <h3 className="text-2xl font-bold text-teal-700 mb-2">Pedal Sanitary Bin</h3>
              <p className="text-3xl font-bold text-gray-800 mb-4">KES 1,500<span className="text-sm font-normal text-gray-600">/month</span></p>
              <p className="text-gray-600 mb-6">Includes servicing</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span className="text-sm">Weekly, bi-weekly, or monthly servicing</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span className="text-sm">Free delivery & installation</span>
                </li>
              </ul>
              <Link href="#quote" className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                Get Quote
              </Link>
            </div>
            
            <div className="border border-teal-200 rounded-xl p-8 text-center hover:shadow-lg transition relative">
              <div className="absolute top-0 right-0 bg-teal-600 text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-lg">
                Premium
              </div>
              <h3 className="text-2xl font-bold text-teal-700 mb-2">Automatic Sanitary Bin</h3>
              <p className="text-3xl font-bold text-gray-800 mb-4">KES 2,500<span className="text-sm font-normal text-gray-600">/month</span></p>
              <p className="text-gray-600 mb-6">Includes servicing</p>
              <ul className="text-left space-y-2 mb-6">
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span className="text-sm">Sensor-activated, contactless operation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-teal-600 mr-2 flex-shrink-0 mt-1" size={16} />
                  <span className="text-sm">Advanced odour control</span>
                </li>
              </ul>
              <Link href="#quote" className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition">
                Get Quote
              </Link>
            </div>
          </div>
          
          <p className="text-center text-gray-500 mt-8">
            Multi-site/volume discounts available for 10+ bins or multiple branches. Get a custom quote.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg p-4 cursor-pointer">
                <summary className="font-semibold text-gray-800">{faq.question}</summary>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}