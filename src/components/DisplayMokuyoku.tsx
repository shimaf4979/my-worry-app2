"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideItem {
  id: number;
  title: string;
  desc: string;
  bgColor: string;
  imageUrl: string;
}

const slides: SlideItem[] = [
  {
    id: 1,
    title: "プールサイドビュー",
    desc: "贅沢な空間での寛ぎのひととき",
    bgColor: "#2563eb",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/back1.JPG-htRfywm3YERZCIMD0HBi5W1kMgUu9p.jpeg",
  },
  {
    id: 2,
    title: "リラックス空間",
    desc: "心地よい環境でのくつろぎ",
    bgColor: "#3b82f6",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/back1.JPG-htRfywm3YERZCIMD0HBi5W1kMgUu9p.jpeg",
  },
  {
    id: 3,
    title: "プレミアムエリア",
    desc: "特別な時間をお過ごしください",
    bgColor: "#60a5fa",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/back1.JPG-htRfywm3YERZCIMD0HBi5W1kMgUu9p.jpeg",
  },
];

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setIsMobile(width < 768);
      setContainerSize({
        width: isMobile
          ? Math.min(width * 0.95, 500)
          : Math.min(width * 0.7, 500),
        height: isMobile
          ? Math.min(height * 0.5, 300)
          : Math.min(height * 0.7, 450),
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [isMobile]);

  const next = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getStyles = (index: number) => {
    const baseStyles = {
      opacity: 1,
      transition: "all 0.5s ease-in-out",
    };

    const slideWidth = containerSize.width * (isMobile ? 0.85 : 0.75);
    const slideHeight = containerSize.height;

    if (isMobile) {
      if (activeSlide === index) {
        return {
          ...baseStyles,
          transform: `translateX(7.5%) scale(0.95)`,
          zIndex: 10,
        };
      } else if ((activeSlide - 1 + slides.length) % slides.length === index) {
        return {
          ...baseStyles,
          transform: `translateX(-${slideWidth * 0.75}px) scale(0.85)`,
          zIndex: 9,
          opacity: 0.7,
        };
      } else if ((activeSlide + 1) % slides.length === index) {
        return {
          ...baseStyles,
          transform: `translateX(${slideWidth * 0.9}px) scale(0.85)`,
          zIndex: 9,
          opacity: 0.7,
        };
      } else {
        return {
          ...baseStyles,
          transform: `translateX(${
            index < activeSlide ? "-150%" : "150%"
          }) scale(0.7)`,
          zIndex: 8,
          opacity: 0,
        };
      }
    } else {
      if (activeSlide === index) {
        return {
          ...baseStyles,
          transform: `translateX(12.5%) translateZ(0) rotateY(0) scale(0.95)`,
          zIndex: 10,
        };
      } else if ((activeSlide - 1 + slides.length) % slides.length === index) {
        return {
          ...baseStyles,
          transform: `translateX(-${
            slideWidth * 0.6
          }px) translateZ(-100px) rotateY(35deg) scale(0.8)`,
          zIndex: 9,
          opacity: 0.7,
        };
      } else if ((activeSlide + 1) % slides.length === index) {
        return {
          ...baseStyles,
          transform: `translateX(${
            slideWidth * 0.6
          }px) translateZ(-100px) rotateY(-35deg) scale(0.8)`,
          zIndex: 9,
          opacity: 0.7,
        };
      } else {
        return {
          ...baseStyles,
          transform: `translateX(${
            index < activeSlide ? "-120%" : "120%"
          }) translateZ(-200px) rotateY(${
            index < activeSlide ? 35 : -35
          }deg) scale(0.7)`,
          zIndex: 8,
          opacity: 0,
        };
      }
    }
  };

  return (
    <div className='w-full my-5 flex flex-col items-center justify-center  overflow-hidden'>
      <div
        className='relative perspective-[1000px] overflow-hidden'
        style={{
          width: `${containerSize.width}px`,
          height: `${containerSize.height}px`,
          position: "relative",
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className='absolute top-0 rounded-xl transition-all duration-500 ease-in-out'
            style={{
              ...getStyles(i),
              width: `${containerSize.width * (isMobile ? 0.85 : 0.75)}px`,
              height: `${containerSize.height}px`,
              boxShadow: `0 10px 30px ${slide.bgColor}30`,
            }}
          >
            <div className='flex flex-col text-white h-full relative overflow-hidden rounded-xl'>
              <img
                src={slide.imageUrl || "/placeholder.svg"}
                alt={slide.title}
                className='absolute inset-0 w-full h-full object-cover'
              />
              <div className='relative z-10 mt-auto bg-black bg-opacity-50 p-4 rounded-lg'>
                <h2 className='text-xl md:text-2xl font-bold mb-2'>
                  {slide.title}
                </h2>
                <p className='text-xs md:text-sm opacity-90'>{slide.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='mt-8 flex gap-6'>
        <button
          onClick={prev}
          className='p-2 text-white hover:text-blue-400 transition-colors bg-gray-800 rounded-full'
          aria-label='前のスライド'
        >
          <ChevronLeft className='w-6 h-6' />
        </button>
        <button
          onClick={next}
          className='p-2 text-white hover:text-blue-400 transition-colors bg-gray-800 rounded-full'
          aria-label='次のスライド'
        >
          <ChevronRight className='w-6 h-6' />
        </button>
      </div>
    </div>
  );
}
