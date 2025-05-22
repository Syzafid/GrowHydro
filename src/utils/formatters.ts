
/**
 * Function to format currency in Indonesian Rupiah
 * @param price - Price in USD
 * @returns Formatted price string in IDR
 */
export const formatToRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price * 15000); // Assuming 1 USD = 15000 IDR
};
