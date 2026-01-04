import { motion } from 'framer-motion';
import { Twitter, Instagram, Github, Linkedin, CreditCard, Shield, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = {
    Shop: [
      { name: 'All Products', href: '/products' },
      { name: 'New Arrivals', href: '/products' },
      { name: 'Best Sellers', href: '/products' },
      { name: 'Sale', href: '/products' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/about' },
      { name: 'Press', href: '/about' },
      { name: 'Blog', href: '/about' },
    ],
    Support: [
      { name: 'Help Center', href: '/contact' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Shipping', href: '/about' },
      { name: 'Returns', href: '/about' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/about' },
      { name: 'Terms of Service', href: '/about' },
      { name: 'Cookie Policy', href: '/about' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer id="about" className="relative pt-32 pb-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 via-background to-background pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/">
              <motion.div
                className="font-display text-4xl font-bold text-gradient inline-block mb-6"
                whileHover={{ scale: 1.05 }}
              >
                NEXUS
              </motion.div>
            </Link>
            <p className="text-muted-foreground mb-8 max-w-xs leading-relaxed">
              The future of e-commerce. Premium tech products with immersive 3D shopping experience.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h4 className="font-display font-semibold text-foreground mb-6">{category}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.name}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="pt-8 border-t border-border/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-sm">
              © 2024 NEXUS. All rights reserved. Built with{' '}
              <span className="text-primary">♥</span> for the future.
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center gap-6">
              <span className="text-muted-foreground text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Secure Payments
              </span>
              <div className="flex gap-2">
                {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((method) => (
                  <motion.div
                    key={method}
                    whileHover={{ y: -2 }}
                    className="px-3 py-1.5 rounded-lg bg-card/50 backdrop-blur-sm border border-border/30 text-xs font-bold text-muted-foreground"
                  >
                    {method}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
