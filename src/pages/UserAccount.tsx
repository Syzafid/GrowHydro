
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { User, LogOut, CreditCard, Heart, Bell, Settings, Package } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useLanguage } from '@/contexts/LanguageContext';

// Import smaller components
import ProfileSidebar from '@/components/account/ProfileSidebar';
import OrdersTab from '@/components/account/tabs/OrdersTab';
import WishlistTab from '@/components/account/tabs/WishlistTab';
import ProfileTab from '@/components/account/tabs/ProfileTab';
import PaymentTab from '@/components/account/tabs/PaymentTab';
import SettingsTab from '@/components/account/tabs/SettingsTab';

// Mock data
const mockOrders = [
  {
    id: "ORD-12345",
    date: "2024-05-10",
    status: "Delivered",
    total: 149.99,
    items: [
      { id: "p1", name: "Mini Hydroponic System", price: 99.99, quantity: 1 },
      { id: "p2", name: "Nutrient Pack", price: 24.99, quantity: 2 }
    ]
  },
  {
    id: "ORD-12346",
    date: "2024-05-05",
    status: "Shipped",
    total: 249.99,
    items: [
      { id: "p3", name: "Indoor Grow Light", price: 149.99, quantity: 1 },
      { id: "p4", name: "Herb Seeds Pack", price: 19.99, quantity: 5 }
    ]
  }
];

const mockWishlist = [
  { id: "w1", name: "Advanced Hydroponic Station", price: 399.99, image: "/images/products/advanced-hydro.jpg" },
  { id: "w2", name: "Smart Water Monitor", price: 59.99, image: "/images/products/water-monitor.jpg" },
  { id: "w3", name: "LED Grow Panel", price: 129.99, image: "/images/products/led-panel.jpg" }
];

const UserAccount: React.FC = () => {
  const { t } = useLanguage();
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 555-123-4567",
    address: "123 Green St, Plantville, GA 30303",
    profileImage: "/images/avatars/user-1.jpg",
    notifications: {
      orderUpdates: true,
      promotions: false,
      blogPosts: true
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simulating image upload
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserData({
            ...userData,
            profileImage: event.target.result.toString()
          });
          toast.success(t("Profile picture updated"));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleNotification = (key: keyof typeof userData.notifications) => {
    setUserData({
      ...userData,
      notifications: {
        ...userData.notifications,
        [key]: !userData.notifications[key]
      }
    });
    toast.success(t("Notification preference updated"));
  };

  // Format currency based on the selected language
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-grow container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <ProfileSidebar 
              userData={userData} 
              onImageUpload={handleImageUpload} 
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package size={16} />
                  <span className="hidden sm:inline">{t("Orders")}</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2">
                  <Heart size={16} />
                  <span className="hidden sm:inline">{t("Wishlist")}</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden sm:inline">{t("Profile")}</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard size={16} />
                  <span className="hidden sm:inline">{t("Payment")}</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2">
                  <Settings size={16} />
                  <span className="hidden sm:inline">{t("Settings")}</span>
                </TabsTrigger>
              </TabsList>

              {/* Tabs Content */}
              <TabsContent value="orders">
                <OrdersTab orders={mockOrders} formatCurrency={formatCurrency} />
              </TabsContent>

              <TabsContent value="wishlist">
                <WishlistTab items={mockWishlist} formatCurrency={formatCurrency} />
              </TabsContent>

              <TabsContent value="profile">
                <ProfileTab userData={userData} setUserData={setUserData} />
              </TabsContent>

              <TabsContent value="payment">
                <PaymentTab />
              </TabsContent>

              <TabsContent value="settings">
                <SettingsTab 
                  notifications={userData.notifications} 
                  onToggleNotification={handleToggleNotification} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default UserAccount;
