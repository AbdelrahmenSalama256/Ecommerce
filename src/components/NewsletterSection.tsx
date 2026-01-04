import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Animated orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(45 100% 60% / 0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <motion.div 
            className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-[3rem] bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30 relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 rounded-[3rem] opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.5), transparent)',
                backgroundSize: '200% 100%',
              }}
              animate={{
                backgroundPosition: ['200% 0%', '-200% 0%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.6 }}
              className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"
            >
              <Mail className="w-8 h-8 text-primary-foreground" />
            </motion.div>

            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Stay in the <span className="text-gradient">Loop</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive deals, early access to new products, and tech insights.
            </p>

            <motion.form 
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative flex-1 group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-focus-within:opacity-100 transition-opacity -z-10 blur-xl" />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px hsl(var(--primary) / 0.4)' }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-full flex items-center justify-center gap-2 group shadow-lg shadow-primary/25"
              >
                Subscribe
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.form>

            <p className="text-xs text-muted-foreground mt-6">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NewsletterSection;
