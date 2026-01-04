import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

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

const Collections = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <motion.div
          className="absolute top-20 left-1/3 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.15) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4 block">
                Browse by Category
              </span>
              <h1 className="font-display text-6xl md:text-8xl font-bold">
                Our <span className="text-gradient text-shadow-glow">Collections</span>
              </h1>
              <p className="text-muted-foreground text-xl mt-8 leading-relaxed max-w-2xl mx-auto">
                Explore our carefully curated collections of premium tech products
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8">
            {collections.map((collection, index) => (
              <Link key={collection.id} to={`/collections/${collection.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden cursor-pointer"
                >
                  <motion.img
                    src={collection.image}
                    alt={collection.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${collection.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                  <div className="absolute inset-0 p-12 flex flex-col justify-end">
                    <motion.span
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className="text-primary text-sm font-semibold uppercase tracking-wider"
                    >
                      {collection.subtitle}
                    </motion.span>
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="font-display text-5xl md:text-6xl font-bold text-foreground mt-2"
                    >
                      {collection.title}
                    </motion.h2>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-muted-foreground mt-3"
                    >
                      {collection.productCount} Products
                    </motion.p>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-2 mt-6 text-primary font-semibold group-hover:gap-4 transition-all duration-300"
                    >
                      <span className="text-lg">Explore Collection</span>
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </motion.div>
                  </div>

                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-3xl transition-colors duration-500 pointer-events-none" />
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

export default Collections;
