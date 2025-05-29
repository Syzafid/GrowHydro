import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, Edit, Trash2, Image, Eye, Package } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define product schema
const productSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi produk minimal 10 karakter"),
  price: z.coerce.number().min(1000, "Harga minimal Rp 1.000"),
  stock: z.coerce.number().min(1, "Stok minimal 1"),
  category: z.string().min(1, "Kategori harus diisi"),
  images: z.array(z.string()).min(1, "Upload minimal 1 foto produk")
});

type ProductType = z.infer<typeof productSchema>;

const ProductManagement = () => {
  const [products, setProducts] = useState<ProductType[]>([
    {
      id: "prod-1",
      name: "Kit Hidroponik NFT Starter",
      description: "Kit pemula untuk sistem hidroponik Nutrient Film Technique dengan 12 lubang tanaman.",
      price: 850000,
      stock: 15,
      category: "Sistem Hidroponik",
      images: ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"]
    },
    {
      id: "prod-2",
      name: "Nutrisi AB Mix Sayuran",
      description: "Nutrisi lengkap untuk tanaman sayuran hidroponik, cukup untuk 100 liter larutan.",
      price: 125000,
      stock: 50,
      category: "Nutrisi",
      images: ["https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"]
    },
    {
      id: "prod-3",
      name: "Rockwool Cultilene 7.5x7.5cm",
      description: "Media tanam rockwool ukuran 7.5x7.5cm untuk penyemaian bibit hidroponik.",
      price: 75000,
      stock: 100,
      category: "Media Tanam",
      images: ["https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"]
    }
  ]);
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      images: []
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
  
  // Handle adding a new product
  const handleAddProduct = (data: ProductType) => {
    const newProduct = {
      ...data,
      id: `prod-${Date.now()}`
    };
    
    setProducts([...products, newProduct]);
    toast.success("Produk baru berhasil ditambahkan");
    setIsAddDialogOpen(false);
    form.reset();
    setImagePreview(null);
  };
  
  // Handle editing product
  const handleEditProduct = (data: ProductType) => {
    const updatedProducts = products.map(p => 
      p.id === selectedProduct?.id ? { ...data, id: selectedProduct.id } : p
    );
    
    setProducts(updatedProducts);
    toast.success("Produk berhasil diperbarui");
    setIsEditDialogOpen(false);
    setSelectedProduct(null);
    form.reset();
    setImagePreview(null);
  };
  
  // Handle deleting product
  const handleDeleteProduct = () => {
    if (selectedProduct) {
      const filteredProducts = products.filter(p => p.id !== selectedProduct.id);
      setProducts(filteredProducts);
      toast.success("Produk berhasil dihapus");
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, we'd upload to cloud storage
      // For this demo, we'll create a data URL
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        setImagePreview(dataUrl);
        
        // When editing, keep existing images and add new one
        if (isEditDialogOpen && selectedProduct) {
          form.setValue("images", [...selectedProduct.images, dataUrl]);
        } else {
          form.setValue("images", [dataUrl]);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Open edit dialog
  const openEditDialog = (product: ProductType) => {
    setSelectedProduct(product);
    form.reset(product);
    setImagePreview(product.images[0] || null);
    setIsEditDialogOpen(true);
  };
  
  // Open delete dialog
  const openDeleteDialog = (product: ProductType) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };
  
  // Reset form when dialog closes
  const handleDialogClose = () => {
    form.reset();
    setImagePreview(null);
    setSelectedProduct(null);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manajemen Produk</CardTitle>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-hijau-500 hover:bg-hijau-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Tambah Produk
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Tambah Produk Baru</DialogTitle>
                <DialogDescription>
                  Masukkan informasi produk baru yang akan ditambahkan ke toko Anda.
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAddProduct)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Produk</FormLabel>
                        <FormControl>
                          <Input placeholder="Nama produk" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deskripsi</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Deskripsi produk secara detail" 
                            rows={4} 
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
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Harga (Rp)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Contoh: 150000" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stok</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Jumlah stok produk" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Kategori produk" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="images"
                    render={() => (
                      <FormItem>
                        <FormLabel>Foto Produk</FormLabel>
                        <div className="space-y-4">
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                            {imagePreview ? (
                              <div className="space-y-4 w-full">
                                <img 
                                  src={imagePreview} 
                                  alt="Preview" 
                                  className="w-full h-48 object-cover rounded-md" 
                                />
                                <Button 
                                  type="button"
                                  variant="outline"
                                  className="w-full"
                                  onClick={() => {
                                    setImagePreview(null);
                                    form.setValue("images", []);
                                  }}
                                >
                                  Hapus Foto
                                </Button>
                              </div>
                            ) : (
                              <>
                                <Image className="h-10 w-10 text-gray-400 mb-2" />
                                <p className="text-sm text-gray-500 mb-2">Unggah foto produk</p>
                                <p className="text-xs text-gray-400 mb-4">
                                  Format: JPG, PNG atau GIF (maks. 5MB)
                                </p>
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="w-full max-w-xs"
                                />
                              </>
                            )}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
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
                      Simpan Produk
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
                  <TableHead>Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        {product.images[0] ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover" 
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                            <Package className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[250px]">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{formatRupiah(product.price)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${product.stock > 10 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {product.stock} unit
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDeleteDialog(product)}
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
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Produk</DialogTitle>
            <DialogDescription>
              Edit informasi produk yang sudah ada.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditProduct)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Produk</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama produk" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Deskripsi produk secara detail" 
                        rows={4} 
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
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga (Rp)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Contoh: 150000" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stok</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="Jumlah stok produk" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Kategori produk" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>Foto Produk</FormLabel>
                    <div className="space-y-4">
                      {imagePreview && (
                        <div>
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-48 object-cover rounded-md" 
                          />
                        </div>
                      )}
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                        <Image className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Ganti foto produk</p>
                        <p className="text-xs text-gray-400 mb-4">
                          Format: JPG, PNG atau GIF (maks. 5MB)
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full max-w-xs"
                        />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
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
            <DialogTitle>Hapus Produk</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus produk ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="py-4">
              <div className="flex items-center space-x-3">
                {selectedProduct.images[0] ? (
                  <img 
                    src={selectedProduct.images[0]} 
                    alt={selectedProduct.name}
                    className="w-12 h-12 rounded object-cover" 
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{selectedProduct.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatRupiah(selectedProduct.price)} • Stok: {selectedProduct.stock}
                  </p>
                </div>
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
              onClick={handleDeleteProduct}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductManagement;