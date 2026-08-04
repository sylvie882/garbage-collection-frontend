'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel as CarouselType } from '../types';

const API_URL = 'https://api.sylviegarbagecollection.co.ke';

export default function Carousel() {
  const [carousels, setCarousels] = useState<CarouselType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(1);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await axios.get<CarouselType[]>(
          `${API_URL}/api/carousels`
        );

        const slides = response.data
          .filter((c) => c.is_active)
          .map((slide) => ({
            ...slide,
            image_url:
              slide.image_url ||
              slide.image_path ||
              '/placeholder.jpg',
          }));

        setCarousels(slides);

      } catch (error) {
        console.error('Error fetching carousels:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarousels();
  }, []);

  // Preload next image
  useEffect(() => {
    if (!carousels.length) return;

    const nextImage = new window.Image();
    const nextIndex = (currentIndex + 1) % carousels.length;
    const nextImageUrl = carousels[nextIndex]?.image_url;

    if (nextImageUrl) {
      nextImage.src = nextImageUrl;
    }

  }, [currentIndex, carousels]);

  // Auto slide
  useEffect(() => {
    if (!carousels.length) return;

    intervalRef.current = setInterval(() => {
      setDirection(1);

      setCurrentIndex((prev) =>
        (prev + 1) % carousels.length
      );

    }, 6000);

    return () => {
      if (intervalRef.current)
        clearInterval(intervalRef.current);
    };

  }, [carousels]);

  const nextSlide = () => {
    setDirection(1);

    setCurrentIndex((prev) =>
      (prev + 1) % carousels.length
    );
  };

  const prevSlide = () => {
    setDirection(-1);

    setCurrentIndex((prev) =>
      prev === 0
        ? carousels.length - 1
        : prev - 1
    );
  };

  const goToSlide = (index:number) => {
    setDirection(
      index > currentIndex ? 1 : -1
    );

    setCurrentIndex(index);
  };

  const variants = {
    enter:(direction:number)=>({
      x: direction > 0 ? '100%' : '-100%',
      opacity:1
    }),
    center:{
      x:'0%',
      opacity:1
    },
    exit:(direction:number)=>({
      x: direction > 0 ? '-100%' : '100%',
      opacity:1
    })
  };

  if(isLoading){
    return(
      <div className="
        w-full h-[500px]
        bg-gray-200
        animate-pulse
        rounded-2xl
      "/>
    );
  }

  if(!carousels.length){
    return null;
  }

  const slide = carousels[currentIndex];

  return (
    <div
      className="
        relative
        w-full
        h-[500px]
        overflow-hidden
        rounded-2xl
        shadow-2xl
        bg-black
      "
    >
      <AnimatePresence
        initial={false}
        custom={direction}
        mode="sync"
      >
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration:0.6,
            ease:"easeInOut"
          }}
          className="
            absolute
            inset-0
            w-full
            h-full
            will-change-transform
          "
        >
          {slide.button_link ? (
            <Link
              href={slide.button_link}
              className="
                block
                w-full
                h-full
              "
            >
              <Image
                src={slide.image_url || '/placeholder.jpg'}
                alt="Carousel image"
                fill
                priority
                sizes="100vw"
                className="
                  object-cover
                  cursor-pointer
                "
              />
            </Link>
          ) : (
            <Image
              src={slide.image_url || '/placeholder.jpg'}
              alt="Carousel image"
              fill
              priority
              sizes="100vw"
              className="
                object-cover
              "
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      {carousels.length > 1 && (
        <div
          className="
            absolute
            bottom-6
            left-1/2
            -translate-x-1/2
            flex
            gap-3
            z-20
          "
        >
          {carousels.map((_,index)=>(
            <button
              key={index}
              onClick={() =>
                goToSlide(index)
              }
              className={`
                w-3
                h-3
                rounded-full
                transition-all
                ${
                  index === currentIndex
                  ?
                  'bg-white scale-125'
                  :
                  'bg-white/50'
                }
              `}
            />
          ))}
        </div>
      )}

      {/* Arrows */}
      {carousels.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              z-20
              bg-black/30
              hover:bg-black/50
              text-white
              p-3
              rounded-full
            "
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="
              absolute
              right-5
              top-1/2
              -translate-y-1/2
              z-20
              bg-black/30
              hover:bg-black/50
              text-white
              p-3
              rounded-full
            "
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}