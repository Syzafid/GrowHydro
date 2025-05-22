
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface ProfileTabProps {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userData, setUserData }) => {
  const { t } = useLanguage();
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("Profile updated successfully"));
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("Password updated successfully"));
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-display font-semibold text-leaf-800">{t("Personal Information")}</h2>
      <Card>
        <form onSubmit={handleUpdateProfile}>
          <CardHeader>
            <CardTitle>{t("Profile Details")}</CardTitle>
            <CardDescription>{t("Update your personal information.")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t("First Name")}</Label>
                <Input 
                  id="firstName" 
                  value={userData.firstName} 
                  onChange={(e) => setUserData({...userData, firstName: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t("Last Name")}</Label>
                <Input 
                  id="lastName" 
                  value={userData.lastName} 
                  onChange={(e) => setUserData({...userData, lastName: e.target.value})} 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("Email Address")}</Label>
              <Input 
                id="email" 
                type="email" 
                value={userData.email} 
                onChange={(e) => setUserData({...userData, email: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("Phone Number")}</Label>
              <Input 
                id="phone" 
                value={userData.phone} 
                onChange={(e) => setUserData({...userData, phone: e.target.value})} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">{t("Address")}</Label>
              <Textarea 
                id="address" 
                value={userData.address} 
                onChange={(e) => setUserData({...userData, address: e.target.value})} 
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">{t("Save Changes")}</Button>
          </CardFooter>
        </form>
      </Card>
      
      <Card>
        <form onSubmit={handleUpdatePassword}>
          <CardHeader>
            <CardTitle>{t("Change Password")}</CardTitle>
            <CardDescription>{t("Update your account password.")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">{t("Current Password")}</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">{t("New Password")}</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t("Confirm New Password")}</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">{t("Update Password")}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ProfileTab;
