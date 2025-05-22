
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroButtons: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div 
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
      className="flex flex-wrap gap-4"
    >
      <Link 
        to="/shop" 
        className="relative overflow-hidden group bg-gradient-to-r from-leaf-500 to-leaf-700 hover:from-leaf-600 hover:to-leaf-800 text-white font-medium px-6 py-3 rounded-md transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
      >
        <span className="relative z-10">{t('Shop Now')}</span>
        <motion.span 
          className="ml-2 relative z-10"
          animate={{ x: [0, 5, 0] }}
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1,
            repeatDelay: 1 
          }}
        >
          <ArrowRight size={18} />
        </motion.span>
        <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
      </Link>
      
      <Link 
        to="/ar-preview" 
        className="relative overflow-hidden group border-2 border-leaf-600 text-leaf-700 hover:text-leaf-800 font-medium px-6 py-[10px] rounded-md transition-all duration-300 flex items-center"
      >
        <span className="relative z-10">{t('Try AR Preview')}</span>
        <span className="absolute inset-0 bg-leaf-50 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
      </Link>
    </motion.div>
  );
};

export default HeroButtons;
