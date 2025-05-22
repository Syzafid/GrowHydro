
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Bookmark, ShieldCheck, Lock, Eye, Scale } from 'lucide-react';

const TermsConditions: React.FC = () => {
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
            Terms & Conditions
          </h1>
          <p className="text-gray-600 text-center mb-4">
            Last Updated: May 1, 2025
          </p>
          <p className="text-gray-600 text-center mb-12">
            Please read these terms and conditions carefully before using our website or services.
          </p>
          
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100 mb-12">
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Bookmark className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">1. Introduction</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-600 mb-4">
                  These Terms and Conditions ("Terms") govern your use of the GrowSpace website (the "Site") and any related services provided by GrowSpace, Inc. ("GrowSpace", "we", "us", or "our").
                </p>
                <p className="text-gray-600 mb-4">
                  By accessing or using our Site, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Site.
                </p>
                <p className="text-gray-600">
                  We reserve the right to change or modify these Terms at any time. Any changes will be effective immediately upon posting on the Site. Your continued use of the Site following the posting of revised Terms constitutes your acceptance of such changes.
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">2. Use of Our Site</h2>
              </div>
              <div className="ml-9">
                <h3 className="font-semibold text-leaf-700 mb-2">2.1 Eligibility</h3>
                <p className="text-gray-600 mb-4">
                  You must be at least 18 years of age to use our Site and services. By using our Site, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
                </p>
                
                <h3 className="font-semibold text-leaf-700 mb-2">2.2 Account Creation</h3>
                <p className="text-gray-600 mb-4">
                  To use certain features of the Site, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p className="text-gray-600 mb-4">
                  You are responsible for safeguarding your password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
                
                <h3 className="font-semibold text-leaf-700 mb-2">2.3 Prohibited Activities</h3>
                <p className="text-gray-600 mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li>Use the Site in any manner that could disable, overburden, damage, or impair the Site</li>
                  <li>Use any robot, spider, or other automatic device to access the Site</li>
                  <li>Introduce any viruses, trojan horses, worms, or other harmful material</li>
                  <li>Attempt to gain unauthorized access to any part of the Site</li>
                  <li>Interfere with the proper working of the Site</li>
                  <li>Use the Site for any illegal or unauthorized purpose</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Lock className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">3. Products & Purchases</h2>
              </div>
              <div className="ml-9">
                <h3 className="font-semibold text-leaf-700 mb-2">3.1 Product Information</h3>
                <p className="text-gray-600 mb-4">
                  We strive to provide accurate product descriptions, images, and pricing information. However, we do not warrant that product descriptions or other content on the Site is accurate, complete, reliable, current, or error-free.
                </p>
                
                <h3 className="font-semibold text-leaf-700 mb-2">3.2 Pricing and Availability</h3>
                <p className="text-gray-600 mb-4">
                  All prices are shown in US dollars and are subject to change without notice. We reserve the right to modify or discontinue any product without notice. We are not liable to you or any third party for any modification, price change, suspension, or discontinuance of any product.
                </p>
                
                <h3 className="font-semibold text-leaf-700 mb-2">3.3 Orders</h3>
                <p className="text-gray-600 mb-4">
                  Your submission of an order constitutes an offer to purchase. Orders are subject to our acceptance, and we reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or problems identified by our fraud and verification team.
                </p>
                
                <h3 className="font-semibold text-leaf-700 mb-2">3.4 Payment</h3>
                <p className="text-gray-600 mb-4">
                  We accept various payment methods as indicated during checkout. You represent and warrant that you have the legal right to use any payment method(s) you provide in connection with your purchase.
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Eye className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">4. Intellectual Property</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-600 mb-4">
                  The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by GrowSpace, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                
                <p className="text-gray-600 mb-4">
                  These Terms permit you to use the Site for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Site, except as follows:
                </p>
                
                <ul className="list-disc pl-5 text-gray-600 mb-4 space-y-2">
                  <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
                  <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
                  <li>You may print or download one copy of a reasonable number of pages of the Site for your own personal, non-commercial use and not for further reproduction, publication, or distribution</li>
                </ul>
                
                <p className="text-gray-600">
                  You must not modify copies of any materials from the Site, use any illustrations, photographs, video or audio sequences, or any graphics separately from the accompanying text, or delete or alter any copyright, trademark, or other proprietary notices from copies of materials from the Site.
                </p>
              </div>
            </div>
            
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Scale className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">5. Disclaimer & Limitation of Liability</h2>
              </div>
              <div className="ml-9">
                <h3 className="font-semibold text-leaf-700 mb-2">5.1 Disclaimer of Warranties</h3>
                <p className="text-gray-600 mb-4 uppercase text-sm">
                  THE SITE AND ALL CONTENT, MATERIALS, INFORMATION, SERVICES, AND PRODUCTS INCLUDED ON OR OTHERWISE MADE AVAILABLE TO YOU THROUGH THE SITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                </p>
                
                <h3 className="font-semibold text-leaf-700 mb-2">5.2 Limitation of Liability</h3>
                <p className="text-gray-600 mb-4 uppercase text-sm">
                  TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL GROWSPACE, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
                </p>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-4">
                <Scale className="h-6 w-6 text-leaf-600 mr-3" />
                <h2 className="text-2xl font-semibold text-leaf-800">6. Governing Law & Dispute Resolution</h2>
              </div>
              <div className="ml-9">
                <p className="text-gray-600 mb-4">
                  These Terms and your use of the Site shall be governed by and construed in accordance with the laws of the State of California, without giving effect to any principles of conflicts of law.
                </p>
                <p className="text-gray-600 mb-4">
                  Any legal action or proceeding relating to your access to or use of the Site or these Terms shall be instituted exclusively in the federal or state courts located in San Francisco County, California. You agree to submit to the jurisdiction of such courts and waive any objection based on venue or inconvenient forum.
                </p>
                <p className="text-gray-600">
                  Any cause of action you may have with respect to your use of the Site must be commenced within one (1) year after the cause of action accrues, otherwise such cause of action is permanently barred.
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact section */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-leaf-800 mb-4">
              Questions About Our Terms?
            </h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms & Conditions, please contact our legal team.
            </p>
            <a 
              href="/contact" 
              className="btn-primary inline-flex items-center justify-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default TermsConditions;
