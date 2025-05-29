import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X, User, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import SearchButton from './SearchButton';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Header component that includes responsive behavior
const Header: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state

  // Check if the user is scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        'sticky top-0 z-30 w-full transition-all duration-300',
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>{t('Shop')}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                      <li className="col-span-2">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop"
                            className="flex items-center justify-between w-full rounded-md bg-gradient-to-r from-leaf-50 to-leaf-100 p-4 hover:from-leaf-100 hover:to-leaf-200 transition-colors"
                          >
                            <div>
                              <div className="text-lg font-medium mb-1 text-leaf-800">{t('All Products')}</div>
                              <p className="text-sm text-leaf-600">{t('Browse our complete collection of hydroponic products')}</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-leaf-600" />
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop/starter%20kits"
                            className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100 transition-colors"
                          >
                            <div className="font-medium">{t('Starter Kits')}</div>
                            <p className="text-sm text-gray-500">{t('Complete systems for beginners and experts')}</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop/seeds-plants"
                            className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100 transition-colors"
                          >
                            <div className="font-medium">{t('Seeds & Plants')}</div>
                            <p className="text-sm text-gray-500">{t('High-quality seeds and starter plants')}</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop/nutrients supplements"
                            className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100 transition-colors"
                          >
                            <div className="font-medium">{t('Nutrients Supplements')}</div>
                            <p className="text-sm text-gray-500">{t('Feed your plants for optimal growth')}</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/shop/equipment"
                            className="block select-none space-y-1 rounded-md p-3 hover:bg-gray-100 transition-colors"
                          >
                            <div className="font-medium">{t('Equipment & Parts')}</div>
                            <p className="text-sm text-gray-500">{t('Pumps, lights, and replacement parts')}</p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/manajemen-toko" className={navigationMenuTriggerStyle()}>
                    {t('Manajemen Toko')}
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/blog" className={navigationMenuTriggerStyle()}>
                    {t('Blog')}
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/about" className={navigationMenuTriggerStyle()}>
                    {t('About')}
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/contact" className={navigationMenuTriggerStyle()}>
                    {t('Contact')}
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSwitcher />
            <SearchButton />
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/account">{t('My Account')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/orders">{t('Order History')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account/wishlist">{t('Wishlist')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setIsLoggedIn(false)}
                  >
                    {t('Sign Out')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/signin">{t('Sign In')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup">{t('Sign Up')}</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart">
                <ShoppingCart className="h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <div className="flex items-center justify-between py-2">
                <SearchButton />
              </div>
              
              <nav className="space-y-3">
                <Link 
                  to="/shop"
                  className="block py-2 font-medium border-b"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('Shop')}
                </Link>
                <div className="pl-4 space-y-2 text-sm">
                  <Link 
                    to="/shop/starter-kits"
                    className="block py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('Starter Kits')}
                  </Link>
                  <Link 
                    to="/shop/seeds-plants"
                    className="block py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('Seeds & Plants')}
                  </Link>
                  <Link 
                    to="/shop/nutrients"
                    className="block py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('Nutrients & Supplements')}
                  </Link>
                  <Link 
                    to="/shop/equipment"
                    className="block py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('Equipment & Parts')}
                  </Link>
                </div>
                
                <Link 
                  to="/blog"
                  className="block py-2 font-medium border-b"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('Blog')}
                </Link>
                
                <Link 
                  to="/about"
                  className="block py-2 font-medium border-b"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('About')}
                </Link>
                
                <Link 
                  to="/contact"
                  className="block py-2 font-medium border-b"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('Contact')}
                </Link>
              </nav>
              
              {isLoggedIn ? (
                <div className="space-y-2 pt-2">
                  <Link 
                    to="/account"
                    className="flex items-center py-2 text-leaf-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    {t('My Account')}
                  </Link>
                  
                  <Link 
                    to="/account/orders"
                    className="flex items-center py-2 text-leaf-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Package className="h-5 w-5 mr-2" />
                    {t('Order History')}
                  </Link>
                  
                  <Link 
                    to="/account/orders/track/12345"
                    className="flex items-center py-2 text-leaf-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MapPin className="h-5 w-5 mr-2" />
                    {t('Track Package')}
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start mt-2"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    {t('Sign Out')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <Button 
                    variant="default" 
                    className="w-full bg-leaf-600 hover:bg-leaf-700"
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    <Link to="/signin">{t('Sign In')}</Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                  >
                    <Link to="/signup">{t('Sign Up')}</Link>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// Arrow right icon for navigation
const ArrowRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

// Package icon for orders
const Package = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

// Log out icon
const LogOut = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

export default Header;
