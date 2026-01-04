import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '' 
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { x: 0, y: 100 };
      case 'down': return { x: 0, y: -100 };
      case 'left': return { x: 100, y: 0 };
      case 'right': return { x: -100, y: 0 };
      default: return { x: 0, y: 100 };
    }
  };

  const initial = getInitialPosition();

  const x = useTransform(scrollYProgress, [0, 1], [initial.x, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [initial.y, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ x, y, opacity, scale }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
