// Shop data structure for ChaosBro merchandise - Updated for new collections

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  available: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  priceNumber: number;
  image: string;
  alternateImages?: string[];
  status: 'coming-soon' | 'available' | 'sold-out' | 'pre-order';
  description: string;
  category: 'apparel' | 'accessories' | 'collectibles';
  collection: 'legacy' | 'blackops' | 'dfw-drops' | 'limited';
  features?: string[];
  sizes?: string[];
  colors?: string[];
  variants?: ProductVariant[];
  specifications?: { [key: string]: string };
}

// Utility function to format currency
export const formatPrice = (amount: number): string => {
  return `$ ${amount.toLocaleString()}`;
};

export const SHOP_DATA: Product[] = [
  // Legacy Series - Retro pixel-art designs with 80s/90s console references
  {
    id: 'press-start-bomber',
    name: '"Press Start" Bomber Jacket',
    price: '$ 85',
    priceNumber: 85,
    image: '/assets/shop/hoodie.png', // Placeholder
    status: 'coming-soon',
    description: 'Retro-inspired bomber jacket with embroidered CB icon and pixel-art arcade aesthetics.',
    category: 'apparel',
    collection: 'legacy',
    features: [
      'Embroidered CB icon',
      'Retro pixel-art design',
      '80s/90s console references',
      'Premium bomber construction'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Arcade Blue', 'Retro Red']
  },
  {
    id: 'vintage-crt-tee',
    name: 'Vintage CRT Tee - "Insert Coin / Get Kills"',
    price: '$ 25',
    priceNumber: 25,
    image: '/assets/shop/hoodie.png', // Placeholder
    status: 'available',
    description: 'Classic arcade-inspired tee with CRT monitor design and gaming nostalgia.',
    category: 'apparel',
    collection: 'legacy',
    features: [
      'CRT monitor graphic',
      'Arcade token aesthetic',
      'Soft cotton blend',
      'Vintage wash finish'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  
  // BlackOps Line - Tactical black-on-black designs with elite operator flair
  {
    id: 'chaosmask-gaiter',
    name: 'ChaosMask Gaiter',
    price: '$ 18',
    priceNumber: 18,
    image: '/assets/shop/mousepad.png', // Placeholder
    status: 'available',
    description: 'Stealth black gaiter with red glitch lines. John Wick inspired tactical design.',
    category: 'accessories',
    collection: 'blackops',
    features: [
      'Stealth black design',
      'Red glitch line accents',
      'Tactical operator style',
      'Breathable fabric'
    ],
    colors: ['Stealth Black']
  },
  {
    id: 'tactical-backpack',
    name: 'ChaosBros Tactical Backpack',
    price: '$ 120',
    priceNumber: 120,
    image: '/assets/shop/mousepad.png', // Placeholder
    status: 'pre-order',
    description: 'John Wick inspired urban combat design. Elite operator tactical backpack.',
    category: 'accessories',
    collection: 'blackops',
    features: [
      'Urban combat design',
      'Multiple tactical pockets',
      'John Wick inspired',
      'Durable construction',
      'Laptop compartment'
    ],
    colors: ['Tactical Black']
  },
  
  // DFW Drops - Limited runs inspired by Texas roots
  {
    id: 'cb-elite-snapback',
    name: 'CB Elite Snapback',
    price: '$ 32',
    priceNumber: 32,
    image: '/assets/shop/stickerpack.png', // Placeholder
    status: 'available',
    description: 'Texas-inspired snapback with streetwear edge and ChaosBros branding.',
    category: 'accessories',
    collection: 'dfw-drops',
    features: [
      'Texas-inspired design',
      'Streetwear edge',
      'Adjustable snapback',
      'Premium materials'
    ],
    colors: ['Black/Red', 'Black/Blue', 'Texas Flag']
  },
  
  // Collectibles
  {
    id: 'chaoscoins',
    name: 'ChaosCoins Collector Set',
    price: '$ 15',
    priceNumber: 15,
    image: '/assets/shop/stickerpack.png', // Placeholder
    status: 'available',
    description: 'Metallic collector coins with arcade token aesthetic. Limited edition collectible.',
    category: 'collectibles',
    collection: 'limited',
    features: [
      'Metallic construction',
      'Arcade token design',
      'Limited edition',
      'Collectible packaging',
      'Set of 3 coins'
    ]
  },
  
  // Updated existing products
  {
    id: 'hoodie',
    name: 'ChaosBro Hoodie',
    price: '$ 45',
    priceNumber: 45,
    image: '/assets/shop/hoodie.png',
    alternateImages: [
      '/assets/shop/hoodie-front.png',
      '/assets/shop/hoodie-back.png',
      '/assets/shop/hoodie-side.png'
    ],
    status: 'available',
    description: 'Premium quality hoodie with embroidered ChaosBros logo. Perfect for representing your favorite esports team.',
    category: 'apparel',
    collection: 'blackops',
    features: [
      'Premium cotton blend',
      'Embroidered team logo',
      'Comfortable fit',
      'Durable construction'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Matte Black', 'Gunmetal', 'Dark Gray']
  },
  {
    id: 'mousepad',
    name: 'XL Gaming Mousepad',
    price: '$ 15',
    priceNumber: 15,
    image: '/assets/shop/mousepad.png',
    alternateImages: [
      '/assets/shop/mousepad-top.png',
      '/assets/shop/mousepad-detail.png'
    ],
    status: 'available',
    description: 'Extended gaming mousepad featuring ChaosBros branding. Optimized for precision gaming.',
    category: 'accessories',
    collection: 'blackops',
    features: [
      'Extended XL size',
      'Non-slip rubber base',
      'Smooth surface texture',
      'Stitched edges'
    ],
    colors: ['Black/Red', 'Black/Blue', 'Matte Black']
  }
];

// Collection descriptions
export const COLLECTIONS = {
  legacy: {
    name: 'Legacy Series',
    description: 'Retro pixel-art designs with 80s/90s console references – ChaosBros x Arcade style'
  },
  blackops: {
    name: 'BlackOps Line',
    description: 'Tactical black-on-black designs with elite operator flair, like Wick\'s gear.'
  },
  'dfw-drops': {
    name: 'DFW Drops',
    description: 'Limited runs inspired by Texas roots, streetwear edge.'
  },
  limited: {
    name: 'Limited Edition',
    description: 'Exclusive collectibles and special releases.'
  }
};

// Utility functions
export const getProductById = (id: string): Product | undefined => {
  return SHOP_DATA.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return SHOP_DATA.filter(product => product.category === category);
};

export const getProductsByStatus = (status: string): Product[] => {
  return SHOP_DATA.filter(product => product.status === status);
};

export const getAllProductNames = (): string[] => {
  return SHOP_DATA.map(product => product.name);
}; 