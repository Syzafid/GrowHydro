
import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ARPreviewBanner: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-12 bg-gradient-to-r from-leaf-700 to-leaf-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse-gentle"></div>
      <div className="absolute top-1/3 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-lg animate-pulse"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-white/30 to-white/10 p-3 rounded-lg mr-3 transform transition-all duration-300 hover:scale-110">
                <Box size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-display font-semibold">Alat Pratinjau AR</h2>
            </div>
            <p className="text-white/90 text-lg mb-6 max-w-lg">
              Coba sebelum membeli! Gunakan alat augmented reality kami untuk melihat bagaimana sistem hidroponik terlihat di ruang Anda.
            </p>
            <Link 
              to="/ar-preview" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-400 to-teal-300 text-leaf-800 font-semibold rounded-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              Coba AR Sekarang
            </Link>
          </div>
          <div className="w-full md:w-1/3 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-leaf-400/30 to-blue-500/30 rounded-lg transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"></div>
            <div className="aspect-video bg-gradient-to-br from-leaf-600 to-leaf-900 rounded-lg overflow-hidden shadow-xl flex items-center justify-center transform transition-all duration-500 group-hover:shadow-2xl relative">
              <img 
                src="https://tint.creativemarket.com/wOoMThyKks0PIgd6IQFOMJ-apA8rKWFJKyo2zDFHy6E/width:1200/height:800/gravity:nowe/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzU2OS81Njk2LzU2OTYyNzYvY292ZXItby5qcGc?1547449128" 
                alt="AR Preview Demo" 
                className="w-full h-full object-cover opacity-60 transition-opacity duration-300 group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-medium text-white text-lg">Pratinjau AR</span>
                  <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center mx-auto mt-2">
                    <Box className="text-white/90" size={24} />
                  </div>
                </div>
              </div>
              
              {/* Animated AR indicator */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-white">AR Siap</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARPreviewBanner;
