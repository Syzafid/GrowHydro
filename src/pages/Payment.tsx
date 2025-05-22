
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Wallet, CreditCard, Truck, Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

// Form schema for bank transfer
const bankTransferSchema = z.object({
  accountName: z.string().min(2, { message: "Account name is required" }),
  accountNumber: z.string().min(4, { message: "Valid account number is required" }),
  bankName: z.string().min(2, { message: "Bank name is required" }),
  savePaymentMethod: z.boolean().optional(),
});

// Form schema for credit card
const creditCardSchema = z.object({
  cardNumber: z.string().min(16, { message: "Valid card number is required" }),
  cardName: z.string().min(2, { message: "Name on card is required" }),
  expiryDate: z.string().min(4, { message: "Valid expiry date is required" }),
  cvv: z.string().min(3, { message: "Valid CVV is required" }),
  savePaymentMethod: z.boolean().optional(),
});

// Form schema for e-wallet
const eWalletSchema = z.object({
  phoneNumber: z.string().min(8, { message: "Valid phone number is required" }),
  savePaymentMethod: z.boolean().optional(),
});

type BankTransferData = z.infer<typeof bankTransferSchema>;
type CreditCardData = z.infer<typeof creditCardSchema>;
type EWalletData = z.infer<typeof eWalletSchema>;

