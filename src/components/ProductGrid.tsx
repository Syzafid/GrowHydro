
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '@/data/products';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductGridProps {
  products: Product[];
  title?: string;
  formatPrice?: (price: number) => string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title, formatPrice }) => {
  const { t } = useLanguage();

  // Default price formatter (if not provided)
  const defaultFormatPrice = (price: number) => `$${price.toFixed(2)}`;
  
  // Use provided formatter or default
  const formatPriceValue = formatPrice || defaultFormatPrice;
  
  return (
    <div>
      {title && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <div className="w-16 h-1 bg-leaf-500 mx-auto mt-2"></div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={product.images[0] || '/placeholder.svg'} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {product.salePrice && (
                  <Badge className="absolute top-2 right-2 bg-red-500">
                    {Math.round(((product.price - product.salePrice) / product.price) * 100)}% DISKON
                  </Badge>
                )}
              </div>
              
              <CardContent className="p-4 flex-grow flex flex-col">
                <div className="mb-2">
                  <Badge variant="outline" className="mb-1">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-lg line-clamp-2 mb-1">
                    <Link to={`/product/${product.id}`} className="hover:text-leaf-600 transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-auto">
                    {product.description}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-baseline mb-3">
                    <span className="text-lg font-bold">
                      {formatPriceValue(product.salePrice || product.price)}
                    </span>
                    {product.salePrice && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        {formatPriceValue(product.price)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      asChild 
                      className="flex-1"
                    >
                      <Link to={`/product/${product.id}`}>
                        {t('View Product')}
                      </Link>
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                    >
                      {t('Add to Cart')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
