
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroDescription: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <motion.p 
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
      className="text-lg text-gray-600 mb-6"
    >
      {t('Premium hydroponic equipment, seeds, and supplies for year-round growing. Visualize how our systems fit in your space with augmented reality.')}
    </motion.p>
  );
};

export default HeroDescription;
