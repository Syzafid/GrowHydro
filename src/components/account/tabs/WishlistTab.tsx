
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface WishlistTabProps {
  items: WishlistItem[];
  formatCurrency: (amount: number) => string;
}

const WishlistTab: React.FC<WishlistTabProps> = ({ items, formatCurrency }) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-semibold text-leaf-800">{t("Saved Items")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="group overflow-hidden transition-all duration-300 hover:shadow-md">
            <div className="aspect-square overflow-hidden bg-muted/20">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-lg truncate">{item.name}</CardTitle>
              <CardDescription>{formatCurrency(item.price)}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between gap-2">
              <Button variant="outline" className="flex-1">
                <Heart size={16} className="mr-2" />
                {t("Remove")}
              </Button>
              <Button className="flex-1">
                <ShoppingBag size={16} className="mr-2" />
                {t("Add to Cart")}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistTab;
