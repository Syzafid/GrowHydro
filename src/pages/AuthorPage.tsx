
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from 'lucide-react';
import { BlogPost, Author as AuthorType } from '@/types/blog';
import { motion } from "framer-motion";
import { toast } from "@/components/ui/sonner";

// Mock data for authors
const mockAuthors: AuthorType[] = [
  {
    id: "author-1",
    name: "Emily Chen",
    role: "Hydroponic Expert",
    avatar: "/images/avatars/emily.jpg",
    bio: "Emily has over a decade of experience in hydroponic gardening. She specializes in indoor growing systems and has helped hundreds of urban gardeners create successful setups in small spaces.",
  },
  {
    id: "author-2",
    name: "Marcus Johnson",
    role: "Plant Scientist",
    avatar: "/images/avatars/marcus.jpg",
    bio: "With a PhD in Plant Biology, Marcus combines scientific knowledge with practical advice. His research focuses on optimizing nutrient solutions for different plant varieties in soilless systems.",
  },
  {
    id: "author-3",
    name: "Sophia Patel",
    role: "Sustainable Agriculture Advocate",
    avatar: "/images/avatars/sophia.jpg",
    bio: "Sophia is passionate about sustainable growing methods. She has worked with community gardens across the country to implement water-efficient growing systems and teaches workshops on DIY hydroponics.",
  }
];

// Mock blog posts
const mockPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Getting Started with Hydroponic Growing: A Beginner's Guide",
    slug: "getting-started-hydroponics",
    excerpt: "Learn the fundamentals of hydroponic growing and how to set up your first system with minimal investment.",
    content: "Full content would go here...",
    image: "/images/blog/beginner-hydroponics.jpg",
    date: "2024-04-15",
    readTime: 8,
    category: "Beginner Guides",
    tags: ["beginners", "setup", "basics"],
    author: mockAuthors[0]
  },
  {
    id: "post-2",
    title: "The Science Behind Nutrient Solutions: What Your Plants Really Need",
    slug: "science-nutrient-solutions",
    excerpt: "Understand the chemistry behind hydroponic nutrients and how to optimize your solution for maximum plant growth.",
    content: "Full content would go here...",
    image: "/images/blog/nutrient-science.jpg",
    date: "2024-03-28",
    readTime: 12,
    category: "Advanced Growing",
    tags: ["nutrients", "chemistry", "optimization"],
    author: mockAuthors[1]
  },
  {
    id: "post-3",
    title: "5 Common Hydroponic Mistakes and How to Avoid Them",
    slug: "common-hydroponic-mistakes",
    excerpt: "Don't let these typical errors ruin your hydroponic setup. Learn how to identify and fix the most common problems.",
    content: "Full content would go here...",
    image: "/images/blog/mistakes.jpg",
    date: "2024-04-05",
    readTime: 6,
    category: "Troubleshooting",
    tags: ["problems", "solutions", "maintenance"],
    author: mockAuthors[0]
  },
  {
    id: "post-4",
    title: "Hydroponic Growing for Small Spaces: Maximizing Your Yield",
    slug: "small-space-hydroponics",
    excerpt: "Limited space doesn't mean limited results. Discover techniques for growing more food in tiny urban spaces.",
    content: "Full content would go here...",
    image: "/images/blog/small-space.jpg",
    date: "2024-04-12",
    readTime: 7,
    category: "Urban Gardening",
    tags: ["small spaces", "efficiency", "urban"],
    author: mockAuthors[2]
  },
  {
    id: "post-5",
    title: "Sustainable Hydroponics: Reducing Your Environmental Footprint",
    slug: "sustainable-hydroponics",
    excerpt: "Make your hydroponic system more eco-friendly with these sustainable approaches and technologies.",
    content: "Full content would go here...",
    image: "/images/blog/sustainable.jpg",
    date: "2024-03-20",
    readTime: 10,
    category: "Sustainability",
    tags: ["eco-friendly", "sustainability", "resources"],
    author: mockAuthors[2]
  },
];

