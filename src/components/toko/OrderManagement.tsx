import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Package, Search, Eye } from "lucide-react";
import { toast } from "sonner";

// Order type definition
type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled";
  paymentStatus: "unpaid" | "paid";
  date: string;
  trackingNumber?: string;
};

const OrderManagement = () => {
  // Sample orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-12345",
      customer: {
        name: "Budi Santoso",
        email: "budi@example.com",
        phone: "081234567890",
        address: "Jl. Mawar No. 10, Jakarta Selatan"
      },
      items: [
        {
          id: "item-1",
          productName: "Kit Hidroponik NFT Starter",
          quantity: 1,
          price: 850000
        },
        {
          id: "item-2",
          productName: "Nutrisi AB Mix Sayuran",
          quantity: 2,
          price: 125000
        }
      ],
      total: 1100000,
      status: "delivered",
      paymentStatus: "paid",
      date: "15 Jun 2023",
      trackingNumber: "JNE-123456789"
    },
    {
      id: "ORD-12344",
      customer: {
        name: "Dewi Wulandari",
        email: "dewi@example.com",
        phone: "087654321098",
        address: "Jl. Melati No. 5, Bandung"
      },
      items: [
        {
          id: "item-3",
          productName: "Rockwool Cultilene 7.5x7.5cm",
          quantity: 5,
          price: 75000
        },
        {
          id: "item-4",
          productName: "Nutrisi AB Mix Buah",
          quantity: 3,
          price: 150000
        }
      ],
      total: 825000,
      status: "shipped",
      paymentStatus: "paid",
      date: "14 Jun 2023",
      trackingNumber: "SiCepat-987654321"
    },
    {
      id: "ORD-12343",
      customer: {
        name: "Ahmad Rasyid",
        email: "ahmad@example.com",
        phone: "089876543210",
        address: "Jl. Anggrek No. 8, Surabaya"
      },
      items: [
        {
          id: "item-5",
          productName: "Pompa Air 10W",
          quantity: 1,
          price: 250000
        },
        {
          id: "item-6",
          productName: "Netpot 5cm (50pcs)",
          quantity: 2,
          price: 35000
        }
      ],
      total: 320000,
      status: "processing",
      paymentStatus: "paid",
      date: "13 Jun 2023"
    },
    {
      id: "ORD-12342",
      customer: {
        name: "Siti Aminah",
        email: "siti@example.com",
        phone: "081122334455",
        address: "Jl. Cempaka No. 3, Yogyakarta"
      },
      items: [
        {
          id: "item-7",
          productName: "Kit Hidroponik DFT 8 Lubang",
          quantity: 1,
          price: 550000
        },
        {
          id: "item-8",
          productName: "TDS Meter Digital",
          quantity: 1,
          price: 145000
        }
      ],
      total: 695000,
      status: "delivered",
      paymentStatus: "paid",
      date: "12 Jun 2023",
      trackingNumber: "JNT-135792468"
    }
  ]);
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Format currency
  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Status label mappings
  const statusLabels = {
    pending: "Menunggu",
    processing: "Diproses",
    shipped: "Dikirim",
    delivered: "Selesai",
    canceled: "Dibatalkan"
  };
  
  // Status color mappings
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Payment status color mappings
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  // Handle updating order status
  const handleUpdateStatus = (newStatus: "pending" | "processing" | "shipped" | "delivered" | "canceled") => {
    if (selectedOrder) {
      const updatedOrders = orders.map(order => 
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      );
      
      setOrders(updatedOrders);
      setSelectedOrder({ ...selectedOrder, status: newStatus });
      toast.success(`Status pesanan ${selectedOrder.id} diubah menjadi ${statusLabels[newStatus]}`);
      setIsUpdateStatusDialogOpen(false);
    }
  };
  
  // Filter orders based on search and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchQuery === "" || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = statusFilter === null || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // View order details
  const openViewDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };
  
  // Open update status dialog
  const openUpdateStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsUpdateStatusDialogOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manajemen Pesanan</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari ID atau nama pelanggan"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 w-[250px]"
              />
            </div>
            <Select value={statusFilter || ""} onValueChange={(val) => setStatusFilter(val || null)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Menunggu</SelectItem>
                <SelectItem value="processing">Diproses</SelectItem>
                <SelectItem value="shipped">Dikirim</SelectItem>
                <SelectItem value="delivered">Selesai</SelectItem>
                <SelectItem value="canceled">Dibatalkan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Pesanan</TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pembayaran</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer.name}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>{formatRupiah(order.total)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {statusLabels[order.status]}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus === "paid" ? "Dibayar" : "Belum Dibayar"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openViewDialog(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openUpdateStatusDialog(order)}
                            className="text-blue-600"
                          >
                            <Truck className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                      Tidak ada pesanan yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Pesanan {selectedOrder?.id}</DialogTitle>
            <DialogDescription>
              Informasi lengkap tentang pesanan ini
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                    {statusLabels[selectedOrder.status]}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                    {selectedOrder.paymentStatus === "paid" ? "Dibayar" : "Belum Dibayar"}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Tanggal: {selectedOrder.date}
                </div>
              </div>
              
              {/* Customer Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Informasi Pelanggan</h4>
                <div className="space-y-1">
                  <p className="text-sm"><span className="font-medium">Nama:</span> {selectedOrder.customer.name}</p>
                  <p className="text-sm"><span className="font-medium">Email:</span> {selectedOrder.customer.email}</p>
                  <p className="text-sm"><span className="font-medium">Telepon:</span> {selectedOrder.customer.phone}</p>
                  <p className="text-sm"><span className="font-medium">Alamat:</span> {selectedOrder.customer.address}</p>
                </div>
              </div>
              
              {/* Order Items */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Produk yang Dipesan</h4>
                <div className="space-y-3">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center border-b pb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          <Package className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-500">
                            {formatRupiah(item.price)} x {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="font-medium text-sm">
                        {formatRupiah(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">{formatRupiah(selectedOrder.total)}</span>
                </div>
              </div>
              
              {/* Tracking Number */}
              {selectedOrder.trackingNumber && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-hijau-500" />
                    <div>
                      <p className="text-sm font-medium">Nomor Pelacakan</p>
                      <p className="text-xs text-gray-500">{selectedOrder.trackingNumber}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-hijau-500">
                    Lacak
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Update Status Dialog */}
      <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Perbarui Status Pesanan</DialogTitle>
            <DialogDescription>
              Ubah status pesanan {selectedOrder?.id} untuk pelanggan {selectedOrder?.customer.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Status Saat Ini:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>
                  {statusLabels[selectedOrder.status]}
                </span>
              </div>
              
              <div className="space-y-4">
                <Button
                  onClick={() => handleUpdateStatus("pending")}
                  variant="outline"
                  className={`w-full justify-start ${selectedOrder.status === "pending" ? "border-yellow-500 bg-yellow-50" : ""}`}
                >
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  Menunggu
                </Button>
                
                <Button
                  onClick={() => handleUpdateStatus("processing")}
                  variant="outline"
                  className={`w-full justify-start ${selectedOrder.status === "processing" ? "border-blue-500 bg-blue-50" : ""}`}
                >
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  Diproses
                </Button>
                
                <Button
                  onClick={() => handleUpdateStatus("shipped")}
                  variant="outline"
                  className={`w-full justify-start ${selectedOrder.status === "shipped" ? "border-purple-500 bg-purple-50" : ""}`}
                >
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  Dikirim
                </Button>
                
                <Button
                  onClick={() => handleUpdateStatus("delivered")}
                  variant="outline"
                  className={`w-full justify-start ${selectedOrder.status === "delivered" ? "border-green-500 bg-green-50" : ""}`}
                >
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  Selesai
                </Button>
                
                <Button
                  onClick={() => handleUpdateStatus("canceled")}
                  variant="outline"
                  className={`w-full justify-start ${selectedOrder.status === "canceled" ? "border-red-500 bg-red-50" : ""}`}
                >
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  Dibatalkan
                </Button>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsUpdateStatusDialogOpen(false)}
            >
              Batal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderManagement;