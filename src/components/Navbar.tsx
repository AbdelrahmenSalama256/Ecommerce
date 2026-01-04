import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Menu, X, Search, User, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Collections', href: '/collections' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="font-display text-2xl font-bold text-gradient cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              NEXUS
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <Link key={item.name} to={item.href}>
                <motion.div
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                    location.pathname === item.href 
                      ? 'text-primary' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary) / 0.1)' }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-foreground/70 hover:text-primary transition-colors rounded-full"
            >
              <Search className="w-5 h-5" />
            </motion.button>
            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.1, backgroundColor: 'hsl(var(--primary) / 0.1)' }}
                whileTap={{ scale: 0.9 }}
                className="relative p-3 text-foreground/70 hover:text-primary transition-colors rounded-full cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center font-bold"
                >
                  3
                </motion.span>
              </motion.div>
            </Link>
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="ml-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-full text-sm flex items-center gap-2 group"
              >
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ 
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-6 pb-4 space-y-1">
            {navItems.map((item, index) => (
              <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`block py-3 px-4 rounded-xl font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/70 hover:bg-primary/5 hover:text-foreground'
                  }`}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
            <Link to="/products" onClick={() => setIsOpen(false)}>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: isOpen ? 0 : -20, opacity: isOpen ? 1 : 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="block py-3 px-4 mt-4 bg-primary text-primary-foreground font-medium rounded-xl text-center"
              >
                Shop Now
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
