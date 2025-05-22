
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturesSection from '@/components/FeaturesSection';
import CategorySection from '@/components/CategorySection';
import ProductGrid from '@/components/ProductGrid';
import ARPreviewBanner from '@/components/ARPreviewBanner';
import BlogPreview from '@/components/BlogPreview';
import Newsletter from '@/components/Newsletter';
import { getFeaturedProducts } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';
import FeaturedProductSlider from '@/components/FeaturedProductSlider';
import { formatToRupiah } from '@/utils/formatters';

const Index: React.FC = () => {
  const { t } = useLanguage();
  const featuredProducts = getFeaturedProducts();
  
  // Featured slider products (we'll use the first 5 products)
  const sliderProducts = featuredProducts.slice(0, 5);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Background Image */}
        <div className="relative">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1920&q=80" 
              alt="Hidroponik Background"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-leaf-50/90 to-cream-50/90" />
          </div>
          <Hero />
        </div>

        {/* Featured Product Slider */}
        <FeaturedProductSlider products={sliderProducts} formatPrice={formatToRupiah} />

        <FeaturesSection />
        <div className="container mx-auto px-4 py-12">
          <ProductGrid products={featuredProducts} title={t('Featured Products')} formatPrice={formatToRupiah} />
        </div>
        <ARPreviewBanner />
        <CategorySection />
        <BlogPreview />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
