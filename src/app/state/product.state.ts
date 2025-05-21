export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  skip: number;
  limit: number;
  categories: string[];
  selectedCategory: string | null;
  searchQuery: string | null;
  isAppending: boolean;
}

export const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 10,
  categories: [],
  selectedCategory: null,
  searchQuery: null,
  isAppending: false
};
