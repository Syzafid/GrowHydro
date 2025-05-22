
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PaymentTab: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-semibold text-leaf-800">{t("Payment Methods")}</h2>
      <Card>
        <CardHeader>
          <CardTitle>{t("Saved Payment Methods")}</CardTitle>
          <CardDescription>{t("Manage your payment options")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center text-white">
                <span className="text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <div>
              <Button variant="outline" size="sm">{t("Remove")}</Button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center text-white">
                <span className="text-xs font-bold">MC</span>
              </div>
              <div>
                <p className="font-medium">Mastercard ending in 5555</p>
                <p className="text-sm text-muted-foreground">Expires 08/2026</p>
              </div>
            </div>
            <div>
              <Button variant="outline" size="sm">{t("Remove")}</Button>
            </div>
          </div>

          <Button className="w-full">{t("Add New Payment Method")}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentTab;
