
import { BlogPost } from '@/types/blog';

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Hydroponics: A Beginner\'s Guide',
    slug: 'getting-started-hydroponics',
    excerpt: 'Learn the basics of hydroponic growing and set up your first system with these simple steps.',
    content: 'Full content would go here...',
    image: 'https://i.ebayimg.com/images/g/7PwAAOSw4slfhYHz/s-l1200.jpg',
    date: 'May 2, 2025',
    readTime: 8,
    category: 'Guides',
    tags: ['beginners', 'setup', 'equipment'],
    author: {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Hydroponic Specialist',
      avatar: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=300',
      bio: 'Sarah has been growing plants hydroponically for over 10 years and specializes in helping beginners set up their first systems.'
    }
  },
  {
    id: '2',
    title: 'Top 5 Vegetables for Hydroponic Growing',
    slug: 'top-vegetables-hydroponics',
    excerpt: 'Discover which vegetables thrive in hydroponic systems and how to grow them successfully.',
    content: 'Full content would go here...',
    image: 'https://www.allthatgrows.in/cdn/shop/articles/Feat-Hydroponic_Veg_1024x1024.jpg?v=1644821646',
    date: 'April 28, 2025',
    readTime: 6,
    category: 'Growing Tips',
    tags: ['vegetables', 'growing', 'recommendations'],
    author: {
      id: '2',
      name: 'Michael Chen',
      role: 'Urban Farming Expert',
      avatar: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=300',
      bio: 'Michael runs an urban hydroponic farm in Seattle and is passionate about sustainable food production in cities.'
    }
  },
  {
    id: '3',
    title: 'Troubleshooting Common Hydroponic Problems',
    slug: 'troubleshooting-hydroponics',
    excerpt: 'Solutions to the most common issues you might encounter with your hydroponic garden.',
    content: 'Full content would go here...',
    image: 'https://help.gardeningexpress.co.uk/wp-content/uploads/2023/06/Hydroponics-22.png',
    date: 'April 15, 2025',
    readTime: 10,
    category: 'Maintenance',
    tags: ['troubleshooting', 'solutions', 'maintenance'],
    author: {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Hydroponic Specialist',
      avatar: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=300',
      bio: 'Sarah has been growing plants hydroponically for over 10 years and specializes in helping beginners set up their first systems.'
    }
  },
  {
    id: '4',
    title: 'The Ultimate Guide to Hydroponic Nutrients',
    slug: 'hydroponic-nutrients-guide',
    excerpt: 'Everything you need to know about selecting and mixing nutrients for your hydroponic system.',
    content: 'Full content would go here...',
    image: 'https://envirevoagritech.com/wp-content/uploads/2023/05/10.jpeg',
    date: 'April 5, 2025',
    readTime: 12,
    category: 'Guides',
    tags: ['nutrients', 'solutions', 'chemistry'],
    author: {
      id: '3',
      name: 'Dr. Emily Roberts',
      role: 'Plant Scientist',
      avatar: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=300',
      bio: 'Dr. Roberts has a PhD in Plant Science and researches optimized nutrient solutions for hydroponic crops.'
    }
  },
  {
    id: '5',
    title: 'LED Lighting for Hydroponics: A Complete Guide',
    slug: 'led-lighting-hydroponics',
    excerpt: 'How to choose and set up the right LED lighting system for your hydroponic garden.',
    content: 'Full content would go here...',
    image: 'https://growlight.co.nz/wp-content/uploads/2025/05/Setting-Up-Hydroponic-LED-Grow-Lights-A-Complete-Guide-for-NZ-Farmers.webp',
    date: 'March 28, 2025',
    readTime: 9,
    category: 'Equipment',
    tags: ['lighting', 'equipment', 'LED'],
    author: {
      id: '4',
      name: 'James Wilson',
      role: 'Hydroponic Equipment Specialist',
      avatar: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=300',
      bio: 'James has been designing and installing hydroponic systems for commercial and home use for over 15 years.'
    }
  },
  {
    id: '6',
    title: 'Vertical Hydroponics: Maximizing Your Space',
    slug: 'vertical-hydroponics-space',
    excerpt: 'Learn how to grow upward instead of outward with vertical hydroponic systems.',
    content: 'Full content would go here...',
    image: 'https://cdn.nuleaffarms.ca/wp-content/uploads/2024/07/Space-and-Efficiency-in-Indoor-Farming.jpg',
    date: 'March 15, 2025',
    readTime: 7,
    category: 'Innovations',
    tags: ['vertical', 'space-saving', 'design'],
    author: {
      id: '2',
      name: 'Michael Chen',
      role: 'Urban Farming Expert',
      avatar: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=300',
      bio: 'Michael runs an urban hydroponic farm in Seattle and is passionate about sustainable food production in cities.'
    }
  },
  {
    id: '7',
    title: 'Hydroponic vs. Soil Growing: Pros and Cons',
    slug: 'hydroponic-vs-soil',
    excerpt: 'A detailed comparison of traditional soil gardening and hydroponic methods.',
    content: 'Full content would go here...',
    image: 'https://media.licdn.com/dms/image/v2/D5612AQFuYPOvNwZ9jA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1723785251554?e=2147483647&v=beta&t=v3YnWE0PgcihGxbalYHntxsio0D6vSGg4v3CAmcCNOg',
    date: 'March 5, 2025',
    readTime: 11,
    category: 'Guides',
    tags: ['comparison', 'soil', 'methods'],
    author: {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Hydroponic Specialist',
      avatar: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=300',
      bio: 'Sarah has been growing plants hydroponically for over 10 years and specializes in helping beginners set up their first systems.'
    }
  },
  {
    id: '8',
    title: 'Automation in Hydroponics: Smart Growing Systems',
    slug: 'automation-hydroponics',
    excerpt: 'How to use sensors, controllers, and apps to automate your hydroponic garden.',
    content: 'Full content would go here...',
    image: 'https://letpot.com/cdn/shop/files/LetPot_Air_10_pod_hydroponic_garden_with_app_control.jpg?v=1745572248',
    date: 'February 25, 2025',
    readTime: 10,
    category: 'Innovations',
    tags: ['automation', 'technology', 'smart systems'],
    author: {
      id: '4',
      name: 'James Wilson',
      role: 'Hydroponic Equipment Specialist',
      avatar: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=300',
      bio: 'James has been designing and installing hydroponic systems for commercial and home use for over 15 years.'
    }
  }
];

// Get all blog posts
export const getBlogPosts = (): BlogPost[] => {
  return blogPosts;
};

// Get a specific blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | null => {
  return blogPosts.find(post => post.slug === slug) || null;
};

// Get related posts based on category
export const getRelatedPosts = (currentPostId: string, category: string, limit: number = 4): BlogPost[] => {
  return blogPosts
    .filter(post => post.id !== currentPostId && post.category === category)
    .slice(0, limit);
};

// Get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

// Get posts by author
export const getPostsByAuthor = (authorId: string): BlogPost[] => {
  return blogPosts.filter(post => post.author.id === authorId);
};

// Get featured posts
export const getFeaturedPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts.slice(0, limit);
};

// Search posts
export const searchPosts = (query: string): BlogPost[] => {
  const lowercasedQuery = query.toLowerCase();
  return blogPosts.filter(
    post => 
      post.title.toLowerCase().includes(lowercasedQuery) || 
      post.excerpt.toLowerCase().includes(lowercasedQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
  );
};