// Social media mockups for authors
const socialLinks = {
  "author-1": [
    { platform: "Twitter", url: "https://twitter.com/emilychen", followers: 12400 },
    { platform: "Instagram", url: "https://instagram.com/emilyhydroponics", followers: 28900 },
    { platform: "YouTube", url: "https://youtube.com/emilyhydro", followers: 65000 }
  ],
  "author-2": [
    { platform: "Twitter", url: "https://twitter.com/marcusjohnson", followers: 8700 },
    { platform: "LinkedIn", url: "https://linkedin.com/in/marcusjohnson", followers: 15200 },
    { platform: "ResearchGate", url: "https://researchgate.net/profile/MarcusJohnson", followers: 3400 }
  ],
  "author-3": [
    { platform: "Instagram", url: "https://instagram.com/sophiagrows", followers: 45300 },
    { platform: "Twitter", url: "https://twitter.com/sophiapatel", followers: 19800 },
    { platform: "TikTok", url: "https://tiktok.com/@sophiagrows", followers: 124000 }
  ]
};

const AuthorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<AuthorType | null>(null);
  const [authorPosts, setAuthorPosts] = useState<BlogPost[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [socialMediaStats, setSocialMediaStats] = useState<any[]>([]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Find author based on ID
    const foundAuthor = mockAuthors.find(author => author.id === id);
    if (foundAuthor) {
      setAuthor(foundAuthor);
      
      // Find posts by this author
      const posts = mockPosts.filter(post => post.author.id === id);
      setAuthorPosts(posts);
      
      // Get social media stats
      const socialMedia = socialLinks[id as keyof typeof socialLinks] || [];
      setSocialMediaStats(socialMedia);
    }
  }, [id]);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (!isFollowing) {
      toast.success(`Now following ${author?.name}`);
    } else {
      toast.info(`Unfollowed ${author?.name}`);
    }
  };
  
  if (!author) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <p>Author not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-grow container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Author Header */}
          <div className="mb-8">
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-leaf-500 to-blue-500 relative">
                <div className="absolute -bottom-16 left-8">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback className="bg-leaf-100 text-leaf-800 text-4xl">
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              <CardContent className="pt-20 pb-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                  <div>
                    <CardTitle className="text-2xl font-display mb-1">{author.name}</CardTitle>
                    <Badge className="mb-4">{author.role}</Badge>
                    <CardDescription className="text-base max-w-2xl">
                      {author.bio}
                    </CardDescription>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    <Button 
                      onClick={handleFollow}
                      variant={isFollowing ? "outline" : "default"}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Author Content Tabs */}
          <Tabs defaultValue="articles">
            <TabsList className="w-full grid grid-cols-2 mb-8">
              <TabsTrigger value="articles">Articles ({authorPosts.length})</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
            </TabsList>
            
            {/* Articles Tab */}
            <TabsContent value="articles" className="space-y-6">
              {authorPosts.length > 0 ? (
                authorPosts.map((post) => (
                  <Link to={`/blog/${post.slug}`} key={post.id}>
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 aspect-video md:aspect-square">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <CardTitle className="mb-2 line-clamp-2">{post.title}</CardTitle>
                          <CardDescription className="mb-4 line-clamp-2">
                            {post.excerpt}
                          </CardDescription>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime} min read</span>
                            <span className="mx-2">•</span>
                            <Badge variant="outline">{post.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))
              ) : (
                <div className="text-center py-12">
                  <p>This author hasn't published any articles yet.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Social Media Tab */}
            <TabsContent value="social" className="space-y-6">
              {socialMediaStats.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                    <CardDescription>Follow {author.name} on social media platforms</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {socialMediaStats.map((social, index) => (
                      <div key={index} className="flex justify-between items-center p-4 rounded-lg hover:bg-muted/50 transition-colors">
                        <div>
                          <h3 className="font-semibold">{social.platform}</h3>
                          <p className="text-sm text-muted-foreground">{social.followers.toLocaleString()} followers</p>
                        </div>
                        <Button variant="outline" asChild>
                          <a href={social.url} target="_blank" rel="noopener noreferrer">
                            Follow
                          </a>
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Follower counts last updated: {new Date().toLocaleDateString()}
                    </p>
                  </CardFooter>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <p>No social media profiles available for this author.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default AuthorPage;
