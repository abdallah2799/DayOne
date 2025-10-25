import { Injectable, signal } from '@angular/core';
import { Product } from '../Models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private productsData: Product[] = [
  {
    id: 1,
    title: "Leather Wallet",
    description: "Elegant leather wallet with multiple compartments for cards and cash.",
    price: 25,
    discountPercentage: 5,
    rating: 4.5,
    stock: 50,
    brand: "UrbanCraft",
    category: "accessories",
    thumbnail: "https://picsum.photos/id/1011/300/200",
    images: ["https://picsum.photos/id/1011/300/200"]
  },
  {
    id: 2,
    title: "Wireless Headphones",
    description: "High-quality sound with noise cancellation and long battery life.",
    price: 89,
    discountPercentage: 10,
    rating: 4.7,
    stock: 120,
    brand: "SoundMax",
    category: "electronics",
    thumbnail: "https://picsum.photos/id/1015/300/200",
    images: ["https://picsum.photos/id/1015/300/200"]
  },
  {
    id: 3,
    title: "Organic Face Cream",
    description: "Natural ingredients for smooth and hydrated skin.",
    price: 30,
    discountPercentage: 7.5,
    rating: 4.6,
    stock: 80,
    brand: "GlowPure",
    category: "skincare",
    thumbnail: "https://picsum.photos/id/1020/300/200",
    images: ["https://picsum.photos/id/1020/300/200"]
  },
  {
    id: 4,
    title: "Smart Fitness Watch",
    description: "Track your steps, heart rate, and sleep with this waterproof smartwatch.",
    price: 120,
    discountPercentage: 12,
    rating: 4.8,
    stock: 60,
    brand: "FitTech",
    category: "electronics",
    thumbnail: "https://picsum.photos/id/1025/300/200",
    images: ["https://picsum.photos/id/1025/300/200"]
  },
  {
    id: 5,
    title: "Minimalist Backpack",
    description: "Durable backpack with laptop compartment and water-resistant fabric.",
    price: 65,
    discountPercentage: 9,
    rating: 4.4,
    stock: 70,
    brand: "PackPro",
    category: "fashion",
    thumbnail: "https://picsum.photos/id/1030/300/200",
    images: ["https://picsum.photos/id/1030/300/200"]
  },
  {
    id: 6,
    title: "Cotton T-Shirt",
    description: "Soft and breathable cotton t-shirt available in multiple colors.",
    price: 22,
    discountPercentage: 6,
    rating: 4.3,
    stock: 90,
    brand: "WearWell",
    category: "fashion",
    thumbnail: "https://picsum.photos/id/1035/300/200",
    images: ["https://picsum.photos/id/1035/300/200"]
  },
  {
    id: 7,
    title: "Herbal Shampoo",
    description: "Sulfate-free shampoo with tea tree oil and peppermint for healthy scalp.",
    price: 18,
    discountPercentage: 4,
    rating: 4.2,
    stock: 100,
    brand: "NatureCare",
    category: "skincare",
    thumbnail: "https://picsum.photos/id/1040/300/200",
    images: ["https://picsum.photos/id/1040/300/200"]
  },
  {
    id: 8,
    title: "Stylish Sunglasses",
    description: "UV-protected sunglasses with modern frame design for all-day comfort.",
    price: 45,
    discountPercentage: 8,
    rating: 4.6,
    stock: 75,
    brand: "VisionX",
    category: "accessories",
    thumbnail: "https://picsum.photos/id/1045/300/200",
    images: ["https://picsum.photos/id/1045/300/200"]
  },
  {
    id: 9,
    title: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and 10-hour battery life.",
    price: 55,
    discountPercentage: 11,
    rating: 4.7,
    stock: 85,
    brand: "BoomBox",
    category: "electronics",
    thumbnail: "https://picsum.photos/id/1050/300/200",
    images: ["https://picsum.photos/id/1050/300/200"]
  },
  {
    id: 10,
    title: "Running Shoes",
    description: "Lightweight and breathable shoes designed for long-distance running.",
    price: 75,
    discountPercentage: 10,
    rating: 4.5,
    stock: 60,
    brand: "SprintX",
    category: "fashion",
    thumbnail: "https://picsum.photos/id/1055/300/200",
    images: ["https://picsum.photos/id/1055/300/200"]
  },
  {
    id: 11,
    title: "Face Serum",
    description: "Collagen-rich serum for radiant and youthful skin.",
    price: 40,
    discountPercentage: 9,
    rating: 4.4,
    stock: 95,
    brand: "SkinGlow",
    category: "skincare",
    thumbnail: "https://picsum.photos/id/1060/300/200",
    images: ["https://picsum.photos/id/1060/300/200"]
  },
  {
    id: 12,
    title: "Laptop Sleeve",
    description: "Protective sleeve for laptops up to 15 inches with soft padding.",
    price: 28,
    discountPercentage: 6,
    rating: 4.3,
    stock: 110,
    brand: "TechGuard",
    category: "accessories",
    thumbnail: "https://picsum.photos/id/1065/300/200",
    images: ["https://picsum.photos/id/1065/300/200"]
  },
  {
    id: 13,
    title: "Essential Oil Set",
    description: "Aromatherapy set with lavender, eucalyptus, and peppermint oils.",
    price: 35,
    discountPercentage: 7,
    rating: 4.6,
    stock: 70,
    brand: "AromaLife",
    category: "skincare",
    thumbnail: "https://picsum.photos/id/1070/300/200",
    images: ["https://picsum.photos/id/1070/300/200"]
  },
  {
    id: 14,
    title: "Wireless Mouse",
    description: "Ergonomic mouse with silent clicks and adjustable DPI.",
    price: 20,
    discountPercentage: 5,
    rating: 4.4,
    stock: 130,
    brand: "ClickPro",
    category: "electronics",
    thumbnail: "https://picsum.photos/id/1075/300/200",
    images: ["https://picsum.photos/id/1075/300/200"]
  },
  {
    id: 15,
    title: "Reusable Water Bottle",
    description: "Eco-friendly stainless steel bottle with leak-proof lid.",
    price: 15,
    discountPercentage: 4,
    rating: 4.5,
    stock: 150,
    brand: "HydroMate",
    category: "accessories",
    thumbnail: "https://picsum.photos/id/1080/300/200",
    images: ["https://picsum.photos/id/1080/300/200"]
  }
];




  products = signal<Product[]>(this.productsData);

  getCategories(): { id: string; name: string }[] {
    const unique = Array.from(new Set(this.productsData.map(p => p.category)));
    return [{ id: 'all', name: 'All' }, ...unique.map(cat => ({ id: cat, name: cat }))];
  }
}