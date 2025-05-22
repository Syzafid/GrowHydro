
import React from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'text-leaf-600',
  text = 'Loading...'
}) => {
  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[size];

  const iconSize = {
    sm: 24,
    md: 36,
    lg: 48,
  }[size];

  return (
    <div className={`flex flex-col items-center justify-center ${sizeClass}`}>
      <motion.div
        className={`${color}`}
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Sprout size={iconSize} />
      </motion.div>
      
      {text && (
        <motion.div
          className="mt-2 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center">
            <span>{text}</span>
            <motion.span 
              className="inline-flex ml-1"
              animate={{
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
              }}
            >
              ...
            </motion.span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LoadingSpinner;
