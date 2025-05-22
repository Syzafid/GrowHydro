
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import OrderStatusBadge from './OrderStatusBadge';
import OrderItem from './OrderItem';

interface OrderCardProps {
  order: {
    id: string;
    date: Date;
    status: string;
    total: number;
    items: Array<{
      id: number;
      name: string;
      quantity: number;
      price: number;
    }>;
    tracking: {
      courier: string;
      trackingNumber: string;
      estimatedDelivery: Date;
      currentLocation: string;
      status: string;
    };
  };
  formatCurrency: (price: number) => string;
  formatDate: (date: Date) => string;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, formatCurrency, formatDate }) => {
  const { t } = useLanguage();
  
  return (
    <Card key={order.id} className="overflow-hidden">
      <CardHeader className="bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <CardTitle className="text-lg">
              {t('Order #')}{order.id}
            </CardTitle>
            <p className="text-sm text-gray-500">
              {formatDate(order.date)}
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center gap-2 mt-4 md:mt-0">
            <OrderStatusBadge status={order.status} />
            <div className="flex gap-2 mt-2 md:mt-0">
              <Button size="sm" variant="outline" asChild>
                <Link to={`/account/orders/${order.id}`}>
                  <Eye className="h-4 w-4 mr-1" />
                  {t('View Details')}
                </Link>
              </Button>
              <Button 
                size="sm" 
                variant="default" 
                className="bg-leaf-600 hover:bg-leaf-700" 
                asChild
              >
                <Link to={`/account/orders/track/${order.id}`}>
                  <MapPin className="h-4 w-4 mr-1" />
                  {t('Track Package')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {order.items.map((item) => (
            <OrderItem key={item.id} item={item} formatCurrency={formatCurrency} />
          ))}
          <div className="border-t pt-4 flex justify-between">
            <p className="font-medium">{t('Total')}</p>
            <p className="font-bold">{formatCurrency(order.total)}</p>
          </div>
          <div className="text-sm text-gray-500">
            <p>
              {t('Estimated Delivery')}: {formatDate(order.tracking.estimatedDelivery)}
            </p>
            <p>
              {t('Courier')}: {order.tracking.courier} | {t('Tracking Number')}: {order.tracking.trackingNumber}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
