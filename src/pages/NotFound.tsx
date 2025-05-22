
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="text-center px-4">
          <h1 className="text-9xl font-display font-bold text-leaf-700 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">{t('Page Not Found')}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            {t('The page you are looking for does not exist.')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="default" asChild>
              <Link to="/">
                {t('Return Home')}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/shop">
                {t('Shop')}
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
