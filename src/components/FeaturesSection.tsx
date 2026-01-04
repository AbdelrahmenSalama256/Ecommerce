import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Shield, Truck, Headphones, Sparkles, Globe } from 'lucide-react';
import { useRef } from 'react';
import ScrollReveal from './ScrollReveal';

const features = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Get your orders delivered within 24 hours with our express shipping worldwide.',
    gradient: 'from-primary to-cyan-400',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: 'Your transactions are protected with bank-level 256-bit encryption.',
    gradient: 'from-accent to-orange-400',
  },
  {
    icon: Truck,
    title: 'Free Returns',
    description: '30-day hassle-free return policy on all products, no questions asked.',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support for all your queries via chat or call.',
    gradient: 'from-purple-400 to-pink-500',
  },
];

const FeaturesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      <motion.div 
        style={{ y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <span className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4 block">
            Why Choose Us
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground">
            Experience the <span className="text-gradient">Difference</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border/50 h-full transition-all duration-500 group-hover:border-primary/30 overflow-hidden"
              >
                {/* Background glow on hover */}
                <motion.div
                  className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${feature.gradient} opacity-0 blur-[80px] group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(var(--primary) / 0.3), transparent)`,
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['200% 0%', '-200% 0%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 p-8 rounded-3xl bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm border border-border/30"
        >
          {[
            { icon: Sparkles, value: '10M+', label: 'Products Sold' },
            { icon: Globe, value: '150+', label: 'Countries' },
            { icon: Headphones, value: '24/7', label: 'Support' },
            { icon: Shield, value: '100%', label: 'Secure' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center group cursor-default"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-display text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
