import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';

const allProducts = [
  { id: 1, name: 'Quantum Pro Headset', price: 299, originalPrice: 349, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', category: 'Audio', isNew: true, rating: 4.8 },
  { id: 2, name: 'Nebula Smart Watch', price: 449, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', category: 'Wearables', isNew: true, rating: 4.9 },
  { id: 3, name: 'Aurora Wireless Speaker', price: 199, originalPrice: 249, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', category: 'Audio', rating: 4.6 },
  { id: 4, name: 'Prism VR Glasses', price: 599, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80', category: 'VR/AR', isNew: true, rating: 4.7 },
  { id: 5, name: 'Flux Mechanical Keyboard', price: 179, image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80', category: 'Peripherals', rating: 4.5 },
  { id: 6, name: 'Vortex Gaming Mouse', price: 89, originalPrice: 119, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', category: 'Peripherals', rating: 4.4 },
  { id: 7, name: 'Echo Noise-Canceling Buds', price: 249, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80', category: 'Audio', isNew: true, rating: 4.7 },
  { id: 8, name: 'Pulse Fitness Tracker', price: 149, originalPrice: 199, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80', category: 'Wearables', rating: 4.3 },
  { id: 9, name: 'Vision 4K Monitor', price: 699, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80', category: 'Display', rating: 4.8 },
  { id: 10, name: 'Stream Pro Webcam', price: 159, image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=600&q=80', category: 'Peripherals', rating: 4.5 },
  { id: 11, name: 'Bass Master Subwoofer', price: 399, originalPrice: 499, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80', category: 'Audio', rating: 4.6 },
  { id: 12, name: 'Smart Home Hub', price: 279, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&q=80', category: 'Smart Home', isNew: true, rating: 4.4 },
];

const categories = ['All', 'Audio', 'Wearables', 'VR/AR', 'Peripherals', 'Display', 'Smart Home'];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const filteredProducts = activeCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Header */}
      <motion.section 
        style={{ y: headerY, opacity: headerOpacity }}
        className="relative pt-40 pb-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <motion.div
          className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.2) 0%, transparent 70%)' }}
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <span className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4 block text-center">
              Our Collection
            </span>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-center">
              All <span className="text-gradient text-shadow-glow">Products</span>
            </h1>
            <p className="text-muted-foreground text-lg text-center mt-6 max-w-2xl mx-auto">
              Explore our complete range of premium tech products designed for the future
            </p>
          </ScrollReveal>
        </div>
      </motion.section>

      {/* Filters and Products */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30"
          >
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25'
                      : 'bg-secondary/50 text-foreground/70 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 p-1 rounded-xl bg-secondary/50">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition-all ${
                    viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-secondary/50 text-foreground/70 hover:text-foreground transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div 
            layout
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}
          >
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                {...product}
                delay={index * 0.05}
              />
            ))}
          </motion.div>

          {/* Results count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground mt-12"
          >
            Showing {filteredProducts.length} of {allProducts.length} products
          </motion.p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Products;
