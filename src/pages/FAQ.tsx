
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown } from 'lucide-react';

// FAQ categories and questions
const faqData = [
  {
    category: "Products & Usage",
    questions: [
      {
        question: "What is hydroponics?",
        answer: "Hydroponics is a method of growing plants without soil, using mineral nutrient solutions in a water solvent. Plants can grow with their roots in the mineral solution only, or in an inert medium, such as perlite or gravel, with the nutrient solution flowing through it."
      },
      {
        question: "Which hydroponic system is best for beginners?",
        answer: "For beginners, we recommend our Mini Hydroponic Herb Garden or the NFT Hydroponic Starter Kit. These systems are easy to set up, require minimal maintenance, and provide excellent results for first-time hydroponic gardeners."
      },
      {
        question: "How often should I change the water in my hydroponic system?",
        answer: "For most systems, we recommend changing the nutrient solution every 1-2 weeks. However, this can vary depending on the system size, plant type, and growth stage. Always monitor pH levels and adjust accordingly."
      },
      {
        question: "What plants grow best in hydroponics?",
        answer: "Leafy greens (lettuce, spinach, kale), herbs (basil, mint, cilantro), and small fruiting plants (strawberries, cherry tomatoes) tend to grow extremely well in hydroponic systems. We offer specialized seed kits optimized for hydroponic growing."
      },
      {
        question: "How do I use the AR Preview feature?",
        answer: "Our AR Preview feature allows you to visualize our hydroponic systems in your own space. Simply navigate to the AR Preview page, enable camera access on your device, and follow the on-screen instructions to place and view the 3D model in your environment."
      }
    ]
  },
  {
    category: "Ordering & Shipping",
    questions: [
      {
        question: "How long will it take to receive my order?",
        answer: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping options (1-2 business days) are available at checkout for an additional fee. International shipping times vary by location, generally 7-14 business days."
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most international locations. International shipping rates and delivery times are calculated at checkout based on your location and order size. Please note that additional customs fees may apply depending on your country's import regulations."
      },
      {
        question: "Can I track my order?",
        answer: "Yes, once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account on our website and visiting the order history section."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and Apple Pay. All payments are securely processed and encrypted."
      },
      {
        question: "Can I modify or cancel my order after it's placed?",
        answer: "Orders can be modified or canceled within 2 hours of placement. Please contact our customer service immediately if you need to make changes. Once an order has entered the fulfillment process, we cannot guarantee changes can be made."
      }
    ]
  },
  {
    category: "Returns & Refunds",
    questions: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most unused and unopened items in their original packaging. Certain products like plant seeds and nutrient solutions cannot be returned once opened due to quality control reasons."
      },
      {
        question: "How do I initiate a return?",
        answer: "To initiate a return, log into your account, go to order history, and select the 'Return Item' option next to the product you wish to return. Follow the prompts to generate a return shipping label and instructions. Alternatively, contact our customer service team for assistance."
      },
      {
        question: "How long does it take to process a refund?",
        answer: "Once we receive your returned item, it typically takes 3-5 business days to inspect the product and process your refund. The funds may take an additional 3-7 business days to appear in your account, depending on your payment method and financial institution."
      },
      {
        question: "Do I have to pay for return shipping?",
        answer: "For returns due to product defects or shipping errors, we cover the return shipping costs. For returns due to customer preference, a return shipping fee or restocking fee may apply, as detailed in our full returns policy."
      },
      {
        question: "What if my product arrives damaged?",
        answer: "If your product arrives damaged, please take photos of the damage and contact our customer service within 48 hours of delivery. We'll arrange for a replacement or refund and provide instructions for returning the damaged item if necessary."
      }
    ]
  },
  {
    category: "Maintenance & Troubleshooting",
    questions: [
      {
        question: "How do I clean my hydroponic system?",
        answer: "Between growing cycles, thoroughly clean all components with a mild vinegar solution or hydrogen peroxide dilution (3%) to prevent algae and bacteria buildup. Rinse thoroughly before starting a new cycle. For detailed cleaning instructions specific to your system, refer to the product manual or our maintenance guides."
      },
      {
        question: "My plants aren't growing well. What could be wrong?",
        answer: "Poor growth can result from several factors: incorrect pH levels (ideal range is 5.5-6.5), nutrient imbalance, inadequate lighting, improper temperature (65-75°F is ideal), or pest issues. Our blog contains troubleshooting guides, or contact our support team for personalized assistance."
      },
      {
        question: "How do I prevent algae in my system?",
        answer: "To prevent algae growth: keep light away from the nutrient solution by using opaque containers, maintain proper water temperature, regularly change the nutrient solution, and clean the system between growing cycles. Adding beneficial bacteria can also help compete with algae for nutrients."
      },
      {
        question: "What's the ideal temperature for my hydroponic garden?",
        answer: "Most plants thrive when the ambient temperature is between 65-75°F (18-24°C) and nutrient solution temperature is between 65-68°F (18-20°C). Protect your system from extreme temperature fluctuations for optimal growth."
      },
      {
        question: "How often should I test pH and nutrient levels?",
        answer: "For most systems, we recommend testing pH and EC/TDS levels every 2-3 days. Adjust as needed to maintain optimal ranges: pH between 5.5-6.5 for most plants and EC/TDS according to your specific plants' needs and growth stage."
      }
    ]
  }
];

const FAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(faqData[0].category);

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
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-center mb-12">
            Find answers to common questions about our products, services, and hydroponic gardening.
          </p>
          
          {/* Category selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {faqData.map((category) => (
              <button
                key={category.category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category.category
                    ? "bg-leaf-600 text-white shadow-md" 
                    : "bg-gray-100 text-leaf-800 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category.category)}
              >
                {category.category}
              </button>
            ))}
          </div>
          
          {/* FAQ accordions */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <Accordion type="single" collapsible className="w-full">
              {faqData
                .find((category) => category.category === activeCategory)
                ?.questions.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-leaf-800 font-medium text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </div>
          
          {/* Contact section */}
          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold text-leaf-800 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help with any additional questions you might have.
            </p>
            <a 
              href="/contact" 
              className="btn-primary inline-flex items-center justify-center"
            >
              Contact Us
              <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default FAQ;
