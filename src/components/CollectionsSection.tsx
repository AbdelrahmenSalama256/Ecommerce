import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from './ScrollReveal';

const collections = [
  {
    id: 1,
    title: 'Audio Excellence',
    subtitle: 'Premium Sound',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80',
    productCount: 24,
    gradient: 'from-primary/80 to-cyan-500/80',
  },
  {
    id: 2,
    title: 'Smart Living',
    subtitle: 'Future Tech',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=800&q=80',
    productCount: 36,
    gradient: 'from-accent/80 to-orange-500/80',
  },
  {
    id: 3,
    title: 'Gaming Zone',
    subtitle: 'Pro Gear',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80',
    productCount: 42,
    gradient: 'from-purple-500/80 to-pink-500/80',
  },
];

const CollectionsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="collections" ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background gradients */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[200px] pointer-events-none"
      />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20">
          <span className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4 block">
            Explore
          </span>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground">
            Shop by <span className="text-gradient text-shadow-glow">Category</span>
          </h2>
        </ScrollReveal>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {collections.map((collection, index) => {
            const y = useTransform(
              scrollYProgress,
              [0, 1],
              [50 + index * 30, -50 - index * 20]
            );

            return (
              <motion.div
                key={collection.id}
                style={{ y }}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="group relative"
              >
                <Link to={`/collections/${collection.id}`}>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                  >
                    {/* Image */}
                    <motion.img
                      src={collection.image}
                      alt={collection.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />

                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${collection.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <motion.span 
                        className="text-primary text-sm font-semibold uppercase tracking-wider"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {collection.subtitle}
                      </motion.span>
                      <motion.h3 
                        className="font-display text-4xl font-bold text-foreground mt-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {collection.title}
                      </motion.h3>
                      <motion.p 
                        className="text-muted-foreground mt-2"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {collection.productCount} Products
                      </motion.p>

                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="flex items-center gap-2 mt-6 text-primary font-semibold group-hover:gap-4 transition-all duration-300"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                      </motion.div>
                    </div>

                    {/* Border glow on hover */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/50 transition-colors duration-500 pointer-events-none" />
                    
                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: 'linear-gradient(105deg, transparent 40%, hsl(var(--primary) / 0.1) 45%, hsl(var(--primary) / 0.2) 50%, hsl(var(--primary) / 0.1) 55%, transparent 60%)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{
                        backgroundPosition: ['-100% 0%', '200% 0%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
