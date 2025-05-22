
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  images: string[];
}

interface FeaturedProductSliderProps {
  products: Product[];
  formatPrice: (price: number) => string;
}

const FeaturedProductSlider: React.FC<FeaturedProductSliderProps> = ({ products, formatPrice }) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Auto advance slider
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {t('Featured Products')}
        </h2>
        
        <div className="relative">
          <div 
            ref={sliderRef}
            className="overflow-hidden rounded-lg"
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="min-w-full"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-square max-w-md mx-auto">
                      <img
                        src={product.images[0] || '/placeholder.svg'}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {product.salePrice && (
                        <Badge className="absolute top-4 left-4 bg-red-500">
                          {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-4 p-4">
                      <Badge variant="outline" className="mb-2">
                        {product.category}
                      </Badge>
                      
                      <h3 className="text-2xl font-bold">
                        {product.name}
                      </h3>
                      
                      <p className="text-gray-600">
                        {product.description}
                      </p>
                      
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">
                          {formatPrice(product.salePrice || product.price)}
                        </span>
                        {product.salePrice && (
                          <span className="text-gray-500 line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-3 pt-4">
                        <Button asChild>
                          <Link to={`/product/${product.id}`}>
                            {t('View Product')}
                          </Link>
                        </Button>
                        
                        <Button variant="outline">
                          {t('Add to Cart')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full pointer-events-auto shadow-lg hover:bg-white bg-white/80"
              onClick={prevSlide}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full pointer-events-auto shadow-lg hover:bg-white bg-white/80"
              onClick={nextSlide}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Slider Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                currentSlide === index ? 'bg-leaf-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProductSlider;
