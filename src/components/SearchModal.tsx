
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { BlogPost, Author } from '@/types/blog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock search data
const mockProducts: Product[] = [
  {
    id: "prod1",
    name: "Mini Hydroponic System",
    description: "Compact hydroponic system perfect for growing herbs and small vegetables in apartments.",
    price: 99.99,
    stock: 15,
    rating: 4.5,
    reviewCount: 28,
    features: ["Compact design", "Built-in LED light", "Self-watering system"],
    images: ["/images/products/mini-hydro-1.jpg", "/images/products/mini-hydro-2.jpg"],
    bestseller: true,
    new: false,
    arEnabled: true,
    category: "systems",
  },
  {
    id: "prod2",
    name: "Herb Seed Collection",
    description: "A collection of 12 different herb seeds optimized for hydroponic growing.",
    price: 24.99,
    salePrice: 19.99,
    stock: 42,
    rating: 4.8,
    reviewCount: 56,
    features: ["12 varieties", "High germination rate", "Non-GMO"],
    images: ["/images/products/herb-seeds.jpg"],
    bestseller: true,
    new: false,
    arEnabled: false,
    category: "seeds",
  },
  {
    id: "prod3",
    name: "Advanced Nutrient Solution",
    description: "Balanced nutrient solution for optimal plant growth in any hydroponic system.",
    price: 34.99,
    stock: 27,
    rating: 4.6,
    reviewCount: 32,
    features: ["All-in-one solution", "Balanced pH", "High-yield formula"],
    images: ["/images/products/nutrients.jpg"],
    bestseller: false,
    new: true,
    arEnabled: false,
    category: "accessories",
  }
];

const mockAuthors: Author[] = [
  {
    id: "author-1",
    name: "Emily Chen",
    role: "Hydroponic Expert",
    avatar: "/images/avatars/emily.jpg",
    bio: "Emily has over a decade of experience in hydroponic gardening.",
  },
  {
    id: "author-2",
    name: "Marcus Johnson",
    role: "Plant Scientist",
    avatar: "/images/avatars/marcus.jpg",
    bio: "With a PhD in Plant Biology, Marcus combines scientific knowledge with practical advice.",
  }
];

