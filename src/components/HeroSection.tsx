import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Sparkles, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import MagneticButton from './MagneticButton';
import TextReveal from './TextReveal';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textY = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, -100]), { stiffness: 100, damping: 30 });

  return (
    <section ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(185 100% 50% / 0.3) 0%, transparent 70%)',
            y,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(45 100% 60% / 0.25) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] pointer-events-none"
          style={{
            background: 'radial-gradient(circle, hsl(280 80% 50% / 0.15) 0%, transparent 70%)',
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div 
          style={{ opacity, scale, y: textY }}
          className="container mx-auto px-6 pt-32 pb-20 relative z-10"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
              <span className="text-sm text-primary font-medium tracking-wide">New Collection 2024</span>
            </motion.div>

            {/* Main Heading with staggered reveal */}
            <div className="overflow-hidden mb-6">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight"
              >
                <span className="text-foreground block">Future of</span>
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight"
              >
                <span className="text-gradient text-shadow-glow">Shopping</span>
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-body leading-relaxed"
            >
              Experience the next generation of e-commerce. Explore our curated collection 
              of premium products with immersive 3D previews and stunning visual design.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/products">
                <MagneticButton className="group px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2">
                  Explore Collection
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </MagneticButton>
              </Link>
              <MagneticButton className="group px-8 py-4 border-2 border-primary/30 text-foreground font-semibold rounded-full hover:border-primary hover:bg-primary/5 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm">
                <Play className="w-5 h-5 text-primary" />
                Watch Demo
              </MagneticButton>
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-3 gap-8 mt-24 max-w-2xl mx-auto"
            >
              {[
                { value: '500+', label: 'Products', suffix: '' },
                { value: '50K+', label: 'Happy Customers', suffix: '' },
                { value: '4.9', label: 'Average Rating', suffix: '★' },
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label} 
                  className="text-center group cursor-default"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className="font-display text-4xl md:text-5xl font-bold text-gradient"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, type: 'spring' }}
                  >
                    {stat.value}{stat.suffix}
                  </motion.div>
                  <div className="text-sm text-muted-foreground mt-2 group-hover:text-primary transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-8 h-12 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
          >
            <motion.div 
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-primary rounded-full" 
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
