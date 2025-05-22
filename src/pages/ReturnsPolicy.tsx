
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RefreshCw, AlertCircle, CheckCircle, Clock, HelpCircle } from 'lucide-react';

const ReturnsPolicy: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-leaf-800 mb-2 text-center">
            Returns & Refunds Policy
          </h1>
          <p className="text-gray-600 text-center mb-12">
            We want you to be completely satisfied with your purchase. Here's everything you need to know about our returns process.
          </p>
          
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-12">
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <RefreshCw className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">Return Policy Overview</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-600 mb-4">
                  We offer a 30-day return policy for most items. To be eligible for a return, your item must be:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
                  <li>Returned within 30 days of delivery</li>
                  <li>In the same condition that you received it</li>
                  <li>In the original packaging or adequately protected for return shipping</li>
                  <li>Accompanied by the receipt or proof of purchase</li>
                </ul>
                
                <h3 className="font-semibold text-leaf-700 mb-2">Non-Returnable Items</h3>
                <p className="text-gray-600 mb-2">
                  Several types of products cannot be returned due to health and safety regulations:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
                  <li>Plant seeds once the package has been opened</li>
                  <li>Nutrient solutions and fertilizers that have been opened</li>
                  <li>Growing media (clay pellets, rockwool, etc.) once opened</li>
                  <li>Personalized or custom-made products</li>
                  <li>Downloadable software or digital products</li>
                  <li>Gift cards</li>
                </ul>
                
                <div className="bg-leaf-50 border-l-4 border-leaf-600 p-4 rounded mb-6">
                  <p className="text-leaf-800 italic">
                    Please note: If you're returning due to a defect, damage, or error on our part, the non-returnable restrictions don't apply. Contact us for assistance with these situations.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">Condition Requirements</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-600 mb-4">
                  To ensure your return is accepted, please make sure:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>All parts, accessories, and documentation are included</li>
                  <li>Electronic products have not been registered or activated (where applicable)</li>
                  <li>Items are clean and free from signs of extended use</li>
                  <li>Products with hygiene seals are still sealed</li>
                  <li>Any assembly has been done according to instructions and can be reversed without damage</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">Return Process</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-600 mb-4">
                  To start your return process:
                </p>
                <ol className="list-decimal pl-5 text-gray-600 space-y-4">
                  <li>
                    <span className="font-medium">Initiate the return:</span> Log into your account, go to the order history, and select "Return Item" next to the product you wish to return. Alternatively, email our customer service team at returns@growspace.com with your order number.
                  </li>
                  <li>
                    <span className="font-medium">Receive return authorization:</span> Wait for our confirmation email with return instructions and a shipping label (if applicable).
                  </li>
                  <li>
                    <span className="font-medium">Package your return:</span> Securely pack the item in appropriate packaging, including all original parts and accessories. Include the return form or order number inside the package.
                  </li>
                  <li>
                    <span className="font-medium">Ship the return:</span> Use the provided shipping label or ship the package to the address provided in the return instructions. We recommend using a tracked shipping method.
                  </li>
                  <li>
                    <span className="font-medium">Refund processing:</span> Once we receive and inspect the return, we'll notify you about the approval status of your refund. If approved, your refund will be processed according to the timeframes below.
                  </li>
                </ol>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">Refunds & Timeframes</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-600 mb-4">
                  Once your return is received and inspected, we'll process your refund according to the following timeline:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
                  <li><span className="font-medium">Inspection period:</span> 3-5 business days after receipt</li>
                  <li><span className="font-medium">Refund processing:</span> 1-2 business days after inspection approval</li>
                  <li><span className="font-medium">Credit card refunds:</span> 5-10 business days to appear on your statement (varies by financial institution)</li>
                  <li><span className="font-medium">Other payment methods:</span> 3-7 business days for PayPal, store credit is immediate after approval</li>
                </ul>
                <p className="text-gray-600 mb-4">
                  Refunds will be issued to the original form of payment used for the purchase. If the original payment method is unavailable, we will contact you to arrange an alternative refund method.
                </p>
                <div className="bg-leaf-50 border-l-4 border-leaf-600 p-4 rounded">
                  <p className="text-leaf-800">
                    <span className="font-medium">Refund Deductions:</span> For standard returns (non-defective), original shipping charges are non-refundable. A restocking fee of 15% may apply to opened boxes or assembled products that require extensive inspection.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <HelpCircle className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">Special Circumstances</h2>
              </div>
              <div className="ml-9">
                <h3 className="font-semibold text-leaf-700 mb-2">Defective Products</h3>
                <p className="text-gray-600 mb-4">
                  If you receive a defective product:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-6 space-y-2">
                  <li>Contact us within 48 hours of delivery with photos of the defect</li>
                  <li>We'll either issue a replacement or provide a full refund including original shipping charges</li>
                  <li>Return shipping for defective items will be covered by GrowSpace</li>
                </ul>
                
                <h3 className="font-semibold text-leaf-700 mb-2">Exchanges</h3>
                <p className="text-gray-600 mb-4">
                  We currently do not process direct exchanges. If you need a different size, color, or model, please return the original item for a refund and place a new order for the desired item.
                </p>
                
                <h3 className="font-semibold text-leaf-700 mb-2">Late or Missing Refunds</h3>
                <p className="text-gray-600">
                  If you haven't received your refund within the timeframes listed above, please check your bank account again, then contact your credit card company as it may take some time for the refund to be officially posted. Next, contact your bank. There is often some processing time before a refund is posted. If you've done all of this and still have not received your refund, please contact our customer service team.
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact section */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-leaf-800 mb-4">
              Need help with a return?
            </h2>
            <p className="text-gray-600 mb-6">
              Our customer service team is here to assist you with any questions or concerns about returns or refunds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/contact" 
                className="btn-primary inline-flex items-center justify-center"
              >
                Contact Us
              </a>
              <a 
                href="/faq" 
                className="btn-outline inline-flex items-center justify-center"
              >
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default ReturnsPolicy;
