
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from "@/components/ui/badge";
import { getBlogPostBySlug, getRelatedPosts } from '@/data/blog';
import { BlogPost as BlogPostType } from '@/types/blog';
import Newsletter from '@/components/Newsletter';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogPost: React.FC = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (slug) {
      const fetchedPost = getBlogPostBySlug(slug);
      setPost(fetchedPost);
      
      if (fetchedPost) {
        const related = getRelatedPosts(fetchedPost.id, fetchedPost.category);
        setRelatedPosts(related);
      }
    }
  }, [slug]);

  if (!post) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <p>Loading post...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative">
          <div className="h-64 md:h-96 w-full overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex items-end">
              <div className="container mx-auto px-6 pb-12">
                <Link to="/blog" className="inline-flex items-center text-white/90 mb-4 hover:text-white transition-colors">
                  <ArrowLeft size={16} className="mr-1" />
                  {t('Back to all articles')}
                </Link>
                <Badge className="mb-3">{t(post.category)}</Badge>
                <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-display font-bold max-w-3xl">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center pb-6 mb-6 border-b border-gray-100">
                    <div className="flex items-center mr-6">
                      <User size={18} className="text-leaf-600 mr-2" />
                      <span className="text-sm text-gray-700">{post.author.name}</span>
                    </div>
                    <div className="flex items-center mr-6">
                      <Calendar size={18} className="text-leaf-600 mr-2" />
                      <span className="text-sm text-gray-700">{post.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="text-leaf-600 mr-2" />
                      <span className="text-sm text-gray-700">{post.readTime} min read</span>
                    </div>
                  </div>
                  
                  <div className="prose prose-leaf prose-lg max-w-none">
                    <p className="text-lg font-medium text-gray-700 mb-6">{post.excerpt}</p>
                    
                    <h2>Introduction to Hydroponics</h2>
                    <p>
                      Hydroponics represents a revolutionary approach to growing plants without soil, 
                      instead using nutrient-rich water solutions to deliver essential elements 
                      directly to the plant roots. This method offers numerous advantages over 
                      traditional soil-based cultivation, including faster growth rates, higher yields, 
                      and more efficient use of space and resources.
                    </p>
                    
                    <div className="my-8 rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=800" 
                        alt="Hydroponic System" 
                        className="w-full h-auto"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        A modern hydroponic system growing leafy greens
                      </p>
                    </div>
                    
                    <h2>Benefits of Hydroponic Growing</h2>
                    <ul>
                      <li>
                        <strong>Water Efficiency</strong> - Hydroponic systems typically use up to 90% less water 
                        than traditional soil-based methods since water is recirculated.
                      </li>
                      <li>
                        <strong>Space Efficiency</strong> - Plants can be grown closer together because roots 
                        have direct access to nutrients, allowing for more plants in less space.
                      </li>
                      <li>
                        <strong>Faster Growth</strong> - Plants grown hydroponically often mature 30-50% faster 
                        than soil-grown plants.
                      </li>
                      <li>
                        <strong>Year-round Growing</strong> - Indoor hydroponic systems enable cultivation 
                        regardless of season or climate conditions.
                      </li>
                    </ul>
                    
                    <h2>Getting Started with Your System</h2>
                    <p>
                      Setting up your first hydroponic system might seem daunting, but by breaking it 
                      down into manageable steps, you'll be growing in no time. Begin by determining which 
                      type of system best suits your needs, space, and the plants you wish to grow.
                    </p>
                    
                    <div className="my-8 rounded-lg overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=800" 
                        alt="Home Hydroponic Setup" 
                        className="w-full h-auto"
                      />
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        A simple home hydroponic setup perfect for beginners
                      </p>
                    </div>
                    
                    <p>
                      Whether you choose a deep water culture, nutrient film technique, or ebb and flow system, 
                      remember that monitoring pH levels, nutrient concentration, and temperature is crucial 
                      for success. Start with easy-to-grow plants like lettuce, herbs, or spinach as you 
                      learn to manage your new hydroponic garden.
                    </p>
                    
                    <blockquote>
                      "Hydroponics isn't just a method of growing plants—it's a sustainable approach 
                      to food production that maximizes efficiency while minimizing environmental impact."
                    </blockquote>
                    
                    <h2>Conclusion</h2>
                    <p>
                      As you embark on your hydroponic journey, remember that learning comes through 
                      experience. Don't be discouraged by initial challenges—each adjustment brings 
                      you closer to mastering this efficient growing method. With patience and attention 
                      to detail, you'll soon be enjoying the benefits of your own hydroponic harvest.
                    </p>
                  </div>
                  
                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-gray-700 font-medium">Tags:</span>
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-gray-100 hover:bg-gray-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Author Bio */}
                  <div className="mt-12 pt-6 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                        <img 
                          src={post.author.avatar} 
                          alt={post.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{post.author.name}</h3>
                        <p className="text-leaf-600 mb-2">{post.author.role}</p>
                        <p className="text-gray-600">{post.author.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Author Card */}
              <div className="bg-leaf-50 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">{t('About the Author')}</h3>
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-leaf-800">{post.author.name}</h4>
                    <p className="text-sm text-gray-600">{post.author.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  {post.author.bio.substring(0, 120)}...
                </p>
                <Link to={`/author/${post.author.id}`} className="mt-4 inline-block text-leaf-600 hover:text-leaf-700 font-medium text-sm">
                  {t('View all posts by this author')} →
                </Link>
              </div>
              
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-4">{t('Related Articles')}</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id}
                        to={`/blog/${relatedPost.slug}`} 
                        className="flex items-start hover:bg-leaf-50 p-2 rounded-lg transition-colors"
                      >
                        <div className="w-16 h-16 rounded overflow-hidden mr-3">
                          <img 
                            src={relatedPost.image} 
                            alt={relatedPost.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-leaf-800 text-sm">{relatedPost.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{relatedPost.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Categories */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">{t('Categories')}</h3>
                <div className="space-y-2">
                  <Link to="/blog/category/guides" className="block p-2 hover:bg-leaf-50 rounded-md transition-colors">
                    {t('Guides')}
                  </Link>
                  <Link to="/blog/category/growing-tips" className="block p-2 hover:bg-leaf-50 rounded-md transition-colors">
                    {t('Growing Tips')}
                  </Link>
                  <Link to="/blog/category/maintenance" className="block p-2 hover:bg-leaf-50 rounded-md transition-colors">
                    {t('Maintenance')}
                  </Link>
                  <Link to="/blog/category/innovations" className="block p-2 hover:bg-leaf-50 rounded-md transition-colors">
                    {t('Innovations')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* More Articles */}
          <div className="mt-16">
            <h2 className="text-2xl font-display font-semibold mb-6">{t('More Articles')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link to={`/blog/${relatedPost.slug}`} className="block">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-3">
                        <Badge variant="outline" className="bg-leaf-100 text-leaf-800 hover:bg-leaf-200">
                          {t(relatedPost.category)}
                        </Badge>
                        <span className="text-sm text-gray-500 ml-3">{relatedPost.date}</span>
                      </div>
                      <h3 className="text-xl font-medium text-leaf-800 mb-2 hover:text-leaf-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
