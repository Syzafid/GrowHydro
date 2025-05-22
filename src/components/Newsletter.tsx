
import React, { useState } from 'react';
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { useLanguage } from '@/contexts/LanguageContext';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Terima kasih telah berlangganan newsletter kami!");
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-12 bg-cream-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-semibold text-leaf-800 mb-4">
            Bergabunglah dengan Newsletter Kami
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Berlangganan untuk menerima tips berkebun, penawaran khusus, dan akses awal ke produk baru.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Alamat email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-grow"
            />
            <button 
              type="submit" 
              className="btn-primary whitespace-nowrap"
              disabled={loading}
            >
              {loading ? 'Mendaftarkan...' : 'Berlangganan'}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Kami menghormati privasi Anda. Berhenti berlangganan kapan saja.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