const Payment: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'e-wallet' | 'bank-transfer' | 'cod'>('credit-card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'processing' | 'success' | 'failed'>();

  // Bank transfer form
  const bankTransferForm = useForm<BankTransferData>({
    resolver: zodResolver(bankTransferSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      savePaymentMethod: false
    }
  });

  // Credit card form
  const creditCardForm = useForm<CreditCardData>({
    resolver: zodResolver(creditCardSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      savePaymentMethod: false
    }
  });

  // E-Wallet form
  const eWalletForm = useForm<EWalletData>({
    resolver: zodResolver(eWalletSchema),
    defaultValues: {
      phoneNumber: "",
      savePaymentMethod: false
    }
  });

  const handlePayment = async () => {
    setIsSubmitting(true);
    
    try {
      let formData;
      
      // Validate form based on payment method
      switch (paymentMethod) {
        case 'credit-card':
          formData = await creditCardForm.handleSubmit((data) => data)();
          break;
        case 'e-wallet':
          formData = await eWalletForm.handleSubmit((data) => data)();
          break;
        case 'bank-transfer':
          formData = await bankTransferForm.handleSubmit((data) => data)();
          break;
        case 'cod':
          // No validation needed for COD
          formData = {};
          break;
      }
      
      console.log('Payment data:', { method: paymentMethod, ...formData });
      
      // Show payment confirmation dialog
      setShowConfirmationDialog(true);
      setPaymentStatus('processing');
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 90% chance of success
      if (Math.random() > 0.1) {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('failed');
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(t('Please fill all required fields.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseDialog = () => {
    if (paymentStatus === 'success') {
      toast.success(t('Payment completed successfully!'));
      navigate('/account/orders');
    } else if (paymentStatus === 'failed') {
      toast.error(t('Payment failed. Please try again.'));
    }
    
    setShowConfirmationDialog(false);
    setPaymentStatus(undefined);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return (
          <Form {...creditCardForm}>
            <form className="space-y-4">
              <FormField
                control={creditCardForm.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Card Number')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        autoComplete="cc-number"
                        {...field}
                        onChange={(e) => {
                          // Format card number with spaces
                          let value = e.target.value.replace(/\s/g, '');
                          if (value.length > 16) value = value.slice(0, 16);
                          const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
                          field.onChange(formattedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={creditCardForm.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Name on Card')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        autoComplete="cc-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={creditCardForm.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('Expiry Date')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="MM/YY"
                          maxLength={5}
                          autoComplete="cc-exp"
                          {...field}
                          onChange={(e) => {
                            // Format expiry date
                            let value = e.target.value.replace(/\//g, '');
                            if (value.length > 4) value = value.slice(0, 4);
                            
                            if (value.length > 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2);
                            }
                            
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={creditCardForm.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('CVV')}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123"
                          maxLength={4}
                          autoComplete="cc-csc"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={creditCardForm.control}
                name="savePaymentMethod"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-1">
                      <FormLabel className="m-0">
                        {t('Save this payment method')}
                      </FormLabel>
                      <Save className="h-4 w-4 text-gray-400" />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      
      case 'e-wallet':
        return (
          <Form {...eWalletForm}>
            <form className="space-y-4">
              <FormField
                control={eWalletForm.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Phone Number')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+62 xxx xxx xxxx"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={eWalletForm.control}
                name="savePaymentMethod"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-1">
                      <FormLabel className="m-0">
                        {t('Save this payment method')}
                      </FormLabel>
                      <Save className="h-4 w-4 text-gray-400" />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      
      case 'bank-transfer':
        return (
          <Form {...bankTransferForm}>
            <form className="space-y-4">
              <FormField
                control={bankTransferForm.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Bank Name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Bank Central Asia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={bankTransferForm.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Account Name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={bankTransferForm.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Account Number')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456789"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={bankTransferForm.control}
                name="savePaymentMethod"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex items-center space-x-1">
                      <FormLabel className="m-0">
                        {t('Save this payment method')}
                      </FormLabel>
                      <Save className="h-4 w-4 text-gray-400" />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        );
      
      case 'cod':
        return (
          <div className="py-4">
            <div className="bg-yellow-50 p-4 rounded-md">
              <p className="text-yellow-800">{t('Pay with cash when your order is delivered.')}</p>
              <p className="text-sm text-yellow-600 mt-2">{t('Additional COD fee may apply.')}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('Payment')}</h1>
        <p className="text-gray-600">{t('Complete your purchase')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-1 order-2 md:order-1">
          <Card>
            <CardHeader>
              <CardTitle>{t('Order Summary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-gray-500">{t('Subtotal')}</p>
                    <p>$149.97</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">{t('Shipping')}</p>
                    <p>$9.99</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">{t('Tax')}</p>
                    <p>$15.00</p>
                  </div>
                </div>
                
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold">
                    <p>{t('Total')}</p>
                    <p>$174.96</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Method */}
        <div className="md:col-span-2 order-1 md:order-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('Payment Method')}</CardTitle>
              <CardDescription>{t('Select your preferred payment option')}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                value={paymentMethod} 
                onValueChange={(value) => setPaymentMethod(value as any)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <RadioGroupItem value="credit-card" id="credit-card" className="border-leaf-600" />
                  <FormLabel htmlFor="credit-card" className="flex-grow cursor-pointer flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-leaf-600" />
                    {t('Credit/Debit Card')}
                  </FormLabel>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <RadioGroupItem value="e-wallet" id="e-wallet" className="border-leaf-600" />
                  <FormLabel htmlFor="e-wallet" className="flex-grow cursor-pointer flex items-center">
                    <Wallet className="h-5 w-5 mr-2 text-leaf-600" />
                    {t('E-Wallet')}
                  </FormLabel>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" className="border-leaf-600" />
                  <FormLabel htmlFor="bank-transfer" className="flex-grow cursor-pointer flex items-center">
                    <svg className="h-5 w-5 mr-2 text-leaf-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path>
                    </svg>
                    {t('Bank Transfer')}
                  </FormLabel>
                </div>
                
                <div className="flex items-center space-x-2 border rounded-md p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <RadioGroupItem value="cod" id="cod" className="border-leaf-600" />
                  <FormLabel htmlFor="cod" className="flex-grow cursor-pointer flex items-center">
                    <Truck className="h-5 w-5 mr-2 text-leaf-600" />
                    {t('Cash on Delivery')} (COD)
                  </FormLabel>
                </div>
              </RadioGroup>

              <div className="mt-6 border-t pt-6">
                {renderPaymentForm()}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-leaf-600 hover:bg-leaf-700"
                onClick={handlePayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('Processing...')}
                  </>
                ) : (
                  t('Complete Payment')
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Payment Confirmation Dialog */}
      <Dialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {paymentStatus === 'processing' && t('Processing Payment')}
              {paymentStatus === 'success' && t('Payment Confirmed')}
              {paymentStatus === 'failed' && t('Payment Failed')}
            </DialogTitle>
            <DialogDescription>
              {paymentStatus === 'processing' && t('Please wait while we process your payment.')}
              {paymentStatus === 'success' && t('Your payment has been successfully processed.')}
              {paymentStatus === 'failed' && t('There was a problem processing your payment.')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center py-6">
            {paymentStatus === 'processing' && (
              <div className="text-center">
                <Loader2 className="h-16 w-16 animate-spin mx-auto text-leaf-600" />
                <p className="mt-4 text-gray-600">{t('This may take a few moments...')}</p>
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-green-100 mx-auto flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <p className="mt-4 text-gray-600">{t('Thank you for your purchase!')}</p>
              </div>
            )}
            
            {paymentStatus === 'failed' && (
              <div className="text-center">
                <div className="h-16 w-16 rounded-full bg-red-100 mx-auto flex items-center justify-center">
                  <AlertCircle className="h-10 w-10 text-red-600" />
                </div>
                <p className="mt-4 text-gray-600">{t('Please check your payment details and try again.')}</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-center">
            {paymentStatus === 'processing' ? (
              <Button 
                variant="outline" 
                disabled
              >
                {t('Please wait...')}
              </Button>
            ) : paymentStatus === 'success' ? (
              <Button 
                onClick={handleCloseDialog}
                className="bg-leaf-600 hover:bg-leaf-700"
              >
                {t('View Orders')}
              </Button>
            ) : (
              <Button 
                onClick={handleCloseDialog}
                className="bg-leaf-600 hover:bg-leaf-700"
              >
                {t('Try Again')}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payment;
