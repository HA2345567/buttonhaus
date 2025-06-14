export type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
};

export type ProductColor = {
  name: string;
  value: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  categoryName: string;
  colors: ProductColor[];
  sizes: string[];
  materials: string[];
  featured: boolean;
  bestseller: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
};