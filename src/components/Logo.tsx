
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'default' | 'footer';
}

const Logo: React.FC<LogoProps> = ({ variant = 'default' }) => {
  // Logo animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: -5, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300,
        damping: 10
      }
    }
  };

  const dropletVariants = {
    initial: { y: -3, opacity: 0.8 },
    animate: { 
      y: 3, 
      opacity: 1,
      transition: { 
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 1.5,
      }
    }
  };

  const leafVariants = {
    initial: { rotate: 0 },
    animate: { 
      rotate: [0, 2, 0, -2, 0], 
      transition: { 
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 2.5
      } 
    }
  };

  // Text size and colors based on variant
  const textSizeClass = variant === 'footer' ? 'text-xl' : 'text-2xl';
  const textColorClass = variant === 'footer' ? 'text-white' : 'text-leaf-800';
  const accentColorClass = variant === 'footer' ? 'text-leaf-300' : 'text-leaf-600';

  return (
    <Link to="/" aria-label="GrowSpace Home">
      <motion.div 
        className="flex items-center gap-1"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="relative mr-1">
          <motion.div 
            variants={leafVariants}
            initial="initial"
            animate="animate"
            className="absolute -top-1 -left-1"
          >
            <Sprout size={20} className="text-leaf-500" />
          </motion.div>
          <motion.div 
            variants={dropletVariants}
            initial="initial"
            animate="animate"
            className="absolute top-1 left-4"
          >
            <Droplet size={14} className="text-blue-400 fill-blue-200" />
          </motion.div>
          <div className="w-8 h-8 bg-gradient-to-br from-leaf-300 to-leaf-600 rounded-full flex items-center justify-center">
            <span className="sr-only">GrowSpace Logo</span>
          </div>
        </div>
        <motion.span 
          variants={itemVariants} 
          className={`font-display font-semibold ${textSizeClass} ${textColorClass}`}
        >
          Grow<motion.span variants={itemVariants} className={accentColorClass}>Space</motion.span>
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default Logo;
