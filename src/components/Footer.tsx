
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Leaf, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer: React.FC = () => {
  // Animation variants
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const socialVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: custom * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    })
  };

  return (
    <footer className="relative bg-gradient-to-br from-leaf-800 to-leaf-900 pt-12 pb-8 text-white overflow-hidden">
      {/* Decorative leaf elements */}
      <div className="absolute top-0 left-0 w-full h-4 bg-leaf-700"></div>
      
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-leaf-700/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 -right-20 w-60 h-60 bg-leaf-700/20 rounded-full blur-3xl"></div>
      
      {/* Floating vegetable illustrations */}
      <motion.div 
        className="absolute top-10 left-[10%] opacity-10"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, 0] 
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <Sprout size={60} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-[5%] opacity-10"
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -3, 0] 
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1 
        }}
      >
        <Leaf size={80} />
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <div className="mb-4">
              <Logo variant="footer" />
            </div>
            <p className="text-leaf-100 mb-4 max-w-xs">
              Grow Hydro offers premium hydroponic equipment and plant seeds for enthusiasts and professionals alike.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Youtube, href: "#" }
              ].map((item, index) => (
                <motion.a 
                  key={index}
                  href={item.href}
                  className="text-leaf-200 hover:text-white transform transition-all p-2 hover:bg-leaf-700/50 rounded-full"
                  custom={index}
                  variants={socialVariants}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-leaf-400"></span>
            </h3>
            <ul className="space-y-2">
              {[
                { name: "Shop All", path: "/shop" },
                { name: "Hydroponic Systems", path: "/shop/equipment" },
                { name: "Plant Seeds", path: "/shop/seeds" },
                { name: "Starter Kits", path: "/shop/kits" },
                { name: "Accessories", path: "/shop/accessories" },
                { name: "AR Preview", path: "/ar-preview" }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { 
                      delay: index * 0.1,
                      duration: 0.5
                    }
                  }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={link.path} 
                    className="text-leaf-100 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 h-px bg-leaf-300 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Information */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Information
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-leaf-400"></span>
            </h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", path: "/about" },
                { name: "Blog", path: "/blog" },
                { name: "FAQs", path: "/faq" },
                { name: "Shipping Policy", path: "/shipping" },
                { name: "Returns Policy", path: "/returns" },
                { name: "Terms & Conditions", path: "/terms" }
              ].map((link, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { 
                      delay: index * 0.1,
                      duration: 0.5
                    }
                  }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={link.path} 
                    className="text-leaf-100 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-0 h-px bg-leaf-300 mr-0 opacity-0 group-hover:w-2 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Us */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-leaf-400"></span>
            </h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mr-3 p-2 bg-leaf-700/50 rounded-full">
                  <MapPin size={18} className="text-leaf-300" />
                </div>
                <span className="text-leaf-100">Laut Dendang, Jl. Warakauri, Kec. Percut Sei Tuan, Kabupaten Deli Serdang, Sumatera Utara 20371</span>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mr-3 p-2 bg-leaf-700/50 rounded-full">
                  <Phone size={18} className="text-leaf-300" />
                </div>
                <a href="tel:+6285261978079" className="text-leaf-100 hover:text-white transition-colors">
                  +62 852-6197-8079
                </a>
              </motion.li>
              <motion.li 
                className="flex items-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mr-3 p-2 bg-leaf-700/50 rounded-full">
                  <Mail size={18} className="text-leaf-300" />
                </div>
                <a href="mailto:info@GrowHydro.com" className="text-leaf-100 hover:text-white transition-colors">
                  info@GrowHydro.com
                </a>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-leaf-700/50 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-leaf-200 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Grow Hydro. All rights reserved.
            </p>
            <div className="flex space-x-4">
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((item, index) => (
                <Link 
                  key={item} 
                  to={`/${item.toLowerCase().replace(/ /g, '-')}`} 
                  className="text-leaf-200 text-sm hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
