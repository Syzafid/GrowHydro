
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Badge } from "@/components/ui/badge";
import { getAllProducts, getProductsByCategory, Product } from '@/data/products';
import { Filter, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

type CategoryMapping = {
  [key: string]: {
    title: string;
    description: string;
    image: string;
  };
};

const ShopCategory: React.FC = () => {
  const { t, language } = useLanguage();
  const { category } = useParams<{ category: string }>();
  const normalizedCategory = category?.toLowerCase() || 'all';
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const categoryData: CategoryMapping = {
    "systems": {
      title: t("Hydroponic Systems"),
      description: t("Complete growing systems designed for various spaces, plants, and experience levels. From beginner-friendly countertop gardens to professional multi-plant systems."),
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=800"
    },
    "seeds": {
      title: t("Plant Seeds"),
      description: t("Premium seeds specially selected for optimal growth in hydroponic environments. Choose from herbs, vegetables, flowers, and specialty varieties."),
      image: "https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&q=80&w=800"
    },
    "kits": {
      title: t("Starter Kits"),
      description: t("All-inclusive kits containing everything you need to begin your hydroponic journey. Perfect for beginners looking to grow their first plants."),
      image: "https://images.unsplash.com/photo-1446071103084-c257b5f70672?auto=format&fit=crop&q=80&w=800"
    },
    "accessories": {
      title: t("Accessories"),
      description: t("Essential tools and accessories to maintain and optimize your hydroponic garden, from pH meters to nutrient solutions and replacement parts."),
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=800"
    },
    "all": {
      title: t("Shop All Products"),
      description: t("Browse our complete catalog of hydroponic systems, seeds, accessories, and more. Everything you need for successful indoor gardening."),
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800"
    }
  };
  
  // Get appropriate title and description based on the category
  const categoryInfo = categoryData[normalizedCategory] || categoryData.all;
  
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
    
    // Get products based on category
    let products: Product[];
    
    if (normalizedCategory === 'all') {
      products = getAllProducts();
    } else {
      // For category pages, map the URL parameter to the actual category name in the data
      const categoryMap: {[key: string]: string} = {
        'systems': 'Systems',
        'seeds': 'Seeds',
        'kits': 'Kits',
        'accessories': 'Accessories'
      };
      
      const mappedCategory = categoryMap[normalizedCategory] || normalizedCategory;
      products = getProductsByCategory(mappedCategory);
    }
    
    // Apply price filter
    const filtered = products.filter(product => {
      const price = product.salePrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    setFilteredProducts(filtered);
  }, [normalizedCategory, priceRange]);

  const handlePriceChange = (values: [number, number]) => {
    setPriceRange(values);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Function to format currency based on selected language
  const formatToRupiah = (price: number): string => {
    if (language === 'id') {
      // Indonesian format (IDR)
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price * 15000); // Assuming 1 USD = 15000 IDR
    } else {
      // English format (USD)
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      
      {/* Category Hero */}
      <div className="relative">
        <div className="h-64 md:h-80 bg-gray-900">
          <img
            src={categoryInfo.image}
            alt={categoryInfo.title}
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-leaf-800/80 to-leaf-600/40" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              {categoryInfo.title}
            </h1>
            <p className="text-white text-lg md:text-xl max-w-xl">
              {categoryInfo.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleFilters}
            className="w-full flex justify-center items-center gap-2 py-2 bg-gray-100 rounded-md text-gray-800"
          >
            {showFilters ? (
              <>
                <X size={18} /> {t('Hide Filters')}
              </>
            ) : (
              <>
                <Filter size={18} /> {t('Show Filters')}
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop always visible, mobile toggleable */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block md:w-1/4 lg:w-1/5 animate-fade-in`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
              <h2 className="text-xl font-semibold text-leaf-800 mb-4">{t('Filters')}</h2>
              
              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-800 mb-3">{t('Price Range')}</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">{formatToRupiah(priceRange[0])}</span>
                  <span className="text-gray-600">{formatToRupiah(priceRange[1])}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={300}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange([Number(e.target.value), priceRange[1]])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <input
                  type="range"
                  min={0}
                  max={300}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange([priceRange[0], Number(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                />
              </div>
              
              {/* Product Status */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-800 mb-3">{t('Product Status')}</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-leaf-600 focus:ring-leaf-500" />
                    <span className="text-gray-700">{t('In Stock')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-leaf-600 focus:ring-leaf-500" />
                    <span className="text-gray-700">{t('On Sale')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-leaf-600 focus:ring-leaf-500" />
                    <span className="text-gray-700">{t('New Arrivals')}</span>
                  </label>
                </div>
              </div>
              
              {/* AR Features */}
              <div className="mb-6">
                <h3 className="text-md font-medium text-gray-800 mb-3">{t('Features')}</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-leaf-600 focus:ring-leaf-500" />
                    <span className="text-gray-700">{t('AR Compatible')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-leaf-600 focus:ring-leaf-500" />
                    <span className="text-gray-700">{t('Beginner Friendly')}</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-leaf-600 focus:ring-leaf-500" />
                    <span className="text-gray-700">{t('Smart Features')}</span>
                  </label>
                </div>
              </div>
              
              {/* Clear Filters Button */}
              <button className="w-full py-2 border border-leaf-600 text-leaf-600 rounded-md hover:bg-leaf-50 transition-colors">
                {t('Clear Filters')}
              </button>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Product Count */}
            <div className="flex flex-wrap justify-between items-center mb-6">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600">
                  {t('Showing')} <span className="font-medium text-leaf-800">{filteredProducts.length}</span> {t('products')}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-leaf-100 text-leaf-700 hover:bg-leaf-200 hover:text-leaf-800 cursor-pointer">
                  {t('Top Rated')}
                </Badge>
                <Badge variant="outline" className="bg-leaf-100 text-leaf-700 hover:bg-leaf-200 hover:text-leaf-800 cursor-pointer">
                  {t('Price: Low to High')}
                </Badge>
                <Badge variant="outline" className="bg-leaf-100 text-leaf-700 hover:bg-leaf-200 hover:text-leaf-800 cursor-pointer">
                  {t('Price: High to Low')}
                </Badge>
              </div>
            </div>
            
            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} formatPrice={formatToRupiah} />
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-600">{t('No products found matching your criteria.')}</p>
                <button 
                  className="mt-4 btn-outline"
                  onClick={() => setPriceRange([0, 300])}
                >
                  {t('Reset Filters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default ShopCategory;
