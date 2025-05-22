
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, Package, Globe, Clock, CreditCard } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ShippingPolicy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-leaf-800 mb-2 text-center">
            Kebijakan Pengiriman
          </h1>
          <p className="text-gray-600 text-center mb-12">
            Semua yang perlu Anda ketahui tentang proses pengiriman dan opsi pengiriman kami.
          </p>
          
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-12">
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">Metode & Jadwal Pengiriman</h2>
              </div>
              <div className="ml-9">
                <h3 className="font-semibold text-leaf-700 mb-2">Pengiriman Domestik (Indonesia)</h3>
                <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
                  <li><span className="font-medium">Pengiriman Standar:</span> 3-5 hari kerja - Rp135.000 atau GRATIS untuk pesanan di atas Rp1.125.000</li>
                  <li><span className="font-medium">Pengiriman Ekspres:</span> 2-3 hari kerja - Rp225.000</li>
                  <li><span className="font-medium">Pengiriman Prioritas:</span> 1-2 hari kerja - Rp375.000</li>
                </ul>
                
                <h3 className="font-semibold text-leaf-700 mb-2">Pengiriman Internasional</h3>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li><span className="font-medium">Malaysia:</span> 5-10 hari kerja - Mulai dari Rp300.000</li>
                  <li><span className="font-medium">Singapura:</span> 7-14 hari kerja - Mulai dari Rp450.000</li>
                  <li><span className="font-medium">Australia:</span> 10-18 hari kerja - Mulai dari Rp525.000</li>
                  <li><span className="font-medium">Internasional Lainnya:</span> 10-21 hari kerja - Mulai dari Rp600.000</li>
                </ul>
                <p className="text-gray-600 italic mb-4">
                  Catatan: Biaya pengiriman internasional dihitung saat checkout berdasarkan tujuan, berat, dan dimensi paket.
                </p>
                <p className="text-gray-600">
                  Semua perkiraan waktu dimulai setelah pesanan diproses. Pemrosesan biasanya memakan waktu 1-2 hari kerja.
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Package className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">Pemrosesan Pesanan</h2>
              </div>
              <div className="ml-9">
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Pesanan yang dilakukan sebelum pukul 13:00 WIB pada hari kerja biasanya diproses pada hari yang sama.</li>
                  <li>Pesanan yang dilakukan pada akhir pekan atau hari libur akan diproses pada hari kerja berikutnya.</li>
                  <li>Selama periode volume tinggi (liburan, penjualan khusus), pemrosesan mungkin membutuhkan tambahan 1-2 hari kerja.</li>
                  <li>Anda akan menerima email konfirmasi saat pesanan Anda dilakukan, dan notifikasi lain dengan informasi pelacakan setelah pesanan dikirim.</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">Pesanan Internasional</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-600 mb-4">
                  Kami dengan senang hati mengirimkan produk kami ke seluruh dunia. Namun, harap perhatikan pertimbangan berikut untuk pesanan internasional:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li><span className="font-medium">Bea & Pajak Impor:</span> Pelanggan internasional bertanggung jawab atas semua bea cukai, pajak, dan biaya impor yang dikenakan oleh negara mereka. Biaya ini tidak termasuk dalam total pesanan Anda.</li>
                  <li><span className="font-medium">Batasan Pengiriman:</span> Beberapa produk, terutama nutrisi atau media tanam tertentu, mungkin dibatasi untuk impor di negara tertentu. Harap periksa peraturan lokal Anda sebelum memesan.</li>
                  <li><span className="font-medium">Keterlambatan Pengiriman:</span> Pengiriman internasional terkadang mengalami keterlambatan karena pemrosesan bea cukai. Keterlambatan ini di luar kendali kami.</li>
                  <li><span className="font-medium">Keakuratan Alamat:</span> Pastikan alamat pengiriman Anda lengkap dan akurat, termasuk kode pos atau instruksi khusus, untuk menghindari masalah pengiriman.</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">Melacak Pesanan Anda</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-600 mb-4">
                  Semua pesanan menyertakan informasi pelacakan yang akan dikirim ke email Anda setelah paket Anda dikirim. Anda juga dapat:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Lacak pesanan Anda dengan masuk ke akun GrowSpace Anda dan melihat riwayat pesanan Anda</li>
                  <li>Hubungi tim layanan pelanggan kami dengan nomor pesanan Anda untuk bantuan</li>
                  <li>Gunakan nomor pelacakan yang disediakan langsung di situs web kurir (JNE, SiCepat, atau J&T)</li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">Asuransi Pengiriman & Situasi Khusus</h2>
              </div>
              <div className="ml-9">
                <ul className="list-disc pl-5 text-gray-600 space-y-4">
                  <li><span className="font-medium">Asuransi:</span> Semua pesanan di atas Rp1.500.000 secara otomatis menyertakan asuransi pengiriman tanpa biaya tambahan.</li>
                  <li><span className="font-medium">Paket Rusak:</span> Jika paket Anda tiba dalam keadaan rusak, harap ambil foto dan hubungi kami dalam waktu 48 jam setelah pengiriman. Kami akan bekerja sama dengan Anda untuk menyelesaikan masalah dengan segera.</li>
                  <li><span className="font-medium">Paket Hilang:</span> Jika pelacakan Anda menunjukkan paket telah dikirim tetapi Anda belum menerimanya, harap periksa dengan tetangga dan kantor pengiriman lokal Anda. Jika tidak dapat ditemukan, hubungi kami dalam waktu 7 hari.</li>
                  <li><span className="font-medium">Perubahan Alamat:</span> Setelah pesanan dilakukan, kami tidak dapat menjamin bahwa perubahan alamat pengiriman dapat diakomodasi. Harap hubungi layanan pelanggan sesegera mungkin dengan permintaan koreksi alamat.</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contact section */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-leaf-800 mb-4">
              Punya pertanyaan tentang pengiriman?
            </h2>
            <p className="text-gray-600 mb-6">
              Tim layanan pelanggan kami tersedia Senin-Jumat, 9.00-17.00 WIB untuk membantu Anda dengan pertanyaan pengiriman apa pun.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/contact" 
                className="btn-primary inline-flex items-center justify-center"
              >
                Hubungi Kami
              </a>
              <a 
                href="/faq" 
                className="btn-outline inline-flex items-center justify-center"
              >
                Lihat FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default ShippingPolicy;
