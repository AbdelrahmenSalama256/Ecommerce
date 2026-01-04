import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Scene3D from '@/components/Scene3D';
import ProductGrid from '@/components/ProductGrid';
import FeaturesSection from '@/components/FeaturesSection';
import CollectionsSection from '@/components/CollectionsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* 3D Background Scene */}
      <Scene3D />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Product Grid */}
      <ProductGrid />
      
      {/* Collections */}
      <CollectionsSection />
      
      {/* Newsletter */}
      <NewsletterSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
