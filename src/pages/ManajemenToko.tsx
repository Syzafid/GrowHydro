import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package,
  ShoppingCart,
  Users,
  Truck,
  MessageSquare,
  Settings,
  Clipboard,
  TrendingUp,
  AlertCircle,
  BarChart,
  LineChart,
} from "lucide-react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChartContainer } from "@/components/ui/chart";
import ProductManagement from "@/components/toko/ProductManagement";
import OrderManagement from "@/components/toko/OrderManagement";
import PromoManagement from "@/components/toko/PromoManagement";
import StoreSettings from "@/components/toko/StoreSettings";
import SalesAnalytics from "@/components/toko/SalesAnalytics";

const ManajemenToko = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample stats data
  const statsData = {
    totalOrders: 248,
    pendingOrders: 12,
    totalProducts: 34,
    totalCustomers: 156,
    revenue: 15750000,
    messagesToday: 8
  };
  
  // Helper function to format currency
  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Sample recent orders
  const recentOrders = [
    {
      id: "ORD-12345",
      customer: "Rizky fadillah",
      date: "15 Jun 2023",
      amount: 450000,
      status: "Selesai"
    },
    {
      id: "ORD-12344",
      customer: "Ihsan Ramli",
      date: "14 Jun 2023",
      amount: 850000,
      status: "Dikirim"
    },
    {
      id: "ORD-12343",
      customer: "Ibrahim Alex",
      date: "13 Jun 2023",
      amount: 320000,
      status: "Diproses"
    },
    {
      id: "ORD-12342",
      customer: "Arya Kurniawan",
      date: "12 Jun 2023",
      amount: 695000,
      status: "Selesai"
    }
  ];
  
  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-green-100 text-green-800";
      case "Dikirim":
        return "bg-blue-100 text-blue-800";
      case "Diproses":
        return "bg-yellow-100 text-yellow-800";
      case "Dibatalkan":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    // Menggunakan flex-col dan min-h-screen pada wrapper utama
    // Untuk memastikan Header di atas, Footer di bawah, dan konten mengambil sisa ruang
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header /> {/* Header berada di luar div konten utama agar selalu di paling atas */}
      
      {/* Konten utama yang akan mengisi sisa ruang yang tersedia, dengan padding vertikal */}
      <main className="flex-grow container mx-auto px-4 py-8"> {/* Menambahkan py-8 di sini */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manajemen Toko</h1>
            <p className="text-gray-600">
              Kelola toko hidroponik online Anda dengan mudah
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-4">
            <Button variant="outline" onClick={() => setActiveTab("settings")}>
              <Settings className="h-4 w-4 mr-2" />
              Pengaturan
            </Button>
            <Button className="bg-hijau-500 hover:bg-hijau-600 text-white" onClick={() => setActiveTab("products")}>
              <Package className="h-4 w-4 mr-2" />
              Tambah Produk
            </Button>
          </div>
        </div>
        
        {/* Dashboard Tabs */}
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="bg-white p-1 rounded-lg shadow-sm">
  <TabsTrigger 
    value="overview" 
    className="
      data-[state=active]:bg-hijau-500 
      data-[state=active]:text-black 
      data-[state=active]:font-bold   // Tambahkan ini untuk membuat teks bold
    "
  >
    Ikhtisar
  </TabsTrigger>
  <TabsTrigger 
    value="products" 
    className="
      data-[state=active]:bg-hijau-500 
      data-[state=active]:text-black  
      data-[state=active]:font-bold
    "
  >
    Produk
  </TabsTrigger>
  <TabsTrigger 
    value="orders" 
    className="
      data-[state=active]:bg-hijau-500 
      data-[state=active]:text-black 
      data-[state=active]:font-bold
    "
  >
    Pesanan
  </TabsTrigger>
  <TabsTrigger 
    value="promos" 
    className="
      data-[state=active]:bg-hijau-500 
      data-[state=active]:text-black 
      data-[state=active]:font-bold
    "
  >
    Promosi
  </TabsTrigger>
  <TabsTrigger 
    value="analytics" 
    className="
      data-[state=active]:bg-hijau-500 
      data-[state=active]:text-black 
      data-[state=active]:font-bold
    "
  >
    Analisis
  </TabsTrigger>
  <TabsTrigger 
    value="settings" 
    className="
      data-[state=active]:bg-hijau-500 
      data-[state=active]:text-black 
      data-[state=active]:font-bold
    "
  >
    Pengaturan
  </TabsTrigger>
</TabsList>
          
          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Pesanan</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{statsData.totalOrders}</p>
                    </div>
                    <div className="bg-hijau-100 p-3 rounded-full">
                      <ShoppingCart className="h-6 w-6 text-hijau-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>8% lebih tinggi</span>
                    </div>
                    <span className="text-gray-500 ml-2">dari bulan lalu</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pendapatan</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{formatRupiah(statsData.revenue)}</p>
                    </div>
                    <div className="bg-hijau-100 p-3 rounded-full">
                      <BarChart className="h-6 w-6 text-hijau-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>12% lebih tinggi</span>
                    </div>
                    <span className="text-gray-500 ml-2">dari bulan lalu</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Pelanggan</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{statsData.totalCustomers}</p>
                    </div>
                    <div className="bg-hijau-100 p-3 rounded-full">
                      <Users className="h-6 w-6 text-hijau-500" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    <div className="flex items-center text-green-500">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>5% lebih tinggi</span>
                    </div>
                    <span className="text-gray-500 ml-2">dari bulan lalu</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Orders and Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Pesanan Terbaru</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="text-xs text-gray-700 bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left">ID</th>
                          <th className="px-4 py-3 text-left">Pelanggan</th>
                          <th className="px-4 py-3 text-left">Tanggal</th>
                          <th className="px-4 py-3 text-right">Jumlah</th>
                          <th className="px-4 py-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {recentOrders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-4 py-3 text-blue-600">{order.id}</td>
                            <td className="px-4 py-3">{order.customer}</td>
                            <td className="px-4 py-3 text-gray-500">{order.date}</td>
                            <td className="px-4 py-3 text-right font-medium">{formatRupiah(order.amount)}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Button variant="link" className="text-hijau-500 hover:text-hijau-600" onClick={() => setActiveTab("orders")}>
                      Lihat Semua Pesanan
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Kinerja Toko</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 rounded-lg">
                    <ChartContainer
                      config={{
                        sales: { color: "#22c55e" },
                        visitors: { color: "#3b82f6" },
                      }}
                      className="w-full h-full"
                    >
                      {/* Placeholder for a charting library component (e.g., from Recharts, Nivo, Chart.js) */}
                      {/* You would replace this div with actual chart components (e.g., <LineChart data={...} />) */}
                      <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
                        <LineChart className="h-24 w-24 text-gray-300" /> 
                        <p className="text-gray-500 ml-4">
                          Grafik pendapatan bulanan ditampilkan di sini
                        </p>
                      </div>
                    </ChartContainer>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Produk Terlaris</p>
                      <p className="text-lg font-medium mt-1">Starter Kit Hidroponik NFT</p>
                      <p className="text-sm text-green-500 mt-1">32 terjual bulan ini</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Rating Toko</p>
                      <div className="flex items-center mt-1">
                        <span className="text-lg font-medium">4.8</span>
                        <span className="text-yellow-500 ml-1">★★★★★</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Dari 124 ulasan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-gray-800 mb-4">Aksi Cepat</h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2" onClick={() => setActiveTab("products")}>
                  <Package className="h-6 w-6 mb-2" />
                  <span>Tambah Produk</span>
                </Button>
                
                <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2" onClick={() => setActiveTab("orders")}>
                  <Clipboard className="h-6 w-6 mb-2" />
                  <span>Pesanan Baru</span>
                </Button>
                
                <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2" onClick={() => setActiveTab("orders")}>
                  <Truck className="h-6 w-6 mb-2" />
                  <span>Pengiriman</span>
                </Button>
                
                <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2">
                  <MessageSquare className="h-6 w-6 mb-2" />
                  <span>Pesan</span>
                </Button>
                
                <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2" onClick={() => setActiveTab("analytics")}>
                  <BarChart className="h-6 w-6 mb-2" />
                  <span>Laporan</span>
                </Button>
                
                <Button variant="outline" className="h-auto flex flex-col items-center py-4 px-2" onClick={() => setActiveTab("settings")}>
                  <Settings className="h-6 w-6 mb-2" />
                  <span>Pengaturan</span>
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Products Tab Content */}
          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>
          
          {/* Orders Tab Content */}
          <TabsContent value="orders">
            <OrderManagement />
          </TabsContent>
          
          {/* Promos Tab Content */}
          <TabsContent value="promos">
            <PromoManagement />
          </TabsContent>
          
          {/* Analytics Tab Content */}
          <TabsContent value="analytics">
            <SalesAnalytics />
          </TabsContent>
          
          {/* Settings Tab Content */}
          <TabsContent value="settings">
            <StoreSettings />
          </TabsContent>
        </Tabs>
        
        {/* Alert Message */}
        <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded-lg flex">
          <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Perhatian</h3>
            <div className="mt-1 text-sm text-blue-700">
              <p>
                Halaman ini adalah tampilan awal dari Manajemen Toko. Untuk akses penuh ke fitur 
                manajemen toko, silakan selesaikan pendaftaran dan verifikasi toko Anda.
              </p>
            </div>
          </div>
        </div>
      </main> {/* Tutup main tag */}

      <Footer /> {/* Footer berada di luar div konten utama agar selalu di paling bawah */}
    </div>
  );
};

export default ManajemenToko;