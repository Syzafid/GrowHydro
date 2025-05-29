import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer } from "@/components/ui/chart";
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart as RechartsBarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, ShoppingCart, CreditCard } from "lucide-react";

const SalesAnalytics = () => {
  // State for time range filter
  const [timeRange, setTimeRange] = useState("month");
  
  // Format currency
  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Sample sales data by month
  const monthlySalesData = [
    { name: "Jan", sales: 3200000, orders: 32, visitors: 450 },
    { name: "Feb", sales: 4100000, orders: 41, visitors: 520 },
    { name: "Mar", sales: 3800000, orders: 38, visitors: 480 },
    { name: "Apr", sales: 4500000, orders: 45, visitors: 550 },
    { name: "Mei", sales: 5200000, orders: 52, visitors: 620 },
    { name: "Jun", sales: 6100000, orders: 61, visitors: 680 }
  ];
  
  // Sample sales data by week
  const weeklySalesData = [
    { name: "Minggu 1", sales: 1500000, orders: 15, visitors: 180 },
    { name: "Minggu 2", sales: 1650000, orders: 17, visitors: 195 },
    { name: "Minggu 3", sales: 1820000, orders: 18, visitors: 210 },
    { name: "Minggu 4", sales: 1930000, orders: 19, visitors: 225 }
  ];
  
  // Sample sales data by day (last 7 days)
  const dailySalesData = [
    { name: "Sen", sales: 820000, orders: 8, visitors: 95 },
    { name: "Sel", sales: 750000, orders: 7, visitors: 85 },
    { name: "Rab", sales: 920000, orders: 9, visitors: 105 },
    { name: "Kam", sales: 880000, orders: 9, visitors: 100 },
    { name: "Jum", sales: 1050000, orders: 10, visitors: 120 },
    { name: "Sab", sales: 1150000, orders: 12, visitors: 135 },
    { name: "Min", sales: 950000, orders: 10, visitors: 110 }
  ];
  
  // Get current data based on selected time range
  const getCurrentData = () => {
    switch (timeRange) {
      case "week":
        return dailySalesData;
      case "month":
        return weeklySalesData;
      case "year":
        return monthlySalesData;
      default:
        return monthlySalesData;
    }
  };
  
  const currentData = getCurrentData();
  
  // Calculate total sales, orders, and visitors
  const totalSales = currentData.reduce((sum, item) => sum + item.sales, 0);
  const totalOrders = currentData.reduce((sum, item) => sum + item.orders, 0);
  const totalVisitors = currentData.reduce((sum, item) => sum + item.visitors, 0);
  
  // Sample product category sales data
  const categoryData = [
    { name: "Sistem Hidroponik", value: 45 },
    { name: "Nutrisi", value: 25 },
    { name: "Media Tanam", value: 15 },
    { name: "Aksesori", value: 10 },
    { name: "Bibit", value: 5 }
  ];
  
  // Colors for pie chart
  const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0"];
  
  return (
    <div className="space-y-6">
      {/* Analytics Header with Range Selector */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analisis Penjualan</h2>
          <p className="text-gray-600">Lihat performa toko Anda dalam periode waktu tertentu</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih rentang waktu" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">7 Hari Terakhir</SelectItem>
              <SelectItem value="month">Bulan Ini</SelectItem>
              <SelectItem value="year">Tahun Ini</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Pendapatan</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formatRupiah(totalSales)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>12% lebih tinggi</span>
              </div>
              <span className="text-gray-500 ml-2">dari periode sebelumnya</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Pesanan</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalOrders}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>8% lebih tinggi</span>
              </div>
              <span className="text-gray-500 ml-2">dari periode sebelumnya</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Pengunjung</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{totalVisitors}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>15% lebih tinggi</span>
              </div>
              <span className="text-gray-500 ml-2">dari periode sebelumnya</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-500">Nilai Rata-rata</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formatRupiah(totalSales / (totalOrders || 1))}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <div className="flex items-center text-green-500">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>3% lebih tinggi</span>
              </div>
              <span className="text-gray-500 ml-2">dari periode sebelumnya</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Chart Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pendapatan</CardTitle>
            <CardDescription>
              Total pendapatan toko dalam {timeRange === "week" ? "7 hari terakhir" : timeRange === "month" ? "bulan ini" : "tahun ini"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 w-full p-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={currentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => formatRupiah(Number(value))}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    name="Pendapatan" 
                    stroke="#16a34a" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pesanan & Pengunjung</CardTitle>
            <CardDescription>
              Jumlah pesanan dan pengunjung dalam {timeRange === "week" ? "7 hari terakhir" : timeRange === "month" ? "bulan ini" : "tahun ini"}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 w-full p-4">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={currentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    yAxisId="left" 
                    dataKey="orders" 
                    name="Pesanan" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    yAxisId="right" 
                    dataKey="visitors" 
                    name="Pengunjung" 
                    fill="#a855f7" 
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Product Categories Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribusi Penjualan berdasarkan Kategori</CardTitle>
          <CardDescription>
            Persentase penjualan untuk setiap kategori produk
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-80 w-full flex items-center justify-center p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="p-6 flex flex-col justify-center">
              <h4 className="text-lg font-medium mb-4">Statistik Kategori Produk</h4>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={category.name} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm font-medium">{category.value}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full" 
                          style={{ 
                            width: `${category.value}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Produk Terlaris</CardTitle>
          <CardDescription>
            Produk dengan penjualan tertinggi dalam periode ini
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Kit Hidroponik NFT Starter", units: 32, revenue: 27200000, growth: "+12%" },
              { name: "Nutrisi AB Mix Sayuran", units: 48, revenue: 6000000, growth: "+8%" },
              { name: "Rockwool Cultilene 7.5x7.5cm", units: 120, revenue: 9000000, growth: "+15%" },
              { name: "Kit Hidroponik DFT 8 Lubang", units: 18, revenue: 9900000, growth: "+5%" },
              { name: "TDS Meter Digital", units: 24, revenue: 3480000, growth: "+10%" }
            ].map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-b last:border-0">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-hijau-100 text-hijau-600 rounded-full flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.units} unit terjual</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatRupiah(product.revenue)}</p>
                  <p className="text-sm text-green-500">{product.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesAnalytics;