
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useLanguage } from '@/contexts/LanguageContext';

const AboutUs: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-leaf-800 mb-4">
            {t('About')} <span className="text-gradient">GrowHydro</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('Revolutionizing home gardening through innovative hydroponic solutions since 2020.')}
          </p>
        </div>
        
        {/* Mission section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-display font-semibold text-leaf-800 mb-4">{t('Our Mission')}</h2>
            <p className="text-gray-600 mb-4">
              {t('At GrowHydro, we believe that everyone deserves access to fresh, nutritious food, regardless of where they live or the season. Our mission is to make hydroponics accessible, affordable, and enjoyable for everyone from beginners to experts.')}
            </p>
            <p className="text-gray-600 mb-4">
              {t('We\'re dedicated to developing innovative growing solutions that conserve water, eliminate pesticides, and reduce the carbon footprint associated with traditional agriculture and food transportation.')}
            </p>
            <p className="text-gray-600">
              {t('Through education and community building, we aim to spark a revolution in how people think about growing food and connect with nature in their own homes.')}
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <AspectRatio ratio={4/3}>
                <img
                  src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80&w=800"
                  alt="Hydroponic garden"
                  className="object-cover w-full h-full"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
        
        {/* Values section */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-semibold text-leaf-800 mb-8 text-center">{t('Our Core Values')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-light p-6 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-leaf-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-leaf-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-leaf-800 mb-2">{t('Innovation')}</h3>
              <p className="text-gray-600">
                {t('We constantly research and develop new technologies to make hydroponics more efficient, affordable, and user-friendly.')}
              </p>
            </div>
            <div className="bg-gradient-light p-6 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-leaf-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-leaf-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-leaf-800 mb-2">{t('Sustainability')}</h3>
              <p className="text-gray-600">
                {t('Our systems use up to 95% less water than traditional gardening methods and are designed with eco-friendly materials wherever possible.')}
              </p>
            </div>
            <div className="bg-gradient-light p-6 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="bg-leaf-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-leaf-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-leaf-800 mb-2">{t('Education')}</h3>
              <p className="text-gray-600">
                {t('We believe in empowering individuals with knowledge. Every product comes with comprehensive guides and our blog provides continuous learning resources.')}
              </p>
            </div>
          </div>
        </div>
        
        {/* Benefits section */}
        <div className="mb-20">
          <h2 className="text-3xl font-display font-semibold text-leaf-800 mb-8 text-center">
            {t('Benefits of Hydroponic Gardening')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-leaf-600 text-white flex items-center justify-center">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-leaf-800 mb-2">{t('Water Efficiency')}</h3>
                <p className="text-gray-600">
                  {t('Hydroponic systems use up to 95% less water than traditional soil gardening, as water is recirculated rather than lost to the environment.')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-leaf-600 text-white flex items-center justify-center">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-leaf-800 mb-2">{t('Grow Anywhere')}</h3>
                <p className="text-gray-600">
                  {t('No soil means you can grow indoors year-round, regardless of outdoor conditions, climate, or available garden space.')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-leaf-600 text-white flex items-center justify-center">
                  3
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-leaf-800 mb-2">{t('Faster Growth')}</h3>
                <p className="text-gray-600">
                  {t('Plants grow up to 50% faster in hydroponics, as they have direct access to nutrients and can devote more energy to above-ground growth.')}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-full bg-leaf-600 text-white flex items-center justify-center">
                  4
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-leaf-800 mb-2">{t('No Pesticides')}</h3>
                <p className="text-gray-600">
                  {t('Growing indoors with clean systems dramatically reduces pest problems, allowing for truly organic growth without chemical interventions.')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team section */}
        <div>
          <h2 className="text-3xl font-display font-semibold text-leaf-800 mb-8 text-center">
            {t('Our Team')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1548449112-96a38a643324?auto=format&fit=crop&q=80&w=400"
                  alt="CEO Portrait"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-leaf-800 mb-1">Sarah Johnson</h3>
              <p className="text-leaf-600 mb-3">{t('Founder & CEO')}</p>
              <p className="text-gray-600">
                {t('With over 15 years in sustainable agriculture, Sarah founded GrowHydro to make hydroponics accessible to everyone.')}
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?auto=format&fit=crop&q=80&w=400"
                  alt="CTO Portrait"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-leaf-800 mb-1">Michael Chen</h3>
              <p className="text-leaf-600 mb-3">{t('CTO')}</p>
              <p className="text-gray-600">
                {t('Michael leads our R&D team, combining his background in engineering and plant science to create innovative growing solutions.')}
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4 shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?auto=format&fit=crop&q=80&w=400"
                  alt="CCO Portrait"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-leaf-800 mb-1">Emily Rodriguez</h3>
              <p className="text-leaf-600 mb-3">{t('Customer Experience')}</p>
              <p className="text-gray-600">
                {t('Emily ensures that every customer has the knowledge and support they need to succeed with their hydroponic garden.')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default AboutUs;
