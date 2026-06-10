'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';
import { Carousel as CarouselType } from '../types';

const API_URL = 'https://api.sylviegarbagecollection.co.ke';

export default function Carousel() {
  const [carousels, setCarousels] = useState<CarouselType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await axios.get<CarouselType[]>(`${API_URL}/api/carousels`);
        const activeSlides = response.data.filter((c) => c.is_active);
        const normalizedSlides = activeSlides.map((slide) => ({
          ...slide,
          image_url: slide.image_url || slide.image_path || '/placeholder.jpg',
        }));
        setCarousels(normalizedSlides);
      } catch (error) {
        console.error('Error fetching carousels:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarousels();
  }, []);

  useEffect(() => {
    if (carousels.length === 0) return;
    intervalRef.current = setInterval(() => {
      setDirection(0);
      setCurrentIndex((prev) => (prev + 1) % carousels.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [carousels]);

  const nextSlide = () => {
    setDirection(0);
    setCurrentIndex((prev) => (prev + 1) % carousels.length);
  };

  const prevSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === 0 ? carousels.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 0 : 1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction === 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction === 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  if (isLoading) {
    return (
      <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Loading carousel...</div>
      </div>
    );
  }

  if (carousels.length === 0) {
    return (
      <div className="relative w-full h-[500px] bg-gradient-to-r from-green-800 to-green-600 rounded-lg flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Professional Waste Management</h1>
          <p className="text-xl md:text-2xl mb-8">Kenya&apos;s First Digital Waste Management Solution</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition"
            >
              Get Free Quote
            </Link>
            <Link
              href="/services"
              className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-800 transition"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl">
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${carousels[currentIndex].image_url})` }}
          />

          {/* Overlay and Content */}
          <div className="absolute inset-0 bg-gradient-to-b pt-24 from-black/60 via-black/40 to-black/70 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-3xl">
              <motion.h2
                className="text-3xl md:text-5xl font-extrabold mb-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {carousels[currentIndex].title}
              </motion.h2>
              <motion.p
                className="text-lg md:text-2xl mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {carousels[currentIndex].description}
              </motion.p>
              {carousels[currentIndex].button_text && carousels[currentIndex].button_link && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  <Link
                    href={carousels[currentIndex].button_link}
                    className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
                  >
                    {carousels[currentIndex].button_text}
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      {carousels.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {carousels.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navigation Arrows */}
      {carousels.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition z-10"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition z-10"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}