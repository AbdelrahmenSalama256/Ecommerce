import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ScrollReveal from './ScrollReveal';

const products = [
  {
    id: 1,
    name: 'Quantum Pro Headset',
    price: 299,
    originalPrice: 349,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    category: 'Audio',
    isNew: true,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Nebula Smart Watch',
    price: 449,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
    category: 'Wearables',
    isNew: true,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Aurora Wireless Speaker',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80',
    category: 'Audio',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Prism VR Glasses',
    price: 599,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80',
    category: 'VR/AR',
    isNew: true,
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Flux Mechanical Keyboard',
    price: 179,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80',
    category: 'Peripherals',
    rating: 4.5,
  },
  {
    id: 6,
    name: 'Vortex Gaming Mouse',
    price: 89,
    originalPrice: 119,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
    category: 'Peripherals',
    rating: 4.4,
  },
];

const ProductGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="products" ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px] pointer-events-none"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[180px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-20">
          <motion.span 
            className="inline-block text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4"
          >
            Featured Products
          </motion.span>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Trending{' '}
            <span className="text-gradient text-shadow-glow">Collection</span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl mx-auto text-lg">
            Discover our handpicked selection of premium tech products designed for the future
          </p>
        </ScrollReveal>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {['All', 'Audio', 'Wearables', 'VR/AR', 'Peripherals'].map((tab, index) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                index === 0
                  ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card/50 backdrop-blur-sm text-foreground/70 hover:bg-primary/10 hover:text-primary border border-border/50'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              {...product}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -15px hsl(var(--primary) / 0.4)' }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-500 relative overflow-hidden group"
            >
              <span className="relative z-10">View All Products</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
