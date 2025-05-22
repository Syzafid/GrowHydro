export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  images: string[];
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  arEnabled: boolean;
  bestseller: boolean;
  new: boolean;
  stock: number;
  category: string;
}

const products: Product[] = [
  {
    id: "hydro-tower-deluxe",
    name: "Hydroponic Tower Garden Deluxe",
    price: 299.99,
    salePrice: 249.99,
    images: [
      "https://s.alicdn.com/@sc04/kf/Hebba343802c5420f92bf90db7b627f74F.jpg",
      "https://m.media-amazon.com/images/I/71mUqp-mB7L.jpg",
      "https://m.media-amazon.com/images/I/61KV894EiiL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81i1bTf8chL._AC_UF894,1000_QL80_.jpg"
    ],
    description: "Our premium vertical hydroponic tower allows you to grow up to 20 plants in a compact space. Perfect for herbs, lettuce, and small vegetables. Includes automated irrigation system and nutrient dispenser.",
    features: [
      "Grows up to 20 plants simultaneously",
      "Automated irrigation system",
      "LED grow lights included",
      "Smart nutrient dispenser",
      "Compact design for small spaces"
    ],
    rating: 4.8,
    reviewCount: 124,
    arEnabled: true,
    bestseller: true,
    new: false,
    stock: 15,
    category: "Equipment"
  },
  {
    id: "nft-starter-kit",
    name: "NFT Hydroponic Starter Kit",
    price: 199.99,
    images: [
      "https://m.media-amazon.com/images/I/81O4E4c5bGL._AC_UF894,1000_QL80_.jpg",
      "https://www.progrow.co.uk/wp-content/uploads/2018/07/04889c_large.jpg",
      "https://www.citygreens.shop/product-images/NPK+Kit+OD+3+Ch+3.jpg/1719591000084261141/1100x1100",
      "https://growshop.co.nz/cdn/shop/products/331811_large.jpg?v=1662010521"
    ],
    description: "Start your hydroponic journey with this complete Nutrient Film Technique system. Ideal for beginners interested in growing leafy greens and herbs indoors.",
    features: [
      "6 plant sites with expandable options",
      "Complete nutrient starter kit",
      "Energy-efficient water pump",
      "Detailed setup guide and growing tips",
      "Compact design for countertops"
    ],
    rating: 4.5,
    reviewCount: 86,
    arEnabled: true,
    bestseller: false,
    new: true,
    stock: 22,
    category: "Starter Kits"
  },
  {
    id: "premium-nutrient-kit",
    name: "Premium Hydroponic Nutrient Kit",
    price: 49.99,
    images: [
      "https://m.media-amazon.com/images/I/710Vr4GPK5L.jpg",
      "https://images-cdn.ubuy.co.id/6364cb9314e67604ba7429d4-masterblend-4-18-38-hydroponic.jpg",
      "https://www.drgreenthumbs.com.au/cdn/shop/files/hydroponic-supplies-hydroponic-nutrients-starter-kits-plant-mechanics-copy-of-professors-organic-flower-boost-1l-5l-certified-organic-33265108091077.jpg?v=1694996081",
      "https://www.londongrow.com/cdn/shop/files/nutrient_kit_1l.png?v=1714131103&width=2048"
    ],
    description: "Complete nutrient solution for all stages of plant growth. Our balanced formula provides essential macro and micronutrients for optimal hydroponic growing results.",
    features: [
      "Complete NPK balance",
      "Essential micronutrients included",
      "pH balanced formula",
      "Makes up to 100 gallons of solution",
      "Suitable for all hydroponic systems"
    ],
    rating: 4.7,
    reviewCount: 203,
    arEnabled: false,
    bestseller: true,
    new: false,
    stock: 48,
    category: "Nutrients Supplements"
  },
  {
    id: "led-grow-panel",
    name: "Full Spectrum LED Grow Panel",
    price: 129.99,
    salePrice: 99.99,
    images: [
      "https://down-id.img.susercontent.com/file/2079df753932d78795fe3ec1097512a9",
      "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/4/22/9e9cdf54-82d2-4c1d-b3b6-5f3a896e231a.jpg",
      "https://image.made-in-china.com/2f0j00LHPYSODIEbkw/Red-Blue-Ratio-Full-Spectrum-50W-75W-80W-100W-150W-300W-400W-450W-500W-600W-650W-700W-800W-900W-1000W-1200W-1500W-LED-Grow-Panel-Light-for-Indoor-Plants.webp",
      "https://down-id.img.susercontent.com/file/sg-11134201-7rbly-llof4z5qd0msa2"
    ],
    description: "Energy-efficient LED panel providing full-spectrum light for all stages of plant growth. Adjustable height and intensity make it perfect for any indoor garden.",
    features: [
      "Full spectrum light simulation",
      "Energy efficient LED technology",
      "Adjustable hanging height",
      "Timer and intensity controls",
      "Coverage for up to 4x4 ft growing area"
    ],
    rating: 4.6,
    reviewCount: 159,
    arEnabled: true,
    bestseller: false,
    new: false,
    stock: 7,
    category: "Equipment"
  },
  {
    id: "hydroponic-dwc-bubbler",
    name: "Deep Water Culture Bubbler System",
    price: 89.99,
    images: [
      "https://www.parfactworks.com/cdn/shop/files/Deep-Water-Culture-5-Gallon-4-Site-Bubble-Flow-Buckets-DWC-RDWC-Hydroponic-Growing-System-Kits_e2ed03db-af55-42f3-8bd6-0485e2b7258b_700x700.jpg?v=1711588694",
      "https://m.media-amazon.com/images/I/71odmsND5cL._AC_UF894,1000_QL80_.jpg",
      "https://www.sunplusledgrow.com/wp-content/uploads/2023/09/SunPlus-New-Deep-Water-Culture-5-Gallon-Bubble-Flow-Buckets-DWC-RDWC-Hydroponic-Growing-System-Kits-3-1024x1024.webp",
      "https://i.ebayimg.com/images/g/uo4AAOSwIyRl8l9X/s-l1200.jpg"
    ],
    description: "Simple yet effective 4-site DWC system with air pump and stones. Great for beginners and experienced hydroponic enthusiasts growing medium to large plants.",
    features: [
      "4 plant sites with 5-gallon buckets",
      "High-efficiency air pump",
      "Premium air stones for maximum oxygenation",
      "Durable BPA-free construction",
      "Easy to clean and maintain"
    ],
    rating: 4.4,
    reviewCount: 97,
    arEnabled: false,
    bestseller: false,
    new: true,
    stock: 19,
    category: "Equipment"
  },
  {
    id: "hydroton-clay-pellets",
    name: "Hydroton Clay Pellets (10L)",
    price: 24.99,
    images: [
      "https://m.media-amazon.com/images/I/61eAXC0GPqS.jpg",
      "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/12/3/3fd96ee1-50f9-4f0d-8cdc-adc05f3fc6ad.jpg",
      "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/4/9/29f86952-1504-4049-9ee5-43a55999053f.jpg",
      "https://rukminim2.flixcart.com/image/850/1000/jkfr6a80/soil-manure/m/x/k/3-5-premium-hydroton-clay-balls-clay-pellets-3-5-ltrs-maq-original-imaf7szbekxth3vg.jpeg?q=90&crop=false"
    ],
    description: "Premium expanded clay pellets for hydroponic growing. Provides excellent root support, drainage, and aeration for your plants.",
    features: [
      "Reusable and pH neutral",
      "Excellent drainage and aeration",
      "Prevents root rot",
      "Simple to clean and sterilize",
      "10L bag covers multiple growing containers"
    ],
    rating: 4.9,
    reviewCount: 215,
    arEnabled: false,
    bestseller: true,
    new: false,
    stock: 35,
    category: "Starter Kits"
  },
  {
    id: "digital-ph-meter",
    name: "Digital pH & TDS Meter Combo",
    price: 39.99,
    salePrice: 34.99,
    images: [
      "https://images-cdn.ubuy.co.id/633bcf1d962d273a7a0aab84-ph-meter-for-water-ph-meter-and-tds.jpg",
      "https://s.alicdn.com/@sc04/kf/H1a243b81dc07401e8af97ddb44799aca1.jpg_720x720q50.jpg",
      "https://m.media-amazon.com/images/I/71huZ1VWnRL.jpg",
      "https://sc04.alicdn.com/kf/H4966403d402647248e820e7b702ea50ck.jpg"
    ],
    description: "Essential tools for hydroponic growing success. This combo pack includes a digital pH meter and TDS/EC meter for monitoring your nutrient solution.",
    features: [
      "High precision pH readings (±0.01 pH)",
      "TDS/EC measurements for nutrient concentration",
      "Automatic temperature compensation",
      "Auto-calibration feature",
      "Waterproof design with protective case"
    ],
    rating: 4.5,
    reviewCount: 178,
    arEnabled: false,
    bestseller: false,
    new: false,
    stock: 23,
    category: "Equipment"
  },
  {
    id: "mini-hydroponic-herb-garden",
    name: "Mini Hydroponic Herb Garden",
    price: 59.99,
    images: [
      "https://www.jnclighting.com/upload/image/products/small-hydroponic-system.jpg",
      "https://img.kwcdn.com/product/fancy/07c31b2a-3e7e-40d8-bf3b-279eff2dcc5f.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp",
      "https://benchtopgardens.com.au/cdn/shop/products/Indoor-herb-garden_herbs-plants_1280x.png?v=1740182215",
      "https://us.auk.eco/cdn/shop/files/auk_oak_kitchen_-_vertical_-_image_section_1080x.jpg?v=1713869101"
    ],
    description: "Compact countertop hydroponic system perfect for growing fresh herbs in your kitchen. Includes everything needed to start growing right away.",
    features: [
      "3 plant site design",
      "Built-in LED grow light",
      "Silent water circulation pump",
      "Seed starter pods included",
      "Perfect for kitchens and small spaces"
    ],
    rating: 4.7,
    reviewCount: 142,
    arEnabled: true,
    bestseller: false,
    new: true,
    stock: 29,
    category: "Starter Kits"
  }
];

// Various helper functions to retrieve products
export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.bestseller || product.new).slice(0, 4);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.new);
};

export const getBestsellers = (): Product[] => {
  return products.filter(product => product.bestseller);
};

export const getRelatedProducts = (currentProductId: string, limit: number = 4): Product[] => {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return [];
  
  return products
    .filter(p => p.id !== currentProductId && p.category === currentProduct.category)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery)
  );
};
