import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Box } from 'lucide-react';
import { toast } from "@/components/ui/sonner";
import { Link } from 'react-router-dom';

const ARPreview: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);

    setTimeout(() => {
      toast.info("AR features would require device camera permissions", {
        duration: 5000,
      });
    }, 1000);
  }, []);

  const handleStartAR = () => {
    toast.success("AR Preview mode activated! (Simulated)", {
      description: "Point your camera at a flat surface to place the hydroponic system.",
    });
  };

  const arProducts = [
    {
      name: "Deep Water Culture Bubbler System",
      slug: "deep-water-culture-bubbler-system",
      image:
        "https://tint.creativemarket.com/wOoMThyKks0PIgd6IQFOMJ-apA8rKWFJKyo2zDFHy6E/width:1200/height:800/gravity:nowe/rt:fill-down/el:1/czM6Ly9maWxlcy5jcmVhdGl2ZW1hcmtldC5jb20vaW1hZ2VzL3NjcmVlbnNob3RzL3Byb2R1Y3RzLzU2OS81Njk2LzU2OTYyNzYvY292ZXItby5qcGc?1547449128",
    },
    {
      name: "Tower Garden",
      slug: "hydro-tower-deluxe",
      image:
        "https://m.media-amazon.com/images/I/615tZpXs7eL.jpg",
    },
    {
      name: "NFT Channel System",
      slug: "nft-channel-system",
      image:
        "https://5.imimg.com/data5/SELLER/Default/2020/12/FA/UG/JB/61955428/a-structure-200plants-jpeg-500x500.jpeg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="py-12 md:py-20 bg-gradient-to-r from-leaf-700 to-leaf-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full">
                <Box size={48} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Visualize Before You Buy
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Use our augmented reality tool to see how our hydroponic systems would look in your home or garden.
            </p>
            <button
              onClick={handleStartAR}
              className="px-6 py-3 bg-white text-leaf-800 font-semibold rounded-md hover:bg-cream-100 transition-colors duration-300"
            >
              Start AR Experience
            </button>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-semibold text-center text-leaf-800 mb-12">
              How AR Preview Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Choose a Product",
                  desc: "Browse our catalog and select a product with the AR Preview badge.",
                },
                {
                  step: "2",
                  title: "Scan Your Space",
                  desc: "Point your camera at the floor or surface where you want to place the item.",
                },
                {
                  step: "3",
                  title: "Visualize & Decide",
                  desc: "See how the product looks in your space, then add to cart with confidence.",
                },
              ].map(({ step, title, desc }) => (
                <div className="text-center" key={step}>
                  <div className="w-16 h-16 bg-leaf-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-semibold text-leaf-700">{step}</span>
                  </div>
                  <h3 className="text-xl font-medium text-leaf-800 mb-3">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 bg-leaf-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-display font-semibold text-center text-leaf-800 mb-8">
              AR-Enabled Products
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              The following products can be visualized in your space using our AR preview feature.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {arProducts.map((product) => (
                <div
                  key={product.slug}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-white/80 text-leaf-800 text-xs font-medium rounded-full flex items-center">
                        <Box size={12} className="mr-1" />
                        AR Preview
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-leaf-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">Perfect for small spaces</p>
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-leaf-600 font-medium hover:text-leaf-700 text-sm"
                    >
                      View Product →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/shop" className="btn-primary">
                Browse All Products
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ARPreview;