const mockBlogPosts: BlogPost[] = [
  {
    id: "blog1",
    title: "Getting Started with Hydroponic Growing",
    slug: "getting-started",
    excerpt: "Learn the basics of hydroponic gardening and set up your first system.",
    content: "Full content...",
    image: "/images/blog/getting-started.jpg",
    date: "2024-05-01",
    readTime: 8,
    category: "Beginners",
    tags: ["beginners", "setup", "basics"],
    author: mockAuthors[0]
  },
  {
    id: "blog2",
    title: "Advanced Nutrient Management",
    slug: "nutrient-management",
    excerpt: "Take your hydroponic garden to the next level with advanced nutrient techniques.",
    content: "Full content...",
    image: "/images/blog/nutrients.jpg",
    date: "2024-04-15",
    readTime: 12,
    category: "Advanced",
    tags: ["nutrients", "techniques", "advanced"],
    author: mockAuthors[1]
  }
];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      // Focus the search input when the modal opens
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      
      // Simulate search delay
      const timer = setTimeout(() => {
        const lowerQuery = query.toLowerCase();
        
        // Filter products
        const products = mockProducts.filter(product => 
          product.name.toLowerCase().includes(lowerQuery) || 
          product.description.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery)
        );
        setFilteredProducts(products);
        
        // Filter blog posts
        const posts = mockBlogPosts.filter(post => 
          post.title.toLowerCase().includes(lowerQuery) || 
          post.excerpt.toLowerCase().includes(lowerQuery) ||
          post.category.toLowerCase().includes(lowerQuery) ||
          post.tags.some(tag => tag.includes(lowerQuery))
        );
        setFilteredPosts(posts);
        
        // Filter authors
        const authors = mockAuthors.filter(author => 
          author.name.toLowerCase().includes(lowerQuery) || 
          author.role.toLowerCase().includes(lowerQuery) ||
          author.bio.toLowerCase().includes(lowerQuery)
        );
        setFilteredAuthors(authors);
        
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setFilteredProducts([]);
      setFilteredPosts([]);
      setFilteredAuthors([]);
    }
  }, [query]);
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate full search
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  
  // Handle click outside to close
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4"
        onClick={handleOutsideClick}
      >
        <motion.div 
          ref={modalRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col"
        >
          {/* Search Header */}
          <div className="border-b">
            <div className="p-4">
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <SearchIcon className="w-5 h-5 text-muted-foreground mr-2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products, blogs, or authors..."
                  className="flex-grow bg-transparent border-none outline-none text-lg placeholder:text-muted-foreground"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-muted-foreground"
                >
                  <X className="w-5 h-5" />
                </Button>
              </form>
            </div>
            
            {query.length > 0 && (
              <Tabs 
                value={activeTab} 
                onValueChange={setActiveTab} 
                className="px-4"
              >
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="all">
                    All
                    <Badge variant="outline" className="ml-2">
                      {filteredProducts.length + filteredPosts.length + filteredAuthors.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="products">
                    Products
                    <Badge variant="outline" className="ml-2">
                      {filteredProducts.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="blogs">
                    Blogs
                    <Badge variant="outline" className="ml-2">
                      {filteredPosts.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="authors">
                    Authors
                    <Badge variant="outline" className="ml-2">
                      {filteredAuthors.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>
          
          {/* Search Results */}
          <div className="flex-grow overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-leaf-600"></div>
              </div>
            ) : query.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Start typing to search through our products, blog posts, and authors</p>
              </div>
            ) : (
              <div className="p-4">
                <Tabs value={activeTab} className="w-full">
                  <TabsContent value="all" className="space-y-8">
                    {/* Products Section */}
                    {filteredProducts.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-display font-medium text-lg">Products</h3>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/shop" onClick={onClose}>
                              View all
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                        <div className="space-y-4">
                          {filteredProducts.slice(0, 2).map((product) => (
                            <Link 
                              key={product.id} 
                              to={`/product/${product.id}`}
                              onClick={onClose}
                              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={product.images[0]} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow min-w-0">
                                <h4 className="font-medium truncate">{product.name}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                                <div className="flex items-center mt-1">
                                  <span className="font-medium text-leaf-700">
                                    ${product.salePrice?.toFixed(2) || product.price.toFixed(2)}
                                  </span>
                                  {product.salePrice && (
                                    <span className="text-sm text-muted-foreground line-through ml-2">
                                      ${product.price.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Blog Posts Section */}
                    {filteredPosts.length > 0 && (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-display font-medium text-lg">Blog Posts</h3>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to="/blog" onClick={onClose}>
                              View all
                              <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                        <div className="space-y-4">
                          {filteredPosts.slice(0, 2).map((post) => (
                            <Link 
                              key={post.id} 
                              to={`/blog/${post.slug}`}
                              onClick={onClose}
                              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={post.image} 
                                  alt={post.title} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-grow min-w-0">
                                <h4 className="font-medium truncate">{post.title}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                  <span>{new Date(post.date).toLocaleDateString()}</span>
                                  <span className="mx-1">•</span>
                                  <span>{post.readTime} min read</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Authors Section */}
                    {filteredAuthors.length > 0 && (
                      <div>
                        <div className="mb-4">
                          <h3 className="font-display font-medium text-lg">Authors</h3>
                        </div>
                        <div className="space-y-4">
                          {filteredAuthors.map((author) => (
                            <Link 
                              key={author.id} 
                              to={`/author/${author.id}`}
                              onClick={onClose}
                              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={author.avatar} alt={author.name} />
                                <AvatarFallback>
                                  {author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium">{author.name}</h4>
                                <p className="text-sm text-muted-foreground">{author.role}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* No results */}
                    {filteredProducts.length === 0 && filteredPosts.length === 0 && filteredAuthors.length === 0 && (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">No results found for "{query}"</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Products Tab */}
                  <TabsContent value="products" className="space-y-4">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <Link 
                          key={product.id} 
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="font-medium truncate">{product.name}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                            <div className="flex items-center mt-1">
                              <span className="font-medium text-leaf-700">
                                ${product.salePrice?.toFixed(2) || product.price.toFixed(2)}
                              </span>
                              {product.salePrice && (
                                <span className="text-sm text-muted-foreground line-through ml-2">
                                  ${product.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">No products found for "{query}"</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Blogs Tab */}
                  <TabsContent value="blogs" className="space-y-4">
                    {filteredPosts.length > 0 ? (
                      filteredPosts.map((post) => (
                        <Link 
                          key={post.id} 
                          to={`/blog/${post.slug}`}
                          onClick={onClose}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="font-medium truncate">{post.title}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-1">{post.excerpt}</p>
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                              <span className="mx-1">•</span>
                              <span>{post.readTime} min read</span>
                              <span className="mx-1">•</span>
                              <span>By {post.author.name}</span>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">No blog posts found for "{query}"</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  {/* Authors Tab */}
                  <TabsContent value="authors" className="space-y-4">
                    {filteredAuthors.length > 0 ? (
                      filteredAuthors.map((author) => (
                        <Link 
                          key={author.id} 
                          to={`/author/${author.id}`}
                          onClick={onClose}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={author.avatar} alt={author.name} />
                            <AvatarFallback>
                              {author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{author.name}</h4>
                            <p className="text-sm text-muted-foreground">{author.role}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1 mt-1">{author.bio}</p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground">No authors found for "{query}"</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
          
          {/* Footer with popular searches */}
          {query.length === 0 && (
            <div className="border-t p-4">
              <p className="text-sm text-muted-foreground mb-2">Popular Searches:</p>
              <div className="flex flex-wrap gap-2">
                {["hydroponic system", "led lights", "nutrients", "beginner kit", "herbs"].map((term) => (
                  <button 
                    key={term} 
                    className="px-3 py-1 text-sm bg-muted/50 hover:bg-muted rounded-full transition-colors"
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
