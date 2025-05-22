
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderStatusBadgeProps {
  status: string;
}

const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status }) => {
  const { t } = useLanguage();
  
  switch (status) {
    case 'delivered':
      return <Badge className="bg-green-500">{t('Delivered')}</Badge>;
    case 'shipped':
      return <Badge className="bg-blue-500">{t('Shipped')}</Badge>;
    case 'processing':
      return <Badge className="bg-yellow-500">{t('Processing')}</Badge>;
    case 'cancelled':
      return <Badge className="bg-red-500">{t('Cancelled')}</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default OrderStatusBadge;
