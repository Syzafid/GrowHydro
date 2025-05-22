
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import HeroTitle from './hero/HeroTitle';
import HeroDescription from './hero/HeroDescription';
import HeroButtons from './hero/HeroButtons';
import HeroImage from './hero/HeroImage';
import FloatingElements from './hero/FloatingElements';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollTop = window.scrollY;
      const heroOffset = heroRef.current.offsetTop;
      const relativeScroll = scrollTop - heroOffset;
      
      // Apply parallax effect to image
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${relativeScroll * 0.2}px)`;
      }
      
      // Apply opacity effect to content
      if (contentRef.current && scrollTop > 100) {
        const opacity = Math.max(0, 1 - (relativeScroll * 0.002));
        contentRef.current.style.opacity = opacity.toString();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={heroRef} className="relative overflow-hidden py-12 md:py-20">
      {/* Background gradient with vegetable-themed pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-leaf-50 to-cream-50 z-0">
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zM15 30c0-8.284 6.716-15 15-15 8.284 0 15 6.716 15 15 0 8.284-6.716 15-15 15-8.284 0-15-6.716-15-15z' fill='%232E7D32' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px"
          }}
        />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-gradient-to-br from-leaf-200 to-leaf-300 rounded-full blur-3xl opacity-60 animate-pulse-gentle z-0"></div>
      <div className="absolute top-1/4 -right-12 w-56 h-56 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full blur-3xl opacity-50 animate-float z-0"></div>
      <div className="absolute -bottom-8 left-1/3 w-32 h-32 bg-gradient-to-br from-cream-100 to-cream-200 rounded-full blur-2xl opacity-60 animate-pulse z-0"></div>
      
      {/* Floating leaf elements */}
      <FloatingElements />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            ref={contentRef} 
            className="order-2 md:order-1"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { 
                  staggerChildren: 0.2,
                  delayChildren: 0.3
                }
              }
            }}
            initial="hidden"
            animate="visible"
          >
            <HeroTitle />
            <HeroDescription />
            <HeroButtons />
          </motion.div>
          
          <div ref={imageRef} className="order-1 md:order-2 flex justify-center">
            <HeroImage />
          </div>
        </div>
      </div>
      
      {/* Decorative wave with vegetable silhouettes */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 text-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,140.83,141.14,213.34,134.9,308.87,126.77,242.57,75,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
