
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NotificationSettings {
  orderUpdates: boolean;
  promotions: boolean;
  blogPosts: boolean;
}

interface SettingsTabProps {
  notifications: NotificationSettings;
  onToggleNotification: (key: keyof NotificationSettings) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ notifications, onToggleNotification }) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-semibold text-leaf-800">{t("Account Settings")}</h2>
      <Card>
        <CardHeader>
          <CardTitle>{t("Notification Preferences")}</CardTitle>
          <CardDescription>{t("Control which notifications you receive")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("Order Updates")}</p>
              <p className="text-sm text-muted-foreground">
                {t("Receive notifications about your order status changes")}
              </p>
            </div>
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications.orderUpdates}
                  onChange={() => onToggleNotification('orderUpdates')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-leaf-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-leaf-600"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("Promotional Emails")}</p>
              <p className="text-sm text-muted-foreground">
                {t("Receive emails about sales, new products, and offers")}
              </p>
            </div>
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications.promotions}
                  onChange={() => onToggleNotification('promotions')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-leaf-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-leaf-600"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t("Blog Updates")}</p>
              <p className="text-sm text-muted-foreground">
                {t("Get notified when new blog posts are published")}
              </p>
            </div>
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notifications.blogPosts}
                  onChange={() => onToggleNotification('blogPosts')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-leaf-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-leaf-600"></div>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">{t("Danger Zone")}</CardTitle>
          <CardDescription>{t("Irreversible account actions")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">{t("Delete Account")}</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
