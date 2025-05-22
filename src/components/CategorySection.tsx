
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const CategorySection: React.FC = () => {
  const { t } = useLanguage();
  
  const categories = [
    {
      title: t("Hydroponic Equipment"),
      image: "/HE.jpg",
      description: "Sistem lengkap dan komponen untuk semua kebutuhan berkebun",
      link: "/shop/equipment"
    },
    {
      title: t("Plant Seeds"),
      image: "/PS.png",
      description: "Benih organik, non-GMO yang dioptimalkan untuk pertumbuhan hidroponik",
      link: "/shop/seeds"
    },
    {
      title: t("Starter Kits"),
      image: "/ST.jpg",
      description: "Semua yang diperlukan pemula untuk mulai bertanam dengan sukses",
      link: "/shop/kits"
    },
    {
      title: t("Accessories"),
      image: "/AS.jpg",
      description: "Nutrisi, alat pengujian, dan media tanam",
      link: "/shop/accessories"
    }
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-semibold text-center text-leaf-800 mb-12">
          Belanja Berdasarkan Kategori
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              to={category.link}
              key={index}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-leaf-900/60 to-transparent flex items-end p-4">
                  <div>
                    <h3 className="text-xl font-medium text-white mb-1">{category.title}</h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
