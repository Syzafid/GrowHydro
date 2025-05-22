
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Box, Check, ShoppingCart, ArrowLeft } from 'lucide-react';
import { getProductById, Product, getFeaturedProducts } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import { toast } from "@/components/ui/sonner";
import ProductReviews, { ProductReview } from '@/components/ProductDetails/ProductReviews';
import ProductSpecifications, { ProductSpecificationGroup } from '@/components/ProductDetails/ProductSpecifications';

// Mock reviews data
const mockReviews: ProductReview[] = [
  {
    id: "r1",
    user: { 
      name: "John D.", 
      avatar: "/images/avatars/user1.jpg" 
    },
    rating: 5,
    title: "Perfect for my apartment!",
    comment: "I've been using this hydroponic system for about a month now and it's perfect for my small apartment. Easy to set up and the plants are growing faster than expected. Highly recommended for beginners!",
    date: new Date("2024-04-10"),
    helpful: 24,
    verified: true,
    images: ["/images/reviews/review1-1.jpg", "/images/reviews/review1-2.jpg"]
  },
  {
    id: "r2",
    user: { 
      name: "Sarah M.", 
      avatar: "/images/avatars/user2.jpg" 
    },
    rating: 4,
    title: "Great product with minor issues",
    comment: "The system works really well and I'm getting great results with my herbs. The only issue I had was with the pump that was a bit noisy at first but settled down after a few days. Customer service was very helpful when I reached out about it.",
    date: new Date("2024-04-05"),
    helpful: 16,
    verified: true
  },
  {
    id: "r3",
    user: { 
      name: "Michael P.", 
      avatar: "/images/avatars/user3.jpg" 
    },
    rating: 3,
    title: "Decent but needs improvements",
    comment: "The system works okay but the instructions could be clearer. I had to look up some YouTube videos to figure out certain parts of the setup. Once it was running though, the plants grew well.",
    date: new Date("2024-03-28"),
    helpful: 9,
    verified: true
  },
  {
    id: "r4",
    user: { 
      name: "Emma K.", 
      avatar: "/images/avatars/user4.jpg" 
    },
    rating: 5,
    title: "Best gardening investment ever!",
    comment: "This hydroponic system has completely changed how I grow herbs at home. The growth rate is impressive and everything tastes so much better than store-bought. Very satisfied with this purchase.",
    date: new Date("2024-04-15"),
    helpful: 32,
    verified: true,
    images: ["/images/reviews/review4-1.jpg"]
  },
  {
    id: "r5",
    user: { 
      name: "David L.", 
      avatar: "/images/avatars/user5.jpg" 
    },
    rating: 2,
    title: "Disappointed with quality",
    comment: "I was excited to try this system but was disappointed with the build quality. Some of the plastic parts feel flimsy and I worry about longevity. The plants do grow well though.",
    date: new Date("2024-03-20"),
    helpful: 7,
    verified: false
  }
];

// Mock specifications data
const mockSpecifications: { [key: string]: ProductSpecificationGroup[] } = {
  "default": [
    {
      title: "General",
      specs: [
        { name: "Brand", value: "GrowSpace" },
        { name: "Model", value: "Hydro Pro 2000" },
        { name: "Warranty", value: "1 year limited warranty" },
      ]
    },
    {
      title: "Dimensions & Capacity",
      specs: [
        { name: "Dimensions", value: "18\" L × 12\" W × 24\" H (45.7 × 30.5 × 61 cm)" },
        { name: "Weight", value: "8.5 lbs (3.9 kg)" },
        { name: "Plant Capacity", value: "Up to 12 plants depending on type" },
        { name: "Water Reservoir", value: "2.5 gallons (9.5 L)" },
      ]
    },
    {
      title: "Technical Specifications",
      specs: [
        { name: "Power Source", value: "Electric (110-240V)" },
        { name: "Pump", value: "12V DC submersible pump" },
        { name: "Lighting", value: "Integrated LED grow lights, full spectrum" },
        { name: "Light Intensity", value: "Adjustable, 3 settings" },
        { name: "Light Timer", value: "Built-in, programmable 24-hour cycle" },
      ]
    },
    {
      title: "Materials & Construction",
      specs: [
        { name: "Main Construction", value: "BPA-free plastic" },
        { name: "Reservoir Material", value: "Food-grade HDPE" },
        { name: "Growing Medium", value: "Includes coconut fiber pods" },
      ]
    }
  ]
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get related products (for simplicity, using featured products)
        const featured = getFeaturedProducts().filter(p => p.id !== foundProduct.id);
        setRelatedProducts(featured.slice(0, 4));
      }
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      toast.success(`Added ${quantity} × ${product.name} to your cart`);
    }
  };

  const handleTryAR = () => {
    toast.info("AR Preview mode activated. Point your camera at a flat surface.");
  };
  
  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <p>Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Link to="/shop" className="flex items-center text-leaf-700 mb-6 hover:text-leaf-600">
            <ArrowLeft size={16} className="mr-1" />
            Back to Shop
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`aspect-square bg-gray-100 rounded border-2 ${
                      activeImage === index ? 'border-leaf-500' : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {product.bestseller && (
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">
                    Bestseller
                  </span>
                )}
                {product.new && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    New Arrival
                  </span>
                )}
                {product.salePrice && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                    Sale
                  </span>
                )}
                {product.arEnabled && (
                  <span className="px-3 py-1 bg-leaf-100 text-leaf-700 text-sm font-medium rounded-full flex items-center">
                    <Box size={14} className="mr-1" />
                    AR Preview
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl font-display font-semibold text-leaf-800 mb-2">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-6">
                {product.salePrice ? (
                  <div className="flex items-center">
                    <span className="text-2xl font-semibold text-leaf-700 mr-2">
                      ${product.salePrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 text-sm font-medium rounded">
                      Save ${(product.price - product.salePrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-semibold text-leaf-700">
                    ${product.price.toFixed(2)}
                  </span>
                )}
                <p className="text-gray-500 text-sm mt-1">
                  Free shipping on orders over $75
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700">
                  {product.description}
                </p>
              </div>
              
              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <p className="flex items-center text-green-600">
                    <Check size={16} className="mr-1" />
                    In Stock ({product.stock} available)
                  </p>
                ) : (
                  <p className="text-red-600">Out of Stock</p>
                )}
              </div>
              
              {/* Quantity and Add to Cart */}
              {product.stock > 0 && (
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex border border-gray-300 rounded-md">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 border-r border-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-16 text-center py-2"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-2 border-l border-gray-300"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="flex-grow lg:flex-grow-0 btn-primary flex items-center justify-center"
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </button>
                  
                  {product.arEnabled && (
                    <button 
                      onClick={handleTryAR}
                      className="flex-grow lg:flex-grow-0 btn-outline flex items-center justify-center"
                    >
                      <Box size={18} className="mr-2" />
                      Try with AR
                    </button>
                  )}
                </div>
              )}
              
              {/* Product Features and Specifications */}
              <Tabs defaultValue="features">
                <TabsList>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="features" className="mt-4">
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check size={18} className="text-leaf-600 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="specs" className="mt-4">
                  <ProductSpecifications groups={mockSpecifications["default"]} />
                </TabsContent>
                <TabsContent value="reviews" className="mt-4">
                  <ProductReviews 
                    reviews={mockReviews} 
                    averageRating={product.rating} 
                    totalReviews={product.reviewCount} 
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <ProductGrid products={relatedProducts} title="You May Also Like" />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
