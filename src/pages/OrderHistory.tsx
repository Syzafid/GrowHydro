
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import OrderCard from '@/components/order/OrderCard';
import EmptyOrderState from '@/components/order/EmptyOrderState';
import { useOrderFormatters } from '@/hooks/useOrderFormatters';

// Mock data for orders
const mockOrders = [
  {
    id: '12345',
    date: new Date(2023, 10, 15),
    status: 'delivered',
    total: 149.99,
    items: [
      { id: 1, name: 'Hydroponic Starter Kit', quantity: 1, price: 99.99 },
      { id: 2, name: 'Nutrient Solution', quantity: 2, price: 24.99 }
    ],
    tracking: {
      courier: 'JNE',
      trackingNumber: 'JNE123456789',
      estimatedDelivery: new Date(2023, 10, 20),
      currentLocation: 'Jakarta, Indonesia',
      status: 'delivered',
      updates: [
        { date: new Date(2023, 10, 20), status: 'Delivered', location: 'Jakarta, Indonesia' },
        { date: new Date(2023, 10, 19), status: 'Out for delivery', location: 'Jakarta, Indonesia' },
        { date: new Date(2023, 10, 18), status: 'Arrived at sorting facility', location: 'Jakarta, Indonesia' },
        { date: new Date(2023, 10, 16), status: 'In transit', location: 'Bandung, Indonesia' },
        { date: new Date(2023, 10, 15), status: 'Shipped', location: 'Bandung, Indonesia' }
      ]
    }
  },
  {
    id: '12346',
    date: new Date(2023, 10, 10),
    status: 'shipped',
    total: 79.99,
    items: [
      { id: 3, name: 'LED Grow Lights', quantity: 1, price: 59.99 },
      { id: 4, name: 'Plant Food', quantity: 1, price: 19.99 }
    ],
    tracking: {
      courier: 'SiCepat',
      trackingNumber: 'SCP987654321',
      estimatedDelivery: new Date(2023, 10, 25),
      currentLocation: 'Surabaya, Indonesia',
      status: 'in_transit',
      updates: [
        { date: new Date(2023, 10, 18), status: 'In transit', location: 'Surabaya, Indonesia' },
        { date: new Date(2023, 10, 17), status: 'Departed from facility', location: 'Jakarta, Indonesia' },
        { date: new Date(2023, 10, 16), status: 'Processed at facility', location: 'Jakarta, Indonesia' },
        { date: new Date(2023, 10, 10), status: 'Shipped', location: 'Bandung, Indonesia' }
      ]
    }
  },
  {
    id: '12347',
    date: new Date(2023, 10, 5),
    status: 'processing',
    total: 199.99,
    items: [
      { id: 5, name: 'Advanced Hydroponic System', quantity: 1, price: 199.99 }
    ],
    tracking: {
      courier: 'J&T Express',
      trackingNumber: 'JNT123789456',
      estimatedDelivery: new Date(2023, 10, 28),
      currentLocation: 'Bandung, Indonesia',
      status: 'processing',
      updates: [
        { date: new Date(2023, 10, 5), status: 'Order confirmed', location: 'Bandung, Indonesia' }
      ]
    }
  }
];

const OrderHistory: React.FC = () => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState(mockOrders);
  const { formatCurrency, formatDate } = useOrderFormatters();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('Order History')}</h1>
        <p className="text-gray-600">{t('Track and manage your orders')}</p>
      </div>

      {orders.length === 0 ? (
        <EmptyOrderState />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <OrderCard 
              key={order.id} 
              order={order} 
              formatCurrency={formatCurrency} 
              formatDate={formatDate} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
