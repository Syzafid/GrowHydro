
// import React, { useMemo } from 'react';
// import { throttle } from '@/lib/utils';

// type LeafBackgroundProps = {
//   density?: 'low' | 'medium' | 'high';
//   opacity?: number;
// };

// const LeafBackground: React.FC<LeafBackgroundProps> = ({ 
//   density = 'medium', 
//   opacity = 0.1 
// }) => {
//   // Determine number of leaves based on density
//   const leafCount = useMemo(() => {
//     switch (density) {
//       case 'low': return 15;
//       case 'medium': return 30;
//       case 'high': return 50;
//       default: return 30;
//     }
//   }, [density]);
  
//   // Pre-generate leaf positions and properties instead of doing it on each render
//   const leaves = useMemo(() => {
//     return Array.from({ length: leafCount }).map((_, index) => {
//       const size = 20 + Math.random() * 30;
//       return {
//         id: `leaf-${index}`,
//         top: `${Math.random() * 100}%`,
//         left: `${Math.random() * 100}%`,
//         size: size,
//         rotation: Math.random() * 360,
//         animationDelay: `${Math.random() * 10}s`,
//         animationDuration: `${15 + Math.random() * 15}s`,
//         opacity: 0.1 + Math.random() * 0.3 * opacity
//       };
//     });
//   }, [leafCount, opacity]);

//   // Generate SVG once and memoize it
//   const leafSvg = useMemo(() => {
//     return `
//       <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
//         <path d="M30,90 Q0,50 30,10 Q50,0 70,10 Q100,50 70,90 Q50,100 30,90 Z" />
//       </svg>
//     `;
//   }, []);

//   // Optimize scroll handler with throttle
//   const handleScroll = throttle(() => {
//     // Any scroll-based animations can be implemented here
//     // This is just a placeholder for potential scroll animations
//   }, 100);

//   // Register scroll listener only once
//   React.useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   return (
//     <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
//       {leaves.map((leaf) => (
//         <div
//           key={leaf.id}
//           className="absolute animate-floating"
//           style={{
//             top: leaf.top,
//             left: leaf.left,
//             width: `${leaf.size}px`,
//             height: `${leaf.size}px`,
//             transform: `rotate(${leaf.rotation}deg)`,
//             opacity: leaf.opacity,
//             animationDelay: leaf.animationDelay,
//             animationDuration: leaf.animationDuration
//           }}
//           dangerouslySetInnerHTML={{ __html: leafSvg }}
//         />
//       ))}
//     </div>
//   );
// };

// export default LeafBackground;
