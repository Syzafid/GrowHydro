
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderItemProps {
  item: {
    id: number;
    name: string;
    quantity: number;
    price: number;
  };
  formatCurrency: (price: number) => string;
}

const OrderItem: React.FC<OrderItemProps> = ({ item, formatCurrency }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-between">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm text-gray-500">
          {t('Quantity')}: {item.quantity}
        </p>
      </div>
      <p className="font-medium">
        {formatCurrency(item.price * item.quantity)}
      </p>
    </div>
  );
};

export default OrderItem;
