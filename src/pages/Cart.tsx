import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Minus, Plus, ArrowRight, Tag, Shield, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';
import { useState } from 'react';

const initialCartItems = [
  { id: 1, name: 'Quantum Pro Headset', price: 299, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80', category: 'Audio' },
  { id: 2, name: 'Nebula Smart Watch', price: 449, quantity: 1, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80', category: 'Wearables' },
  { id: 4, name: 'Prism VR Glasses', price: 599, quantity: 1, image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=200&q=80', category: 'VR/AR' },
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 29.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative pt-40 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <motion.div
          className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.15) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                <ShoppingCart className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                  Shopping <span className="text-gradient">Cart</span>
                </h1>
                <p className="text-muted-foreground">{cartItems.length} items in your cart</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Cart Content */}
      <section className="pb-32">
        <div className="container mx-auto px-6">
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingCart className="w-20 h-20 text-muted-foreground mx-auto mb-6" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added any items yet.</p>
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-full inline-flex items-center gap-2"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                    className="flex gap-6 p-6 rounded-2xl bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="w-28 h-28 rounded-xl overflow-hidden"
                      >
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </motion.div>
                    </Link>
                    
                    <div className="flex-1">
                      <span className="text-xs text-primary font-semibold uppercase tracking-wider">{item.category}</span>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-2xl font-bold text-gradient mt-2">${item.price}</p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                      
                      <div className="flex items-center gap-3 p-1 rounded-xl bg-secondary/50 border border-border/30">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="sticky top-32 p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30"
                >
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Order Summary</h2>
                  
                  {/* Promo Code */}
                  <div className="flex gap-3 mb-6">
                    <div className="relative flex-1">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-5 py-3 bg-secondary text-foreground font-medium rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Apply
                    </motion.button>
                  </div>

                  <div className="space-y-4 py-6 border-y border-border/30">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 mb-8">
                    <span className="font-display text-xl font-bold text-foreground">Total</span>
                    <span className="font-display text-3xl font-bold text-gradient">${total.toFixed(2)}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px hsl(var(--primary) / 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-2xl shadow-lg shadow-primary/25 flex items-center justify-center gap-3"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  {/* Trust badges */}
                  <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-border/30">
                    <div className="text-center">
                      <Shield className="w-5 h-5 text-primary mx-auto mb-1" />
                      <span className="text-xs text-muted-foreground">Secure</span>
                    </div>
                    <div className="text-center">
                      <Truck className="w-5 h-5 text-primary mx-auto mb-1" />
                      <span className="text-xs text-muted-foreground">Free Shipping</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Cart;
