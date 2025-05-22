
import React from 'react';
import { motion } from 'framer-motion';

// Define the type for floating element props
interface FloatingElementProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: string;
  color: string;
  shape: string;
  delay: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ 
  top, left, right, bottom, size, color, shape, delay 
}) => {
  return (
    <motion.div 
      className={`absolute ${size} bg-gradient-to-br ${color} ${shape} blur-sm z-0`}
      style={{
        top,
        left,
        right,
        bottom
      }}
      animate={{
        y: [0, -15, 0],
        rotate: [0, top ? 5 : -5, 0],
        scale: [1, 1.05, 1]
      }}
      transition={{
        duration: 5 + Math.random() * 2,
        repeat: Infinity,
        repeatType: "reverse",
        delay
      }}
    />
  );
};

const FloatingElements: React.FC = () => {
  const floatingElements = [
    { 
      top: '15%', left: '10%', size: 'w-16 h-16', 
      color: 'from-leaf-400/30 to-leaf-600/20', 
      shape: 'rounded-full', delay: 0 
    },
    { 
      top: '75%', left: '85%', size: 'w-12 h-12', 
      color: 'from-blue-400/30 to-blue-600/20', 
      shape: 'rounded-full', delay: 1.2 
    },
    { 
      top: '65%', left: '5%', size: 'w-10 h-10', 
      color: 'from-cream-200/40 to-cream-400/30', 
      shape: 'rounded-lg', delay: 0.7 
    },
    { 
      top: '10%', right: '10%', size: 'w-20 h-20', 
      color: 'from-leaf-300/20 to-blue-300/10', 
      shape: 'rounded-full', delay: 0.3 
    },
    { 
      bottom: '15%', right: '20%', size: 'w-14 h-14', 
      color: 'from-leaf-200/30 to-leaf-400/20', 
      shape: 'rounded-lg', delay: 1.5
    }
  ];

  return (
    <>
      {floatingElements.map((element, index) => (
        <FloatingElement 
          key={index}
          top={element.top}
          left={element.left}
          right={element.right}
          bottom={element.bottom}
          size={element.size}
          color={element.color}
          shape={element.shape}
          delay={element.delay}
        />
      ))}
    </>
  );
};

export default FloatingElements;
