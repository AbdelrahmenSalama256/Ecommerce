import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Users, Award, Globe, Zap, Target, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

const team = [
  { name: 'Alex Chen', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Sarah Johnson', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Marcus Williams', role: 'CTO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
  { name: 'Emily Davis', role: 'Head of Marketing', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
];

const values = [
  { icon: Target, title: 'Innovation', description: 'We push boundaries and embrace new technologies to create products that define the future.' },
  { icon: Heart, title: 'Customer First', description: 'Every decision we make is driven by our commitment to delivering exceptional customer experiences.' },
  { icon: Globe, title: 'Sustainability', description: 'We are committed to reducing our environmental footprint and creating sustainable products.' },
  { icon: Zap, title: 'Excellence', description: 'We strive for excellence in everything we do, from product design to customer service.' },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={containerRef} className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <motion.div
          className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(185 100% 50% / 0.15) 0%, transparent 70%)' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, hsl(45 100% 60% / 0.1) 0%, transparent 70%)' }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4 block">
                Our Story
              </span>
              <h1 className="font-display text-6xl md:text-8xl font-bold">
                About <span className="text-gradient text-shadow-glow">NEXUS</span>
              </h1>
              <p className="text-muted-foreground text-xl mt-8 leading-relaxed max-w-2xl mx-auto">
                We're on a mission to revolutionize the way people experience technology. 
                Founded in 2020, NEXUS has grown from a small startup to a global leader in premium tech products.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/30"
          >
            {[
              { value: '500+', label: 'Products', icon: Award },
              { value: '50K+', label: 'Happy Customers', icon: Users },
              { value: '150+', label: 'Countries', icon: Globe },
              { value: '24/7', label: 'Support', icon: Zap },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 relative overflow-hidden">
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
          className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[200px] pointer-events-none"
        />
        
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-4 block">
                Our Vision
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Shaping the <span className="text-gradient">Future</span> of Technology
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                We believe that technology should enhance human experiences, not complicate them. 
                Our products are designed with simplicity, elegance, and functionality at their core.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                From cutting-edge audio equipment to revolutionary wearables, every NEXUS product 
                represents our commitment to pushing the boundaries of what's possible.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-square rounded-3xl overflow-hidden"
                >
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                    alt="NEXUS Office"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-8 -left-8 p-6 rounded-2xl bg-card border border-border/30 backdrop-blur-xl"
                >
                  <div className="font-display text-3xl font-bold text-gradient">2020</div>
                  <div className="text-muted-foreground">Founded</div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-20">
            <span className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4 block">
              What We Stand For
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground">
              Our <span className="text-gradient">Values</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border/30 h-full hover:border-primary/30 transition-all duration-500">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-6"
                  >
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </motion.div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-gradient transition-all">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal className="text-center mb-20">
            <span className="text-primary font-semibold uppercase tracking-[0.3em] text-sm mb-4 block">
              Meet the Team
            </span>
            <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground">
              The People Behind <span className="text-gradient">NEXUS</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative aspect-[3/4] rounded-3xl overflow-hidden"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-display text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-primary text-sm mt-1">{member.role}</p>
                  </div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-3xl transition-colors duration-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <motion.div 
              className="text-center p-16 rounded-[3rem] bg-gradient-to-br from-primary/10 to-accent/10 border border-border/30 relative overflow-hidden"
              whileHover={{ scale: 1.01 }}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Experience the <span className="text-gradient">Future</span>?
              </h2>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                Join thousands of satisfied customers and discover why NEXUS is the preferred choice for premium tech.
              </p>
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -15px hsl(var(--primary) / 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-5 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold rounded-full shadow-lg shadow-primary/25 inline-flex items-center gap-3"
                >
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
