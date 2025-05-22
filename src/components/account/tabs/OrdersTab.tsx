
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

interface OrdersTabProps {
  orders: Order[];
  formatCurrency: (amount: number) => string;
}

const OrdersTab: React.FC<OrdersTabProps> = ({ orders, formatCurrency }) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-semibold text-leaf-800">{t("Order History")}</h2>
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden transition-all duration-300 hover:shadow-md">
          <CardHeader className="bg-gradient-to-r from-leaf-50 to-blue-50">
            <div className="flex justify-between items-center">
              <CardTitle>{order.id}</CardTitle>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 
                'bg-amber-100 text-amber-700'
              }`}>
                {t(order.status)}
              </span>
            </div>
            <CardDescription>
              {t("Order Date")}: {new Date(order.date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4">{t("Item")}</th>
                  <th className="text-center p-4">{t("Quantity")}</th>
                  <th className="text-right p-4">{t("Price")}</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="p-4">{item.name}</td>
                    <td className="text-center p-4">{item.quantity}</td>
                    <td className="text-right p-4">{formatCurrency(item.price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/20">
                <tr>
                  <td colSpan={2} className="text-right p-4 font-medium">{t("Total")}:</td>
                  <td className="text-right p-4 font-semibold">{formatCurrency(order.total)}</td>
                </tr>
              </tfoot>
            </table>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 bg-muted/10">
            <Button variant="outline">{t("Track Package")}</Button>
            <Button>{t("View Details")}</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default OrdersTab;
