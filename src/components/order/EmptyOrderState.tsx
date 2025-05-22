
import React from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const EmptyOrderState: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center py-16">
      <Package className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium">{t('No orders yet')}</h3>
      <p className="mt-1 text-gray-500">{t('Start shopping to see your orders here.')}</p>
      <Button asChild className="mt-6">
        <Link to="/shop">{t('Browse Products')}</Link>
      </Button>
    </div>
  );
};

export default EmptyOrderState;
