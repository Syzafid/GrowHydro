
import React from 'react';
import { LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from "@/components/ui/sonner";
import { Link } from 'react-router-dom';

interface ProfileSidebarProps {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
  };
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ userData, onImageUpload }) => {
  const { t } = useLanguage();
  
  const handleLogout = () => {
    toast.info(t("You have been logged out successfully"));
    // Additional logout logic would go here
  };
  
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="w-24 h-24 border-2 border-leaf-500">
            <AvatarImage src={userData.profileImage} alt={`${userData.firstName} ${userData.lastName}`} />
            <AvatarFallback className="bg-leaf-100 text-leaf-800 text-xl">
              {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl font-display">{userData.firstName} {userData.lastName}</CardTitle>
        <CardDescription>{userData.email}</CardDescription>
      </CardHeader>
      <CardContent>
        <label className="btn-outline flex items-center justify-center w-full cursor-pointer">
          <input type="file" accept="image/*" className="hidden" onChange={onImageUpload} />
          <span>{t("Change Profile Picture")}</span>
        </label>
      </CardContent>
      <CardFooter>
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          <LogOut size={16} className="mr-2" />
          {t("Log Out")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileSidebar;
