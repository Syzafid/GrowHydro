import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MapPin, Image, Upload, Settings, Truck, QrCode, Eye } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define store settings schema
const storeSchema = z.object({
  storeName: z.string().min(3, "Nama toko minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi toko minimal 10 karakter"),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  address: z.string().min(10, "Alamat minimal 10 karakter"),
  city: z.string().min(2, "Nama kota minimal 2 karakter"),
  province: z.string().min(2, "Nama provinsi minimal 2 karakter"),
  postalCode: z.string().min(5, "Kode pos minimal 5 karakter"),
  logo: z.string().optional(),
  banner: z.string().optional(),
});

const deliverySchema = z.object({
  enableFreeShipping: z.boolean().default(false),
  freeShippingMinimum: z.coerce.number().min(0, "Minimal pembelian tidak boleh negatif"),
  enableLocalPickup: z.boolean().default(false),
  localPickupAddress: z.string().optional(),
  shippingMethods: z.array(z.string()).min(1, "Pilih minimal satu metode pengiriman"),
});

const notificationSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  newOrderNotifications: z.boolean().default(true),
  lowStockNotifications: z.boolean().default(true),
  lowStockThreshold: z.coerce.number().min(1, "Ambang batas stok minimal 1"),
});

// Define shipping methods
const availableShippingMethods = [
  { id: "jne", name: "JNE" },
  { id: "pos", name: "POS Indonesia" },
  { id: "tiki", name: "TIKI" },
  { id: "sicepat", name: "SiCepat" },
  { id: "jnt", name: "J&T Express" },
  { id: "custom", name: "Pengiriman Kustom" }
];

const StoreSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [logoPreview, setLogoPreview] = useState<string | null>("https://images.unsplash.com/photo-1523712999610-f77fbcfc3843");
  const [bannerPreview, setBannerPreview] = useState<string | null>("https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9");
  
  // Store settings form
  const storeForm = useForm<z.infer<typeof storeSchema>>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      storeName: "HijauTumbuh Official",
      description: "Toko perlengkapan hidroponik terlengkap dengan kualitas terbaik dan harga bersaing.",
      email: "toko@hijautumbuh.id",
      phone: "08123456789",
      address: "Jl. Raya Hidroponik No. 123",
      city: "Jakarta Selatan",
      province: "DKI Jakarta",
      postalCode: "12345",
      logo: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843",
      banner: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
    }
  });
  
  // Delivery settings form
  const deliveryForm = useForm<z.infer<typeof deliverySchema>>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      enableFreeShipping: true,
      freeShippingMinimum: 500000,
      enableLocalPickup: true,
      localPickupAddress: "Jl. Raya Hidroponik No. 123, Jakarta Selatan",
      shippingMethods: ["jne", "pos", "sicepat"]
    }
  });
  
  // Notification settings form
  const notificationForm = useForm<z.infer<typeof notificationSchema>>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      newOrderNotifications: true,
      lowStockNotifications: true,
      lowStockThreshold: 5
    }
  });
  
  // Handle store settings submission
  const onStoreSubmit = (data: z.infer<typeof storeSchema>) => {
    toast.success("Pengaturan toko berhasil disimpan");
    console.log("Store settings:", data);
  };
  
  // Handle delivery settings submission
  const onDeliverySubmit = (data: z.infer<typeof deliverySchema>) => {
    toast.success("Pengaturan pengiriman berhasil disimpan");
    console.log("Delivery settings:", data);
  };
  
  // Handle notification settings submission
  const onNotificationSubmit = (data: z.infer<typeof notificationSchema>) => {
    toast.success("Pengaturan notifikasi berhasil disimpan");
    console.log("Notification settings:", data);
  };
  
  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we'd upload to cloud storage
      // For this demo, we'll create a data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setLogoPreview(dataUrl);
        storeForm.setValue("logo", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Handle banner upload
  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setBannerPreview(dataUrl);
        storeForm.setValue("banner", dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs
        defaultValue="general"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger value="general" className="data-[state=active]:bg-hijau-500 data-[state=active]:text-black data-[state=active]:font-bold">
            Umum
          </TabsTrigger>
          <TabsTrigger value="delivery" className="data-[state=active]:bg-hijau-500 data-[state=active]:text-black data-[state=active]:font-bold">
            Pengiriman
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-hijau-500 data-[state=active]:text-black data-[state=active]:font-bold">
            Notifikasi
          </TabsTrigger>
          <TabsTrigger value="ar" className="data-[state=active]:bg-hijau-500 data-[state=active]:text-black data-[state=active]:font-bold">
            Fitur AR
          </TabsTrigger>
        </TabsList>
        
        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Umum Toko</CardTitle>
              <CardDescription>
                Atur informasi dasar tentang toko hidroponik Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...storeForm}>
                <form onSubmit={storeForm.handleSubmit(onStoreSubmit)} id="store-form">
                  <div className="space-y-6">
                    {/* Store Logo */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Identitas Visual Toko</h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Logo */}
                        <FormField
                          control={storeForm.control}
                          name="logo"
                          render={() => (
                            <FormItem>
                              <FormLabel>Logo Toko</FormLabel>
                              <div className="space-y-4">
                                {logoPreview && (
                                  <div className="w-32 h-32 rounded-lg border overflow-hidden">
                                    <img 
                                      src={logoPreview} 
                                      alt="Logo preview" 
                                      className="w-full h-full object-cover" 
                                    />
                                  </div>
                                )}
                                
                                <div className="flex items-center space-x-4">
                                  <div className="relative">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      className="flex items-center"
                                    >
                                      <Upload className="h-4 w-4 mr-2" />
                                      <span>Upload Logo</span>
                                    </Button>
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      onChange={handleLogoUpload}
                                      className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                  </div>
                                  
                                  {logoPreview && (
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                      onClick={() => {
                                        setLogoPreview(null);
                                        storeForm.setValue("logo", "");
                                      }}
                                    >
                                      Hapus
                                    </Button>
                                  )}
                                </div>
                                <FormDescription>
                                  Disarankan: Format PNG/JPG, ukuran 512x512px
                                </FormDescription>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* Banner */}
                        <FormField
                          control={storeForm.control}
                          name="banner"
                          render={() => (
                            <FormItem>
                              <FormLabel>Banner Toko</FormLabel>
                              <div className="space-y-4">
                                {bannerPreview && (
                                  <div className="w-full h-40 rounded-lg border overflow-hidden">
                                    <img 
                                      src={bannerPreview} 
                                      alt="Banner preview" 
                                      className="w-full h-full object-cover" 
                                    />
                                  </div>
                                )}
                                
                                <div className="flex items-center space-x-4">
                                  <div className="relative">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      className="flex items-center"
                                    >
                                      <Upload className="h-4 w-4 mr-2" />
                                      <span>Upload Banner</span>
                                    </Button>
                                    <Input
                                      type="file"
                                      accept="image/*"
                                      onChange={handleBannerUpload}
                                      className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                  </div>
                                  
                                  {bannerPreview && (
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                      onClick={() => {
                                        setBannerPreview(null);
                                        storeForm.setValue("banner", "");
                                      }}
                                    >
                                      Hapus
                                    </Button>
                                  )}
                                </div>
                                <FormDescription>
                                  Disarankan: Format PNG/JPG, ukuran 1200x300px
                                </FormDescription>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      <h3 className="text-lg font-medium">Informasi Toko</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={storeForm.control}
                          name="storeName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nama Toko</FormLabel>
                              <FormControl>
                                <Input placeholder="Nama toko Anda" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={storeForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Toko</FormLabel>
                              <FormControl>
                                <Input placeholder="email@toko.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={storeForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deskripsi Toko</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Ceritakan tentang toko Anda" 
                                rows={3} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={storeForm.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nomor Telepon</FormLabel>
                            <FormControl>
                              <Input placeholder="Contoh: 081234567890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-4 pt-4">
                      <h3 className="text-lg font-medium">Alamat Toko</h3>
                      
                      <FormField
                        control={storeForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alamat Lengkap</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Alamat lengkap toko Anda" 
                                rows={2} 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={storeForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kota</FormLabel>
                              <FormControl>
                                <Input placeholder="Kota" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={storeForm.control}
                          name="province"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Provinsi</FormLabel>
                              <FormControl>
                                <Input placeholder="Provinsi" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={storeForm.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Kode Pos</FormLabel>
                              <FormControl>
                                <Input placeholder="Kode Pos" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end">
              <Button type="submit" form="store-form" className="bg-hijau-500 hover:bg-hijau-600">
                Simpan Pengaturan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Delivery Settings */}
        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Pengiriman</CardTitle>
              <CardDescription>
                Atur metode pengiriman untuk produk toko Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...deliveryForm}>
                <form onSubmit={deliveryForm.handleSubmit(onDeliverySubmit)} id="delivery-form">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Opsi Pengiriman Gratis</h3>
                      
                      <FormField
                        control={deliveryForm.control}
                        name="enableFreeShipping"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                            <div>
                              <FormLabel className="mb-1">Aktifkan Pengiriman Gratis</FormLabel>
                              <FormDescription>
                                Penawaran pengiriman gratis dengan minimal pembelian
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
                      
                      {deliveryForm.watch("enableFreeShipping") && (
                        <FormField
                          control={deliveryForm.control}
                          name="freeShippingMinimum"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Minimal Pembelian untuk Pengiriman Gratis (Rp)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Contoh: 500000" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Pelanggan akan mendapatkan pengiriman gratis jika pembelian melebihi nilai ini
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Pengambilan di Toko</h3>
                      
                      <FormField
                        control={deliveryForm.control}
                        name="enableLocalPickup"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                            <div>
                              <FormLabel className="mb-1">Aktifkan Pengambilan di Toko</FormLabel>
                              <FormDescription>
                                Izinkan pelanggan mengambil pesanan langsung di toko
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
                      
                      {deliveryForm.watch("enableLocalPickup") && (
                        <FormField
                          control={deliveryForm.control}
                          name="localPickupAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Alamat Pengambilan</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Alamat lengkap untuk pengambilan barang" 
                                  rows={2} 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Alamat yang akan ditampilkan kepada pelanggan untuk pengambilan pesanan
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Metode Pengiriman</h3>
                      
                      <FormField
                        control={deliveryForm.control}
                        name="shippingMethods"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pilih Metode Pengiriman</FormLabel>
                            <FormDescription>
                              Pilih metode pengiriman yang tersedia untuk toko Anda
                            </FormDescription>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                              {availableShippingMethods.map((method) => (
                                <FormItem
                                  key={method.id}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <input
                                      type="checkbox"
                                      className="h-4 w-4 rounded border-gray-300 text-hijau-500 focus:ring-hijau-500"
                                      checked={field.value?.includes(method.id)}
                                      onChange={(e) => {
                                        const checked = e.target.checked;
                                        const newValue = checked
                                          ? [...field.value, method.id]
                                          : field.value.filter((value) => value !== method.id);
                                        field.onChange(newValue);
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {method.name}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end">
              <Button type="submit" form="delivery-form" className="bg-hijau-500 hover:bg-hijau-600">
                Simpan Pengaturan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Notifikasi</CardTitle>
              <CardDescription>
                Atur preferensi notifikasi untuk aktivitas toko Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} id="notification-form">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Saluran Notifikasi</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={notificationForm.control}
                          name="emailNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                              <div>
                                <FormLabel className="mb-1">Notifikasi Email</FormLabel>
                                <FormDescription>
                                  Terima notifikasi melalui email
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
                          control={notificationForm.control}
                          name="smsNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                              <div>
                                <FormLabel className="mb-1">Notifikasi SMS</FormLabel>
                                <FormDescription>
                                  Terima notifikasi melalui SMS
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
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Jenis Notifikasi</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={notificationForm.control}
                          name="newOrderNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                              <div>
                                <FormLabel className="mb-1">Pesanan Baru</FormLabel>
                                <FormDescription>
                                  Notifikasi ketika ada pesanan baru
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
                          control={notificationForm.control}
                          name="lowStockNotifications"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
                              <div>
                                <FormLabel className="mb-1">Stok Menipis</FormLabel>
                                <FormDescription>
                                  Notifikasi ketika stok produk menipis
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
                      
                      {notificationForm.watch("lowStockNotifications") && (
                        <FormField
                          control={notificationForm.control}
                          name="lowStockThreshold"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ambang Batas Stok Rendah</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  placeholder="Contoh: 5" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                Anda akan menerima notifikasi ketika stok produk kurang dari nilai ini
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end">
              <Button type="submit" form="notification-form" className="bg-hijau-500 hover:bg-hijau-600">
                Simpan Pengaturan
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* AR Feature Settings */}
        <TabsContent value="ar">
          <Card>
            <CardHeader>
              <CardTitle>Pengaturan Fitur AR</CardTitle>
              <CardDescription>
                Atur penggunaan fitur Augmented Reality (AR) untuk produk toko Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 rounded-lg flex items-start">
                  <QrCode className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-blue-800">Fitur Augmented Reality</h3>
                    <p className="text-blue-700 mt-1">
                      Fitur Augmented Reality (AR) memungkinkan pelanggan untuk melihat bagaimana produk hidroponik Anda akan terlihat di rumah mereka.
                      Untuk mengaktifkan fitur ini, Anda perlu mengunggah model 3D untuk produk-produk Anda.
                    </p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Produk dengan Model AR</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <Image className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">Kit Hidroponik NFT Starter</p>
                          <p className="text-sm text-green-600">Model AR tersedia</p>
                        </div>
                      </div>
                      <Button variant="outline" className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        <span>Lihat AR</span>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <Image className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">Kit Hidroponik DFT 8 Lubang</p>
                          <p className="text-sm text-green-600">Model AR tersedia</p>
                        </div>
                      </div>
                      <Button variant="outline" className="flex items-center">
                        <Eye className="h-4 w-4 mr-2" />
                        <span>Lihat AR</span>
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                          <Image className="h-8 w-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">Sistem Tower Garden 5 Tingkat</p>
                          <p className="text-sm text-gray-500">Model AR belum tersedia</p>
                        </div>
                      </div>
                      <Button variant="outline" className="flex items-center">
                        <Upload className="h-4 w-4 mr-2" />
                        <span>Tambah Model</span>
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="mt-6 bg-hijau-500 hover:bg-hijau-600 w-full sm:w-auto">
                    <Upload className="h-4 w-4 mr-2" />
                    Tambah Model AR untuk Produk Lainnya
                  </Button>
                </div>
                
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-amber-800">Tips Penggunaan AR</CardTitle>
                  </CardHeader>
                  <CardContent className="text-amber-700">
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Gunakan model 3D berkualitas tinggi untuk visualisasi produk yang lebih baik</li>
                      <li>Sertakan informasi ukuran produk yang akurat untuk pengalaman AR yang realistis</li>
                      <li>Tambahkan tutorial singkat untuk membantu pelanggan menggunakan fitur AR</li>
                      <li>Pastikan fitur AR berfungsi baik di sebagian besar perangkat modern</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex justify-end">
              <Button type="button" className="bg-hijau-500 hover:bg-hijau-600">
                Simpan Pengaturan AR
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StoreSettings;