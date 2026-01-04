import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw, Star, Minus, Plus, ChevronLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ScrollReveal from '@/components/ScrollReveal';

const allProducts = [
  { id: 1, name: 'Quantum Pro Headset', price: 299, originalPrice: 349, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', category: 'Audio', isNew: true, rating: 4.8, reviews: 234, description: 'Experience crystal-clear audio with our flagship wireless headset. Featuring advanced noise cancellation, 40-hour battery life, and premium comfort for all-day wear.' },
  { id: 2, name: 'Nebula Smart Watch', price: 449, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80', category: 'Wearables', isNew: true, rating: 4.9, reviews: 567, description: 'The ultimate smartwatch for modern life. Track your health, stay connected, and look stylish with our premium titanium design and AMOLED display.' },
  { id: 3, name: 'Aurora Wireless Speaker', price: 199, originalPrice: 249, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80', category: 'Audio', rating: 4.6, reviews: 189, description: 'Fill any room with immersive 360-degree sound. Featuring smart home integration and a stunning design that complements any décor.' },
  { id: 4, name: 'Prism VR Glasses', price: 599, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80', category: 'VR/AR', isNew: true, rating: 4.7, reviews: 312, description: 'Step into new realities with cutting-edge VR technology. Ultra-high resolution displays and precise motion tracking for the ultimate immersive experience.' },
  { id: 5, name: 'Flux Mechanical Keyboard', price: 179, image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&q=80', category: 'Peripherals', rating: 4.5, reviews: 445, description: 'Precision typing meets premium aesthetics. Hot-swappable switches, RGB lighting, and aircraft-grade aluminum construction.' },
  { id: 6, name: 'Vortex Gaming Mouse', price: 89, originalPrice: 119, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80', category: 'Peripherals', rating: 4.4, reviews: 678, description: 'Dominate your competition with 25K DPI precision sensor, lightweight design, and customizable buttons for any playstyle.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const product = allProducts.find(p => p.id === Number(id)) || allProducts[0];
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);
  const imageY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 pt-28">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </motion.div>
      </div>

      {/* Product Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Gallery */}
            <motion.div 
              style={{ scale: imageScale, y: imageY }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-card to-card/50 border border-border/30"
              >
                <motion.img
                  key={selectedImage}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* Badges */}
                {product.isNew && (
                  <div className="absolute top-6 left-6 px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-bold rounded-full">
                    NEW
                  </div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-6 right-6 px-4 py-2 bg-destructive text-destructive-foreground text-sm font-bold rounded-full">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
              </motion.div>

              {/* Thumbnail gallery placeholder */}
              <div className="flex gap-4 mt-6">
                {[0, 1, 2, 3].map((i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? 'border-primary' : 'border-border/30 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <div className="space-y-8">
              <ScrollReveal direction="right">
                <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                  {product.category}
                </span>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-accent fill-accent' : 'text-border'}`}
                      />
                    ))}
                  </div>
                  <span className="text-foreground font-medium">{product.rating}</span>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4 mt-6">
                  <span className="font-display text-4xl font-bold text-gradient">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                  )}
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mt-6">
                  {product.description}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-6 mt-8">
                  <span className="text-foreground font-medium">Quantity</span>
                  <div className="flex items-center gap-4 p-2 rounded-xl bg-secondary/50 border border-border/30">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px hsl(var(--primary) / 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center gap-3 py-5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-2xl shadow-lg shadow-primary/25"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-5 rounded-2xl border transition-all ${
                      isLiked 
                        ? 'bg-destructive/10 border-destructive text-destructive' 
                        : 'bg-secondary/50 border-border/30 text-foreground hover:border-primary'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-5 rounded-2xl bg-secondary/50 border border-border/30 text-foreground hover:border-primary transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-3 gap-4 mt-10 p-6 rounded-2xl bg-card/30 border border-border/30">
                  {[
                    { icon: Truck, label: 'Free Shipping' },
                    { icon: Shield, label: '2 Year Warranty' },
                    { icon: RotateCcw, label: '30-Day Returns' },
                  ].map((feature) => (
                    <div key={feature.label} className="text-center">
                      <feature.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <span className="text-sm text-muted-foreground">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl font-bold text-foreground mb-12">
              You May Also <span className="text-gradient">Like</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} {...product} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProductDetail;
