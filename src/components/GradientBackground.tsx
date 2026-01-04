import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface GradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const GradientBackground = ({ children, className = '' }: GradientBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const gradientRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-30 blur-[150px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(185 100% 50% / 0.4) 0%, transparent 70%)',
          scale,
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(45 100% 60% / 0.4) 0%, transparent 70%)',
          rotate: gradientRotation,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-10 blur-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(280 100% 50% / 0.3) 0%, transparent 70%)',
        }}
      />
      {children}
    </div>
  );
};

export default GradientBackground;
