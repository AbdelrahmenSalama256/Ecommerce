import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  delay?: number;
  rating?: number;
}

const ProductCard = ({ id, name, price, originalPrice, image, category, isNew, delay = 0, rating = 4.5 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, scale }}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border/50 transition-all duration-700"
        whileHover={{ 
          borderColor: 'hsl(var(--primary) / 0.5)',
          boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25)'
        }}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          
          {/* Gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
            animate={{ opacity: isHovered ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          />

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* New Badge */}
          {isNew && (
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: delay + 0.2 }}
              className="absolute top-4 left-4 px-4 py-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold rounded-full shadow-lg"
            >
              NEW
            </motion.div>
          )}

          {/* Discount badge */}
          {originalPrice && (
            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: delay + 0.3 }}
              className="absolute top-4 right-16 px-3 py-1.5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full"
            >
              -{Math.round((1 - price / originalPrice) * 100)}%
            </motion.div>
          )}

          {/* Quick Actions */}
          <motion.div
            className="absolute top-4 right-4 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                setIsLiked(!isLiked);
              }}
              className={`p-3 rounded-full backdrop-blur-xl transition-all duration-300 ${
                isLiked 
                  ? 'bg-destructive text-destructive-foreground shadow-lg shadow-destructive/50' 
                  : 'bg-card/80 text-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            </motion.button>
            <Link to={`/product/${id}`}>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-card/80 text-foreground hover:bg-primary hover:text-primary-foreground backdrop-blur-xl transition-all duration-300"
              >
                <Eye className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Add to Cart Button */}
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 100, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 py-4 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-primary font-semibold uppercase tracking-wider">
              {category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-accent fill-accent" />
              <span className="text-xs text-muted-foreground">{rating}</span>
            </div>
          </div>
          <Link to={`/product/${id}`}>
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
              {name}
            </h3>
          </Link>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-2xl font-bold text-gradient">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
