
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data for wishlist items
const mockWishlistItems = [
  {
    id: 1,
    name: 'Vertical Hydroponic Tower',
    price: 199.99,
    image: '/placeholder.svg',
    category: 'Growing Kits',
    dateAdded: new Date(2023, 10, 15),
    inStock: true
  },
  {
    id: 2,
    name: 'Premium Herb Seed Pack',
    price: 24.99,
    image: '/placeholder.svg',
    category: 'Seeds & Plants',
    dateAdded: new Date(2023, 10, 10),
    inStock: true
  },
  {
    id: 3,
    name: 'Smart Garden Controller',
    price: 89.99,
    image: '/placeholder.svg',
    category: 'Equipment & Parts',
    dateAdded: new Date(2023, 10, 5),
    inStock: false
  },
  {
    id: 4,
    name: 'Organic Plant Nutrients',
    price: 19.99,
    image: '/placeholder.svg',
    category: 'Nutrients & Supplements',
    dateAdded: new Date(2023, 9, 20),
    inStock: true
  }
];

// Get all unique categories
const categories = ['All', ...new Set(mockWishlistItems.map(item => item.category))];

const WishlistPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);
  const [filteredItems, setFilteredItems] = useState(mockWishlistItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    let items = [...wishlistItems];
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      items = items.filter(item => item.category === selectedCategory);
    }
    
    // Apply sorting
    items.sort((a, b) => {
      if (sortOrder === 'newest') {
        return b.dateAdded.getTime() - a.dateAdded.getTime();
      } else {
        return a.dateAdded.getTime() - b.dateAdded.getTime();
      }
    });
    
    setFilteredItems(items);
  }, [wishlistItems, selectedCategory, sortOrder]);

  const handleRemoveFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast.success(t('Item removed from wishlist'));
  };

  const handleAddToCart = (id: number, name: string) => {
    // In a real app, you would add the item to the cart here
    console.log('Adding to cart:', id);
    toast.success(`${name} ${t('added to cart')}`);
  };

  // Function to format currency based on selected language
  const formatCurrency = (price: number): string => {
    if (language === 'id') {
      // Format as Indonesian Rupiah
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price * 15000); // Assuming 1 USD = 15000 IDR
    } else {
      // Format as USD
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(price);
    }
  };

  // Format date based on selected language
  const formatDate = (date: Date): string => {
    if (language === 'id') {
      return date.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('My Wishlist')}</h1>
        <p className="text-gray-600">{t("Items you've saved for later")}</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">{t('Your wishlist is empty')}</h3>
          <p className="mt-1 text-gray-500">{t('Save items you like to shop for them later.')}</p>
          <Button asChild className="mt-6">
            <Link to="/shop">{t('Browse Products')}</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Filters and Sorting */}
          <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
            <div className="flex gap-4 items-center">
              <p className="text-sm font-medium">{filteredItems.length} {t('items')}</p>
              
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={t('Filter by Category')} />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  {t('Sort by Date')}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem 
                  onClick={() => setSortOrder('newest')}
                  className={sortOrder === 'newest' ? 'bg-accent' : ''}
                >
                  {t('Newest First')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setSortOrder('oldest')}
                  className={sortOrder === 'oldest' ? 'bg-accent' : ''}
                >
                  {t('Oldest First')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Wishlist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-full h-full"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${item.id}`} className="font-medium hover:text-leaf-600">
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <p className="font-bold">{formatCurrency(item.price)}</p>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      {t('Added')}: {formatDate(item.dateAdded)}
                    </div>
                    
                    <Button
                      className="w-full bg-leaf-600 hover:bg-leaf-700 mt-2"
                      disabled={!item.inStock}
                      onClick={() => handleAddToCart(item.id, item.name)}
                    >
                      <ShoppingCart size={16} className="mr-2" />
                      {item.inStock ? t('Add to Cart') : t('Out of stock')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WishlistPage;
