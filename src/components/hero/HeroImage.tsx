
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroImage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative w-full max-w-md">
      <div className="aspect-square rounded-full bg-gradient-to-br from-leaf-300/30 to-blue-300/20 animate-pulse-gentle absolute inset-0"></div>
      <motion.img 
        src="/lpimg1.png" 
        alt={t('Hydroponic System')} 
        className="relative z-10 mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 1, delay: 0.5 }}
        whileHover={{ 
          rotate: 3, 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      />
      
      {/* Floating elements */}
      <motion.div 
        className="absolute top-1/4 left-0 w-16 h-16 bg-gradient-to-br from-leaf-400/40 to-leaf-600/20 rounded-lg blur-sm"
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/4 right-0 w-12 h-12 bg-gradient-to-br from-blue-400/40 to-blue-600/20 rounded-full blur-sm"
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
    </div>
  );
};

export default HeroImage;
