
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFeaturedPosts } from '@/data/blog';

const BlogPreview: React.FC = () => {
  const blogPosts = getFeaturedPosts(3);

  return (
    <section className="py-12 md:py-20 bg-leaf-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-display font-semibold text-leaf-800">From Our Blog</h2>
          <Link to="/blog" className="btn-outline">
            View All Posts
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link 
                to={`/blog/${post.slug}`} 
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 block h-full"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium bg-leaf-100 text-leaf-800 px-3 py-1 rounded-full">{post.category}</span>
                    <span className="text-sm text-gray-500 ml-3">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-medium text-leaf-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <div className="mt-4 text-leaf-600 font-medium text-sm hover:text-leaf-700">
                    Read More →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
