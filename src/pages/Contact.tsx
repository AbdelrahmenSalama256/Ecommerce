import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <motion.div
          className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.15) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4 block">
                Get in Touch
              </span>
              <h1 className="font-display text-6xl md:text-8xl font-bold">
                Contact <span className="text-gradient text-shadow-glow">Us</span>
              </h1>
              <p className="text-muted-foreground text-xl mt-8 leading-relaxed max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Mail, title: 'Email Us', info: 'hello@nexus.com', description: 'We reply within 24 hours' },
              { icon: Phone, title: 'Call Us', info: '+1 (555) 123-4567', description: 'Mon-Fri 9am-6pm EST' },
              { icon: MapPin, title: 'Visit Us', info: 'San Francisco, CA', description: '123 Tech Street' },
            ].map((contact, index) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border/30 hover:border-primary/30 transition-all duration-500 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-6"
                >
                  <contact.icon className="w-7 h-7 text-primary-foreground" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-gradient">
                  {contact.title}
                </h3>
                <p className="text-primary font-medium mb-1">{contact.info}</p>
                <p className="text-muted-foreground text-sm">{contact.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <ScrollReveal direction="left">
              <div className="p-10 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30">
                <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                  Send us a <span className="text-gradient">Message</span>
                </h2>
                <p className="text-muted-foreground mb-8">Fill out the form below and we'll get back to you soon.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-5 py-4 rounded-xl bg-background/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px hsl(var(--primary) / 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-3"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </motion.button>
                </form>
              </div>
            </ScrollReveal>

            {/* FAQ Preview */}
            <ScrollReveal direction="right">
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                    Frequently Asked <span className="text-gradient">Questions</span>
                  </h2>
                  <p className="text-muted-foreground">Quick answers to common questions.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { q: 'What are your shipping options?', a: 'We offer free standard shipping on all orders over $50. Express and next-day delivery are also available.' },
                    { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy on all products. Items must be in original condition.' },
                    { q: 'Do you offer international shipping?', a: 'Yes! We ship to over 150 countries worldwide. Shipping costs and delivery times vary by location.' },
                    { q: 'How can I track my order?', a: 'Once your order ships, you\'ll receive a tracking number via email to monitor your delivery.' },
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-2xl bg-card/30 border border-border/30 hover:border-primary/30 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{faq.q}</h4>
                          <p className="text-muted-foreground text-sm mt-2">{faq.a}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Response Time */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20"
                >
                  <div className="flex items-center gap-4">
                    <Clock className="w-10 h-10 text-primary" />
                    <div>
                      <h4 className="font-display text-lg font-bold text-foreground">Average Response Time</h4>
                      <p className="text-primary font-medium">Under 2 hours during business hours</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
