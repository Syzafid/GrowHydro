
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowUp, ArrowDown, AlertCircle, ArrowRight } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

// Mock cart data
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: "1", name: "Mini Hydroponic System", price: 99.99, quantity: 1, image: "/images/products/mini-hydro.jpg" },
    { id: "2", name: "Nutrient Solution Pack", price: 24.99, quantity: 2, image: "/images/products/nutrients.jpg" },
    { id: "3", name: "LED Grow Light", price: 79.99, quantity: 1, image: "/images/products/led-light.jpg" }
  ]);
  
  const [totals, setTotals] = useState({
    subtotal: 0,
    shipping: 9.99,
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    // Calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Calculate tax (assume 8%)
    const tax = subtotal * 0.08;
    
    // Calculate total
    const total = subtotal + tax + (cartItems.length > 0 ? totals.shipping : 0);
    
    setTotals({
      subtotal,
      shipping: cartItems.length > 0 ? 9.99 : 0,
      tax,
      total,
    });
  }, [cartItems]);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) } 
          : item
      )
    );
    
    toast.success("Cart updated");
  };

  const removeItem = (id: string) => {
    const itemToRemove = cartItems.find(item => item.id === id);
    
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    if (itemToRemove) {
      toast.success(`${itemToRemove.name} removed from cart`);
    }
  };

  const handleCheckout = () => {
    toast.info("Proceeding to checkout...");
    // Navigate to checkout would go here
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
        <h1 className="text-3xl font-display font-semibold text-leaf-800 mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <div className="w-24 h-24 rounded-full bg-leaf-100 flex items-center justify-center mx-auto mb-6">
                <AlertCircle size={48} className="text-leaf-500" />
              </div>
            </motion.div>
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Button asChild size="lg">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="bg-gradient-to-r from-leaf-50 to-blue-50">
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-b last:border-b-0"
                      >
                        <div className="flex py-4 px-6">
                          {/* Product Image */}
                          <div className="w-24 h-24 bg-muted rounded overflow-hidden mr-4">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-grow">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                            
                            <div className="flex items-center justify-between mt-4">
                              {/* Quantity Controls */}
                              <div className="flex items-center border rounded-md">
                                <button 
                                  onClick={() => updateQuantity(item.id, -1)} 
                                  className="px-3 py-1 hover:bg-muted/50 transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  <ArrowDown size={16} />
                                </button>
                                <span className="w-10 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => updateQuantity(item.id, 1)} 
                                  className="px-3 py-1 hover:bg-muted/50 transition-colors"
                                >
                                  <ArrowUp size={16} />
                                </button>
                              </div>
                              
                              {/* Remove Button */}
                              <button 
                                onClick={() => removeItem(item.id)} 
                                className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
                              >
                                <Trash2 size={16} />
                                <span className="text-sm">Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/10">
                  <Button variant="outline" asChild>
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                  <Button variant="outline" onClick={() => setCartItems([])}>
                    Clear Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader className="bg-gradient-to-r from-leaf-50 to-blue-50">
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${totals.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${totals.shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Estimated Tax</span>
                      <span>${totals.tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${totals.total.toFixed(2)}</span>
                    </div>
                    
                    {/* Delivery Estimate */}
                    <div className="rounded-lg bg-muted/30 p-4 text-sm">
                      <p className="font-medium mb-1">Estimated Delivery</p>
                      <p>{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()} - {new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" onClick={handleCheckout}>
                    Checkout
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Cart;
