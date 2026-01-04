import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';

const collectionsData = [
  {
    id: 1,
    title: 'Audio Excellence',
    subtitle: 'Premium Sound',
    description: 'Experience crystal-clear audio with our premium headphones, speakers, and audio accessories. Engineered for audiophiles who demand the best.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1200&q=80',
    products: [
      { id: 1, name: 'Quantum Pro Headset', price: 299, originalPrice: 349, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', category: 'Audio', isNew: true, rating: 4.8 },
      { id: 3, name: 'Aurora Wireless Speaker', price: 199, originalPrice: 249, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', category: 'Audio', rating: 4.6 },
      { id: 7, name: 'Echo Noise-Canceling Buds', price: 249, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80', category: 'Audio', isNew: true, rating: 4.7 },
    ],
  },
  {
    id: 2,
    title: 'Smart Living',
    subtitle: 'Future Tech',
    description: 'Transform your lifestyle with cutting-edge wearables and smart devices. Stay connected, track your health, and automate your life.',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=1200&q=80',
    products: [
      { id: 2, name: 'Nebula Smart Watch', price: 449, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', category: 'Wearables', isNew: true, rating: 4.9 },
      { id: 8, name: 'Pulse Fitness Tracker', price: 149, originalPrice: 199, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80', category: 'Wearables', rating: 4.3 },
    ],
  },
  {
    id: 3,
    title: 'Gaming Zone',
    subtitle: 'Pro Gear',
    description: 'Level up your gaming experience with professional-grade peripherals and VR equipment. Designed for champions.',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1200&q=80',
    products: [
      { id: 4, name: 'Prism VR Glasses', price: 599, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80', category: 'VR/AR', isNew: true, rating: 4.7 },
      { id: 5, name: 'Flux Mechanical Keyboard', price: 179, image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600&q=80', category: 'Peripherals', rating: 4.5 },
      { id: 6, name: 'Vortex Gaming Mouse', price: 89, originalPrice: 119, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80', category: 'Peripherals', rating: 4.4 },
    ],
  },
];

const CollectionDetail = () => {
  const { id } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  const collection = collectionsData.find(c => c.id === Number(id)) || collectionsData[0];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img
            src={collection.image}
            alt={collection.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="container mx-auto px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4"
            >
              {collection.subtitle}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-6xl md:text-8xl font-bold text-foreground"
            >
              {collection.title.split(' ').map((word, i) => (
                <span key={i} className={i === 1 ? 'text-gradient text-shadow-glow' : ''}>
                  {word}{' '}
                </span>
              ))}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground text-xl mt-6 max-w-2xl mx-auto"
            >
              {collection.description}
            </motion.p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
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
      </section>

      {/* Breadcrumb */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collections" className="hover:text-primary transition-colors">Collections</Link>
            <span>/</span>
            <span className="text-foreground">{collection.title}</span>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <ScrollReveal className="mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground">
              {collection.products.length} Products
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collection.products.map((product, index) => (
              <ProductCard key={product.id} {...product} delay={index * 0.1} />
            ))}
          </div>

          {/* View All */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 inline-flex items-center gap-2"
              >
                View All Products
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Other Collections */}
      <section className="py-20 bg-card/20">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Explore Other <span className="text-gradient">Collections</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collectionsData
              .filter(c => c.id !== collection.id)
              .map((col, index) => (
                <Link key={col.id} to={`/collections/${col.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer"
                  >
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <span className="text-primary text-sm font-semibold uppercase tracking-wider">{col.subtitle}</span>
                      <h3 className="font-display text-2xl font-bold text-foreground mt-1">{col.title}</h3>
                      <div className="flex items-center gap-2 mt-3 text-primary font-medium group-hover:gap-4 transition-all">
                        Explore
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-3xl transition-colors duration-500" />
                  </motion.div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CollectionDetail;
