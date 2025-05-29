
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  useLocation, 
  useNavigate
} from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Suspense, lazy, useState, useEffect, startTransition } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Leaf background
// import LeafBackground from "./components/LeafBackground";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load other pages to improve initial load time
const Shop = lazy(() => import("./pages/Shop"));
const ShopCategory = lazy(() => import("./pages/ShopCategory"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ARPreview = lazy(() => import("./pages/ARPreview"));
const ManajemenToko = lazy(() => import("./pages/ManajemenToko"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const FAQ = lazy(() => import("./pages/FAQ"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const ReturnsPolicy = lazy(() => import("./pages/ReturnsPolicy"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const UserAccount = lazy(() => import("./pages/UserAccount"));
const Cart = lazy(() => import("./pages/Cart"));
const AuthorPage = lazy(() => import("./pages/AuthorPage"));
const SignIn = lazy(() => import("./pages/Auth/SignIn"));
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword"));
const OrderHistory = lazy(() => import("./pages/OrderHistory"));
const OrderTracking = lazy(() => import("./pages/OrderTracking"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const Payment = lazy(() => import("./pages/Payment"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (renamed from cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Preloader component to start loading pages in the background
const PagePreloader = () => {
  const navigate = useNavigate();
  
  // Preload commonly accessed pages after the main page has loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      // Start preloading common pages after a delay
      const preloadPages = async () => {
        startTransition(() => {
          // Preload the most commonly accessed pages first
          const preloads = [
            import("./pages/Shop"),
            import("./pages/Blog"),
            import("./pages/UserAccount"), // Preload the account page for faster login access
            import("./pages/Cart") // Also preload the cart for faster checkout
          ];
          
          Promise.all(preloads)
            .then(() => console.log("Background preloading completed"))
            .catch((error) => console.error("Error in preloading:", error));
        });
      };
      
      preloadPages();
    }, 1000); // Reduced from 2000ms to 1000ms for faster preloading
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return null; // This component doesn't render anything
};

// Animated route wrapper with improved page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
    }
  }, [isFirstLoad]);
  
  // Configure loading times for better UX
  const loadingDisplayMinTime = 600; // Minimum time to show loading indicator (ms)
  
  return (
    <>
      <PagePreloader />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }} // Even faster transition
        >
          <Suspense fallback={
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="flex items-center justify-center h-screen"
            >
              <LoadingSpinner size="lg" text="Loading content" minDisplayTime={loadingDisplayMinTime} />
            </motion.div>
          }>
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/:category" element={<ShopCategory />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/ar-preview" element={<ARPreview />} />
              <Route path="/manajemen-toko" element={<ManajemenToko />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Information pages */}
              <Route path="/about" element={<AboutUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/shipping" element={<ShippingPolicy />} />
              <Route path="/returns" element={<ReturnsPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              
              {/* Authentication pages */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Account pages */}
              <Route path="/account" element={<UserAccount />} />
              <Route path="/account/orders" element={<OrderHistory />} />
              <Route path="/account/orders/track/:id" element={<OrderTracking />} />
              <Route path="/account/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/author/:id" element={<AuthorPage />} />
              <Route path="/payment" element={<Payment />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial app loading - with a shorter time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Reduced from 600ms to 500ms
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-leaf-50 to-cream-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <LoadingSpinner size="lg" text="Welcome to GrowHydro" />
        </motion.div>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}>
            {/* <LeafBackground density="low" opacity={0.05} /> */}
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default App;
