
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { Badge } from "@/components/ui/badge";
import { getAllProducts, Product } from '@/data/products';
import { Filter, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Shop: React.FC = () => {
  const { t, language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(getAllProducts());
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = [
    { id: 'Equipment', name: t('Equipment') },
    { id: 'Seeds & Plants', name: t('Seeds & Plants') },
    { id: 'Starter Kits', name: t('Starter Kits') },
    { id: 'Nutrients Supplements', name: t('Nutrients Supplements') }
  ];
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Filter products based on active category and price range
    let filtered = [...getAllProducts()];
    
    if (activeCategory) {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    filtered = filtered.filter(product => 
      (product.salePrice || product.price) >= priceRange[0] && 
      (product.salePrice || product.price) <= priceRange[1]
    );
    
    setFilteredProducts(filtered);
  }, [activeCategory, priceRange]);

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Shop Header */}
        <section className="py-8 bg-leaf-50">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-leaf-800 mb-2">{t('Shop')}</h1>
            <p className="text-gray-600 max-w-3xl">
              {t('Find quality hydroponic equipment, seeds, and accessories for your indoor garden.')}
            </p>
          </div>
        </section>
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden container mx-auto px-4 py-4">
          <button 
            className="flex items-center gap-2 btn-secondary w-full justify-center"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? <X size={18} /> : <Filter size={18} />}
            {showFilters ? t('Hide Filters') : t('Show Filters')}
          </button>
        </div>
        
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-3">{t('Categories')}</h3>
                  <div className="space-y-2">
                    <button 
                      className={`block w-full text-left px-2 py-1.5 rounded-md ${activeCategory === null ? 'bg-leaf-100 text-leaf-800' : 'hover:bg-gray-100'}`}
                      onClick={() => setActiveCategory(null)}
                    >
                      {t('All Products')}
                    </button>
                    {categories.map((category) => (
                      <button 
                        key={category.id}
                        className={`block w-full text-left px-2 py-1.5 rounded-md ${activeCategory === category.id ? 'bg-leaf-100 text-leaf-800' : 'hover:bg-gray-100'}`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-3">{t('Price Range')}</h3>
                  <div className="px-2">
                    <div className="flex justify-between mb-2">
                      <span>{formatToRupiah(priceRange[0])}</span>
                      <span>{formatToRupiah(priceRange[1])}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* AR Filter */}
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-medium text-lg mb-3">{t('Features')}</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-leaf-600" />
                      <span>{t('AR Preview Available')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-leaf-600" />
                      <span>{t('On Sale')}</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded text-leaf-600" />
                      <span>{t('In Stock')}</span>
                    </label>
                  </div>
                </div>
              </div>
            </aside>
            
            {/* Product Grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-gray-600">
                    {t('Showing')} <span className="font-medium">{filteredProducts.length}</span> {t('products')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {activeCategory && (
                    <Badge 
                      className="bg-leaf-100 text-leaf-800 hover:bg-leaf-200"
                      onClick={() => setActiveCategory(null)}
                    >
                      {categories.find(c => c.id === activeCategory)?.name}
                      <X size={14} className="ml-1" />
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Product listing */}
              {filteredProducts.length > 0 ? (
                <ProductGrid products={filteredProducts} formatPrice={formatToRupiah} />
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">{t('No products found')}</h3>
                  <p className="text-gray-600">{t('Try adjusting your filters or category')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
