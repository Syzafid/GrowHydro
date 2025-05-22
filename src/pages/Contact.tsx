
import React from 'react';
import { useForm } from "react-hook-form";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: any) => {
    toast.success(t("Message sent successfully! We'll get back to you soon."));
    form.reset();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative">
          <div className="h-64 md:h-80 w-full overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1440" 
              alt={t("Contact Us")} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-leaf-800/70 to-blue-800/60 flex items-center">
              <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl text-white font-display font-bold">{t('Contact Us')}</h1>
                <p className="text-white/90 mt-2 max-w-lg text-lg">
                  {t('Have questions about hydroponics? We\'re here to help you grow.')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-white to-leaf-50 p-6 md:p-8 rounded-xl shadow-md transform transition-all duration-500 hover:shadow-xl">
              <h2 className="text-2xl font-display font-semibold mb-6 text-gradient">{t('Get In Touch')}</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('Name')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('Your name')} {...field} className="bg-white/80" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('Email')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={t('Your email')} {...field} className="bg-white/80" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('Subject')}</FormLabel>
                        <FormControl>
                          <Input placeholder={t('What\'s this about?')} {...field} className="bg-white/80" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('Message')}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t('Tell us how we can help you...')} 
                            className="min-h-32 bg-white/80"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" variant="gradient" className="w-full">
                    {t('Send Message')}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-display font-semibold mb-4">{t('Our Team')}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-leaf-200 mb-3">
                      <img 
                        src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&q=80&w=300" 
                        alt="Team member" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-leaf-800">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600">{t('Customer Support')}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-leaf-200 mb-3">
                      <img 
                        src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&q=80&w=300" 
                        alt="Team member" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-leaf-800">Michael Chen</h4>
                    <p className="text-sm text-gray-600">{t('Hydroponic Expert')}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  {t('Our dedicated team is available to answer any questions about hydroponics, product selection, or technical support.')}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-white to-cream-100 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-display font-semibold mb-4">{t('Contact Information')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="text-leaf-600 mr-3 mt-1" size={20} />
                    <div>
                      <p className="font-medium">{t('Email Us')}</p>
                      <a href="mailto:support@hydroharvest.com" className="text-blue-600 hover:underline">
                        support@hydroharvest.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-leaf-600 mr-3 mt-1" size={20} />
                    <div>
                      <p className="font-medium">{t('Call Us')}</p>
                      <a href="tel:+18005551234" className="text-blue-600 hover:underline">
                        1-800-555-1234
                      </a>
                      <p className="text-sm text-gray-600">{t('Mon-Fri: 9AM - 5PM EST')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="text-leaf-600 mr-3 mt-1" size={20} />
                    <div>
                      <p className="font-medium">{t('Visit Our Store')}</p>
                      <p>123 Garden Lane, Green City, GC 12345</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-white to-leaf-50 p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-display font-semibold mb-4">{t('Connect With Us')}</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-300">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-3 rounded-full transition-colors duration-300">
                    <Instagram size={20} />
                  </a>
                  <a href="#" className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors duration-300">
                    <Twitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-12 rounded-xl overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.9503398796587!2d-73.9651!3d40.7834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f63e96d30dc9%3A0x4b5ab99151580078!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1652813333521!5m2!1sen!2sus" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title={t('Store Location')}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
