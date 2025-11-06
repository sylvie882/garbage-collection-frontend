'use client';

import { useState, useEffect } from 'react';
import { Carousel as CarouselType } from '../types';
import axios from 'axios';
import Link from 'next/link';

const API_URL = 'https://api.sylviegarbagecollection.co.ke/api';

export default function Carousel() {
  const [carousels, setCarousels] = useState<CarouselType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await axios.get<CarouselType[]>(`${API_URL}/carousels`);
        const activeSlides = response.data.filter((c) => c.is_active);
        setCarousels(activeSlides);
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

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carousels.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carousels.length]);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === carousels.length - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? carousels.length - 1 : currentIndex - 1);
  };

  if (isLoading) {
    return <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg"></div>;
  }

  if (carousels.length === 0) {
    return (
      <div className="relative w-full h-96 bg-gradient-to-r from-green-800 to-green-600 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Professional Waste Management
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Kenya&apos;s First Digital Waste Management Solution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
              >
                Get Free Quote
              </Link>
              <Link
                href="/services"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-800 transition-colors inline-block"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-2xl">
      {carousels.map((carousel, index) => (
        <div
          key={carousel.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={`https://api.sylviegarbagecollection.co.ke/storage/${carousel.image_path.replace(/\\/g, '/')}`}
            alt={carousel.title || 'Carousel Image'}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl mx-auto px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                {carousel.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-lg">{carousel.description}</p>
              {carousel.button_text && carousel.button_link && (
                <Link
                  href={carousel.button_link}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition-colors inline-block"
                >
                  {carousel.button_text}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carousels.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
