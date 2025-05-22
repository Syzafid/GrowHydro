
import React from 'react';
import { Leaf, Droplets, Store, Truck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Leaf size={32} className="text-leaf-600" />,
      title: 'Organik & Non-GMO',
      description: 'Semua benih kami bersertifikat organik dan non-GMO, menjamin hasil panen terbaik untuk keluarga Anda.'
    },
    {
      icon: <Droplets size={32} className="text-leaf-600" />,
      title: 'Hemat Air',
      description: 'Sistem hidroponik kami menggunakan hingga 95% lebih sedikit air dibandingkan metode pertanian tanah tradisional.'
    },
    {
      icon: <Store size={32} className="text-leaf-600" />,
      title: 'Belanja AR',
      description: 'Coba sebelum membeli dengan fitur augmented reality kami untuk melihat bagaimana sistem cocok di ruang Anda.'
    },
    {
      icon: <Truck size={32} className="text-leaf-600" />,
      title: 'Pengiriman Cepat',
      description: 'Pengiriman gratis untuk pemesanan di atas Rp1.125.000 dengan opsi pengiriman netral karbon tersedia.'
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-cream-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-semibold text-center text-leaf-800 mb-12">Mengapa Memilih GrowSpace</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-leaf-50 rounded-full">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-medium text-center text-leaf-800 mb-3">{feature.title}</h3>
              <p className="text-center text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
