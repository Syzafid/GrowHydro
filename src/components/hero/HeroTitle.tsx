
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroTitle: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <motion.h1 
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { 
          y: 0, 
          opacity: 1,
          transition: { 
            type: "spring", 
            stiffness: 70,
            damping: 10
          }
        }
      }}
      className="text-4xl md:text-5xl font-display font-bold mb-4"
    >
      {t('Grow Your Own')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-leaf-600 to-leaf-800">{t('Food')}</span> {t('with Hydroponics')}
    </motion.h1>
  );
};

export default HeroTitle;
