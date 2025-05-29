import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit, Trash2, Percent } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define promo schema
const promoSchema = z.object({
  id: z.string().optional(),
  code: z.string().min(3, "Kode promo minimal 3 karakter").toUpperCase(),
  name: z.string().min(3, "Nama promo minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi promo minimal 10 karakter"),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.coerce.number().min(1, "Nilai diskon minimal 1"),
  minPurchase: z.coerce.number().min(0, "Minimal pembelian tidak boleh negatif"),
  maxDiscount: z.coerce.number().optional(),
  startDate: z.string().min(1, "Tanggal mulai harus diisi"),
  endDate: z.string().min(1, "Tanggal berakhir harus diisi"),
  isActive: z.boolean().default(true),
  applyToAll: z.boolean().default(true),
  specificProducts: z.array(z.string()).optional()
});

type PromoType = z.infer<typeof promoSchema>;

const PromoManagement = () => {
  // Sample promos data
  const [promos, setPromos] = useState<PromoType[]>([
    {
      id: "promo-1",
      code: "WELCOME20",
      name: "Diskon Pelanggan Baru",
      description: "Diskon 20% untuk pelanggan baru, maksimal Rp 100.000",
      discountType: "percentage",
      discountValue: 20,
      minPurchase: 200000,
      maxDiscount: 100000,
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      isActive: true,
      applyToAll: true
    },
    {
      id: "promo-2",
      code: "HEMAT50K",
      name: "Diskon Rp 50.000",
      description: "Potongan langsung Rp 50.000 untuk pembelian minimal Rp 500.000",
      discountType: "fixed",
      discountValue: 50000,
      minPurchase: 500000,
      startDate: "2023-07-15",
      endDate: "2023-08-15",
      isActive: true,
      applyToAll: true
    },
    {
      id: "promo-3",
      code: "NUTRISI25",
      name: "Diskon Nutrisi 25%",
      description: "Diskon 25% untuk semua produk kategori nutrisi hidroponik",
      discountType: "percentage",
      discountValue: 25,
      minPurchase: 100000,
      startDate: "2023-06-20",
      endDate: "2023-09-01",
      isActive: false,
      applyToAll: false,
      specificProducts: ["prod-2", "prod-4"]
    }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState<PromoType | null>(null);
  
  const form = useForm<PromoType>({
    resolver: zodResolver(promoSchema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      minPurchase: 0,
      isActive: true,
      applyToAll: true,
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
    }
  });

  // Format currency
  const formatRupiah = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format discount display
  const formatDiscount = (promo: PromoType): string => {
    if (promo.discountType === "percentage") {
      return `${promo.discountValue}%`;
    } else {
      return formatRupiah(promo.discountValue);
    }
  };
  
  // Handle adding a new promo
  const handleAddPromo = (data: PromoType) => {
    // Capitalize promo code
    data.code = data.code.toUpperCase();
    
    const newPromo = {
      ...data,
      id: `promo-${Date.now()}`
    };
    
    setPromos([...promos, newPromo]);
    toast.success("Promo baru berhasil ditambahkan");
    setIsAddDialogOpen(false);
    form.reset();
  };
  
  // Handle editing promo
  const handleEditPromo = (data: PromoType) => {
    // Capitalize promo code
    data.code = data.code.toUpperCase();
    
    const updatedPromos = promos.map(p => 
      p.id === selectedPromo?.id ? { ...data, id: selectedPromo.id } : p
    );
    
    setPromos(updatedPromos);
    toast.success("Promo berhasil diperbarui");
    setIsEditDialogOpen(false);
    setSelectedPromo(null);
    form.reset();
  };
  
  // Handle deleting promo
  const handleDeletePromo = () => {
    if (selectedPromo) {
      const filteredPromos = promos.filter(p => p.id !== selectedPromo.id);
      setPromos(filteredPromos);
      toast.success("Promo berhasil dihapus");
      setIsDeleteDialogOpen(false);
      setSelectedPromo(null);
    }
  };
  
  // Toggle promo active status
  const togglePromoStatus = (id: string) => {
    const updatedPromos = promos.map(promo => {
      if (promo.id === id) {
        const newStatus = !promo.isActive;
        toast.success(`Promo ${promo.code} telah ${newStatus ? 'diaktifkan' : 'dinonaktifkan'}`);
        return { ...promo, isActive: newStatus };
      }
      return promo;
    });
    
    setPromos(updatedPromos);
  };
  
  // Open edit dialog
  const openEditDialog = (promo: PromoType) => {
    setSelectedPromo(promo);
    form.reset(promo);
    setIsEditDialogOpen(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (promo: PromoType) => {
    setSelectedPromo(promo);
    setIsDeleteDialogOpen(true);
  };
  
  // Reset form when dialog closes
  const handleDialogClose = () => {
    form.reset();
    setSelectedPromo(null);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manajemen Promosi</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-hijau-500 hover:bg-hijau-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Promo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah Promo Baru</DialogTitle>
                <DialogDescription>
                  Buat kode promo baru untuk pelanggan Anda.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddPromo)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kode Promo</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: WELCOME20" {...field} />
                          </FormControl>
                          <FormDescription>
                            Kode yang dimasukkan pelanggan saat checkout
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Promo</FormLabel>
                          <FormControl>
                            <Input placeholder="Contoh: Diskon Pelanggan Baru" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Jelaskan detail promo ini" 
                            rows={3} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="discountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jenis Diskon</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih jenis diskon" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="percentage">Persentase (%)</SelectItem>
                              <SelectItem value="fixed">Nilai Tetap (Rp)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="discountValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {form.watch("discountType") === "percentage" ? "Persentase Diskon (%)" : "Nilai Diskon (Rp)"}
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder={form.watch("discountType") === "percentage" ? "Contoh: 20" : "Contoh: 50000"} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="minPurchase"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimal Pembelian (Rp)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Contoh: 100000" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {form.watch("discountType") === "percentage" && (
                      <FormField
                        control={form.control}
                        name="maxDiscount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maksimal Diskon (Rp)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="Contoh: 100000" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Biarkan kosong jika tidak ada batas
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal Mulai</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tanggal Berakhir</FormLabel>
                          <FormControl>
                            <Input 
                              type="date" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                          <div>
                            <FormLabel>Status Promo</FormLabel>
                            <FormDescription>
                              Aktifkan atau nonaktifkan promo ini
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="applyToAll"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                          <div>
                            <FormLabel>Berlaku untuk Semua Produk</FormLabel>
                            <FormDescription>
                              Aktifkan untuk menerapkan ke semua produk
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        setIsAddDialogOpen(false);
                        handleDialogClose();
                      }}
                    >
                      Batal
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-hijau-500 hover:bg-hijau-600"
                    >
                      Simpan Promo
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kode</TableHead>
                  <TableHead>Nama Promo</TableHead>
                  <TableHead>Diskon</TableHead>
                  <TableHead>Min. Pembelian</TableHead>
                  <TableHead>Periode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promos.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell className="font-medium">{promo.code}</TableCell>
                    <TableCell>{promo.name}</TableCell>
                    <TableCell>
                      {formatDiscount(promo)}
                      {promo.maxDiscount && promo.discountType === "percentage" && (
                        <span className="text-xs text-gray-500 ml-1">
                          (Maks: {formatRupiah(promo.maxDiscount)})
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{formatRupiah(promo.minPurchase)}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {new Date(promo.startDate).toLocaleDateString('id-ID')} - {new Date(promo.endDate).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={promo.isActive}
                        onCheckedChange={() => togglePromoStatus(promo.id || "")} 
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(promo)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(promo)}
                          className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Promo Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Promo</DialogTitle>
            <DialogDescription>
              Edit informasi promo yang sudah ada.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditPromo)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Promo</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: WELCOME20" {...field} />
                      </FormControl>
                      <FormDescription>
                        Kode yang dimasukkan pelanggan saat checkout
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Promo</FormLabel>
                      <FormControl>
                        <Input placeholder="Contoh: Diskon Pelanggan Baru" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Jelaskan detail promo ini" 
                        rows={3} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="discountType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Diskon</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis diskon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="percentage">Persentase (%)</SelectItem>
                          <SelectItem value="fixed">Nilai Tetap (Rp)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="discountValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {form.watch("discountType") === "percentage" ? "Persentase Diskon (%)" : "Nilai Diskon (Rp)"}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder={form.watch("discountType") === "percentage" ? "Contoh: 20" : "Contoh: 50000"} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minPurchase"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimal Pembelian (Rp)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Contoh: 100000" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("discountType") === "percentage" && (
                  <FormField
                    control={form.control}
                    name="maxDiscount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maksimal Diskon (Rp)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Contoh: 100000" 
                            value={field.value || ""} 
                            onChange={(e) => {
                              const value = e.target.value === "" ? undefined : Number(e.target.value);
                              field.onChange(value);
                            }} 
                          />
                        </FormControl>
                        <FormDescription>
                          Biarkan kosong jika tidak ada batas
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Mulai</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Berakhir</FormLabel>
                      <FormControl>
                        <Input 
                          type="date" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                      <div>
                        <FormLabel>Status Promo</FormLabel>
                        <FormDescription>
                          Aktifkan atau nonaktifkan promo ini
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="applyToAll"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between p-3 border rounded-lg">
                      <div>
                        <FormLabel>Berlaku untuk Semua Produk</FormLabel>
                        <FormDescription>
                          Aktifkan untuk menerapkan ke semua produk
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    handleDialogClose();
                  }}
                >
                  Batal
                </Button>
                <Button 
                  type="submit" 
                  className="bg-hijau-500 hover:bg-hijau-600"
                >
                  Simpan Perubahan
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Hapus Promo</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus promo ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPromo && (
            <div className="py-4">
              <div className="space-y-1">
                <p className="font-medium">{selectedPromo.code} - {selectedPromo.name}</p>
                <p className="text-sm text-gray-500">{selectedPromo.description}</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeletePromo}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PromoManagement;