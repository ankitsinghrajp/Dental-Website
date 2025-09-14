
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description: string;
  tags: string[];
}

export const categories = [
  "Forceps",
  "Mirrors",
  "Scalers",
  "Probes",
  "Syringes",
  "Elevators",
  "Pliers",
  "Handpieces",
  "Burs",
  "Files"
];

export const popularTags = [
  "Stainless Steel",
  "Autoclavable",
  "Premium Quality",
  "German Steel",
  "Titanium",
  "Disposable",
  "Reusable",
  "Sharp Edge",
  "Ergonomic",
  "Professional"
];

// Generate 400 dental products
export const products: Product[] = Array.from({ length: 400 }, (_, index) => {
  const productTypes = [
    "Dental Forceps",
    "Dental Mirror",
    "Scaler",
    "Periodontal Probe",
    "Dental Syringe",
    "Tooth Elevator",
    "Orthodontic Pliers",
    "Dental Handpiece",
    "Dental Bur",
    "Endodontic File",
    "Dental Curette",
    "Mouth Gag",
    "Dental Spatula",
    "Impression Tray",
    "Dental Scissors"
  ];

  const productType = productTypes[index % productTypes.length];
  const category = categories[Math.floor(index / 40)];
  const productNumber = String(index + 1).padStart(3, '0');
  
  return {
    id: `product-${index + 1}`,
    name: `${productType} Pro-${productNumber}`,
    price: Math.floor(Math.random() * 500) + 100, // ₹100 to ₹600
    category,
    images: [
      `https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop&crop=center`,
      `https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=400&fit=crop&crop=center`,
      `https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=center`
    ],
    description: `Professional grade ${productType.toLowerCase()} made from premium stainless steel. Perfect for dental procedures requiring precision and reliability.`,
    tags: popularTags.slice(0, Math.floor(Math.random() * 5) + 3)
  };
});

// Popular products (first 6)
export const popularProducts = products.slice(0, 6);