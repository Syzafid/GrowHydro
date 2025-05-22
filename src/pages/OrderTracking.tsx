
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Package, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLanguage } from '@/contexts/LanguageContext';

// This would normally be stored securely, but for this demo it's placed here
// In production, use environment variables or a server to handle API keys
mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZXVzZXIiLCJhIjoiY2t6eWt0NXh4MGMzODNpbXBlNDFlbjV0OSJ9.O83QXbGqXbPYTgIlOD4hbQ';

// Mock data for the specific order
const mockOrderData = {
  '12345': {
    id: '12345',
    date: new Date(2023, 10, 15),
    status: 'delivered',
    total: 149.99,
    items: [
      { id: 1, name: 'Hydroponic Starter Kit', quantity: 1, price: 99.99 },
      { id: 2, name: 'Nutrient Solution', quantity: 2, price: 24.99 }
    ],
    tracking: {
      courier: 'FedEx',
      trackingNumber: 'FDX123456789',
      estimatedDelivery: new Date(2023, 10, 20),
      currentLocation: { name: 'Jakarta, Indonesia', coordinates: [106.8272, -6.1752] },
      status: 'delivered',
      updates: [
        { date: new Date(2023, 10, 20), status: 'Delivered', location: 'Jakarta, Indonesia', coordinates: [106.8272, -6.1752] },
        { date: new Date(2023, 10, 19), status: 'Out for delivery', location: 'Jakarta, Indonesia', coordinates: [106.8272, -6.1752] },
        { date: new Date(2023, 10, 18), status: 'Arrived at sorting facility', location: 'Jakarta, Indonesia', coordinates: [106.8272, -6.1752] },
        { date: new Date(2023, 10, 16), status: 'In transit', location: 'Bandung, Indonesia', coordinates: [107.6095, -6.9147] },
        { date: new Date(2023, 10, 15), status: 'Shipped', location: 'Bandung, Indonesia', coordinates: [107.6095, -6.9147] }
      ]
    }
  },
  '12346': {
    id: '12346',
    date: new Date(2023, 10, 10),
    status: 'shipped',
    total: 79.99,
    items: [
      { id: 3, name: 'LED Grow Lights', quantity: 1, price: 59.99 },
      { id: 4, name: 'Plant Food', quantity: 1, price: 19.99 }
    ],
    tracking: {
      courier: 'DHL',
      trackingNumber: 'DHL987654321',
      estimatedDelivery: new Date(2023, 10, 25),
      currentLocation: { name: 'Surabaya, Indonesia', coordinates: [112.7521, -7.2458] },
      status: 'in_transit',
      updates: [
        { date: new Date(2023, 10, 18), status: 'In transit', location: 'Surabaya, Indonesia', coordinates: [112.7521, -7.2458] },
        { date: new Date(2023, 10, 17), status: 'Departed from facility', location: 'Jakarta, Indonesia', coordinates: [106.8272, -6.1752] },
        { date: new Date(2023, 10, 16), status: 'Processed at facility', location: 'Jakarta, Indonesia', coordinates: [106.8272, -6.1752] },
        { date: new Date(2023, 10, 10), status: 'Shipped', location: 'Bandung, Indonesia', coordinates: [107.6095, -6.9147] }
      ]
    }
  },
  '12347': {
    id: '12347',
    date: new Date(2023, 10, 5),
    status: 'processing',
    total: 199.99,
    items: [
      { id: 5, name: 'Advanced Hydroponic System', quantity: 1, price: 199.99 }
    ],
    tracking: {
      courier: 'JNE',
      trackingNumber: 'JNE123789456',
      estimatedDelivery: new Date(2023, 10, 28),
      currentLocation: { name: 'Bandung, Indonesia', coordinates: [107.6095, -6.9147] },
      status: 'processing',
      updates: [
        { date: new Date(2023, 10, 5), status: 'Order confirmed', location: 'Bandung, Indonesia', coordinates: [107.6095, -6.9147] }
      ]
    }
  }
};

const OrderTracking: React.FC = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get order details
    const fetchOrder = async () => {
      try {
        // In a real app, you would fetch this from an API
        await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
        
        const orderData = mockOrderData[id as keyof typeof mockOrderData];
        
        if (orderData) {
          setOrder(orderData);
        } else {
          console.error('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (!mapContainer.current || !order || !order.tracking.currentLocation.coordinates) return;

    // Initialize map
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: order.tracking.currentLocation.coordinates,
        zoom: 12
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Add marker for current location
      new mapboxgl.Marker({ color: '#2E7D32' })
        .setLngLat(order.tracking.currentLocation.coordinates)
        .addTo(map.current);

      // Add popup for current location
      new mapboxgl.Popup({ closeOnClick: false, closeButton: false })
        .setLngLat(order.tracking.currentLocation.coordinates)
        .setHTML(`<strong>${order.tracking.currentLocation.name}</strong><p>${t('Current Package Location')}</p>`)
        .addTo(map.current);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [order, t]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500">{t('Delivered')}</Badge>;
      case 'shipped':
      case 'in_transit':
        return <Badge className="bg-blue-500">{t('Shipped')}</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500">{t('Processing')}</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">{t('Cancelled')}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">{t('Loading order details...')}</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium">{t('Order not found')}</h3>
          <Button asChild className="mt-6">
            <Link to="/account/orders">{t('Back to Orders')}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link to="/account/orders">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t('Back to Orders')}
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">
          {t('Track Package')} - {t('Order #')}{order.id}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('Package Location')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                ref={mapContainer} 
                className="h-[400px] w-full rounded-md overflow-hidden"
              />
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{t('Current Location')}</p>
                    <p className="text-gray-600">{order.tracking.currentLocation.name}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('Estimated Delivery')}</p>
                    <p className="text-gray-600">{format(order.tracking.estimatedDelivery, 'PPP')}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tracking details section */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('Tracking Details')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="font-medium">{t('Courier')}</p>
                <p className="text-gray-600">{order.tracking.courier}</p>
              </div>
              <div className="mb-4">
                <p className="font-medium">{t('Tracking Number')}</p>
                <p className="text-gray-600">{order.tracking.trackingNumber}</p>
              </div>
              <div className="mb-6">
                <p className="font-medium">{t('Status')}</p>
                <div className="mt-1">{getStatusBadge(order.tracking.status)}</div>
              </div>
              
              {/* Tracking timeline */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-4">{t('Tracking History')}</h3>
                <div className="space-y-4">
                  {order.tracking.updates.map((update: any, index: number) => (
                    <div key={index} className="relative pl-6 pb-4">
                      {/* Timeline connector */}
                      {index < order.tracking.updates.length - 1 && (
                        <div className="absolute left-2 top-2 bottom-0 w-0.5 bg-gray-200"></div>
                      )}
                      
                      {/* Status dot */}
                      <div className={`absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 ${index === 0 ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'}`}></div>
                      
                      {/* Status content */}
                      <div>
                        <p className="font-medium flex items-center">
                          {update.status}
                          {index === 0 && <CheckCircle className="ml-1 h-4 w-4 text-green-500" />}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(update.date, 'PPP p')} • {update.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
