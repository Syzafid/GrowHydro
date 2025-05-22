
import { useLanguage } from '@/contexts/LanguageContext';
import { format } from 'date-fns';

export const useOrderFormatters = () => {
  const { language } = useLanguage();
  
  // Function to format currency based on selected language
  const formatCurrency = (price: number): string => {
    if (language === 'id') {
      // Format as Indonesian Rupiah
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(price * 15000); // Assuming 1 USD = 15000 IDR
    } else {
      // Format as USD
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(price);
    }
  };

  // Format date based on selected language
  const formatDate = (date: Date): string => {
    if (language === 'id') {
      return format(date, 'dd/MM/yyyy');
    } else {
      return format(date, 'MMM d, yyyy');
    }
  };
  
  return {
    formatCurrency,
    formatDate
  };
};
