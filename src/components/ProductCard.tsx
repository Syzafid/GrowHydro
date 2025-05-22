
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Star, Box } from 'lucide-react';
import { Product } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();
  const {
    id,
    name,
    price,
    salePrice,
    images,
    rating,
    reviewCount,
    arEnabled,
    bestseller,
    new: isNew,
    stock
  } = product;

  return (
    <div className="group relative rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition-all duration-500 card-hover transform hover:-translate-y-2">
      <div className="absolute inset-0 bg-gradient-to-br from-leaf-200/30 via-white/0 to-blue-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img 
            src={images[0]} 
            alt={name}
            className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110"
          />
          
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Product badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {bestseller && (
              <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 border-0 hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-sm">
                {t('Bestseller')}
              </Badge>
            )}
            {isNew && (
              <Badge className="bg-gradient-to-r from-blue-400 to-blue-500 border-0 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 shadow-sm">
                {t('New')}
              </Badge>
            )}
            {salePrice && (
              <Badge className="bg-gradient-to-r from-red-400 to-red-500 border-0 hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-sm">
                {t('Sale')}
              </Badge>
            )}
          </div>
          
          {/* AR badge */}
          {arEnabled && (
            <div className="absolute bottom-2 right-2 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-leaf-600 text-leaf-800 flex items-center gap-1 hover:bg-white transition-colors duration-300">
                <Box size={14} />
                <span className="animate-fade-in">{t('AR Preview')}</span>
              </Badge>
            </div>
          )}
          
          {/* Quick view button (appears on hover) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="px-4 py-2 bg-white/80 backdrop-blur-sm text-leaf-800 rounded-md font-medium text-sm transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-md">
              {t('View Details')}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 group-hover:text-leaf-700 transition-colors duration-300">{name}</h3>
          
          {/* Price */}
          <div className="flex items-center mb-2">
            {salePrice ? (
              <>
                <span className="text-lg font-semibold bg-gradient-to-r from-leaf-600 to-leaf-700 bg-clip-text text-transparent">${salePrice.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-lg font-semibold bg-gradient-to-r from-leaf-600 to-leaf-700 bg-clip-text text-transparent">${price.toFixed(2)}</span>
            )}
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-1">
            <div className="flex text-amber-400 mr-1 transition-transform duration-300 group-hover:scale-105">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(rating) ? "currentColor" : "none"}
                  className={i < Math.floor(rating) ? "text-amber-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({reviewCount})</span>
          </div>
          
          {/* Stock status */}
          <div className="text-sm">
            {stock > 0 ? (
              stock < 10 ? (
                <span className="text-amber-600 font-medium">{t('Only')} {stock} {t('left')}</span>
              ) : (
                <span className="text-green-600 font-medium">{t('In stock')}</span>
              )
            ) : (
              <span className="text-red-600 font-medium">{t('Out of stock')}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
