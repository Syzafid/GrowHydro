
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";
import { getBlogPosts } from '@/data/blog';
import { BlogPost } from '@/types/blog';
import Newsletter from '@/components/Newsletter';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const Blog: React.FC = () => {
  const { t } = useLanguage();
  const blogPosts = getBlogPosts();
  const featuredPost = blogPosts[0];
  const recentPosts = blogPosts.slice(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Blog Hero */}
        <div className="relative">
          <div className="h-64 md:h-96 w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1440" 
              alt="Hydroponic Blog" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-leaf-800/70 to-blue-800/60 flex items-center">
              <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl text-white font-display font-bold">{t('Hydroponic Insights')}</h1>
                <p className="text-white/90 mt-2 max-w-lg text-lg">
                  {t('Tips, guides, and inspiration for your hydroponic garden journey.')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-display font-semibold mb-6">{t('Featured Article')}</h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-5 gap-8 bg-gradient-to-br from-white to-cream-50 p-6 rounded-xl shadow-md overflow-hidden"
              >
                <div className="lg:col-span-2 h-64 lg:h-full overflow-hidden rounded-lg">
                  <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="lg:col-span-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center mb-3 space-x-3">
                      <Badge variant="outline" className="bg-leaf-100 text-leaf-800 hover:bg-leaf-200">
                        {t(featuredPost.category)}
                      </Badge>
                      <span className="text-sm text-gray-500">{featuredPost.date}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-semibold mb-4">
                      <Link to={`/blog/${featuredPost.slug}`} className="text-leaf-800 hover:text-leaf-600 transition-colors">
                        {featuredPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-700 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <img 
                        src={featuredPost.author.avatar} 
                        alt={featuredPost.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-leaf-800">{featuredPost.author.name}</p>
                      <p className="text-sm text-gray-600">{featuredPost.author.role}</p>
                    </div>
                    <div className="ml-auto">
                      <Link 
                        to={`/blog/${featuredPost.slug}`} 
                        className="px-5 py-2 bg-gradient-to-r from-leaf-500 to-leaf-600 text-white rounded-full hover:shadow-md transition-all duration-300"
                      >
                        {t('Read More')}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Recent Posts */}
          <div className="mb-16">
            <h2 className="text-2xl font-display font-semibold mb-6">{t('Recent Articles')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Badge variant="outline" className="bg-leaf-100 text-leaf-800 hover:bg-leaf-200">
                          {t(post.category)}
                        </Badge>
                        <span className="text-sm text-gray-500 ml-3">{post.date}</span>
                      </div>
                      <h3 className="text-xl font-medium text-leaf-800 mb-2 hover:text-leaf-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                          <img 
                            src={post.author.avatar} 
                            alt={post.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-700">{post.author.name}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-display font-semibold mb-6">{t('Categories')}</h2>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <ul className="space-y-3">
                  <li>
                    <Link to="/blog/category/guides" className="flex items-center justify-between p-3 rounded-lg hover:bg-leaf-50 transition-colors">
                      <span>{t('Guides')}</span>
                      <Badge>{blogPosts.filter(post => post.category === 'Guides').length}</Badge>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog/category/growing-tips" className="flex items-center justify-between p-3 rounded-lg hover:bg-leaf-50 transition-colors">
                      <span>{t('Growing Tips')}</span>
                      <Badge>{blogPosts.filter(post => post.category === 'Growing Tips').length}</Badge>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog/category/maintenance" className="flex items-center justify-between p-3 rounded-lg hover:bg-leaf-50 transition-colors">
                      <span>{t('Maintenance')}</span>
                      <Badge>{blogPosts.filter(post => post.category === 'Maintenance').length}</Badge>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog/category/innovations" className="flex items-center justify-between p-3 rounded-lg hover:bg-leaf-50 transition-colors">
                      <span>{t('Innovations')}</span>
                      <Badge>{blogPosts.filter(post => post.category === 'Innovations').length}</Badge>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h2 className="text-2xl font-display font-semibold mb-6">{t('Popular Posts')}</h2>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <ul className="divide-y divide-gray-200">
                  {blogPosts.slice(0, 5).map((post) => (
                    <li key={post.id} className="py-4 first:pt-0 last:pb-0">
                      <Link to={`/blog/${post.slug}`} className="flex items-center hover:bg-leaf-50 p-2 rounded-lg transition-colors">
                        <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-leaf-800 hover:text-leaf-600">{post.title}</h4>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-gray-500 mr-2">{post.date}</span>
                            <Badge variant="outline" className="text-xs">{t(post.category)}</Badge>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
