export interface Color {
  id: number;
  title: string;
  hex: string;
}

export interface Size {
  id: number;
  size: string;
}

export interface Image {
  id?: number;
  url: string;
  product_id: number;
  name: string;
}

export interface Category {
  id: number;
  title: string;
}

export interface Brand {
  id: number;
  title: string;
}

export interface ProductItem {
  id: number;
  title: string;
  price: number;
  discount_price?: number | null;
  description: string;
  stock: number;
  slug: string;
  image?: string;
  brand: number;
  sales: number;
  is_featured: boolean;
  include_tax: boolean;
  is_active: boolean;
  created_at: string;
}

export interface Product extends ProductItem {
  colors?: Color[];
  sizes?: Size[];
  images?: Image[];
  categories?: Category[];
}

export interface CreateProductRequest {
  title: string;
  price: number;
  discount_price?: number | null;
  description: string;
  stock: number;
  brand: number;
  slug: string;
  meta_description: string;
  meta_tags: string[];
  is_featured: boolean;
  is_active: boolean;
  include_tax: boolean;
  category_ids: number[];
  color_ids: number[];
  size_ids: number[];
}

export interface PaginatedProductsResponse {
  products: Product[];
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface Review {
  id?: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment: string;
  created_at: string;
  first_name?: string
  last_name?: string
  profile?: string
}

export interface ReviewResponse {
  reviews: Review[]
  avg_rating: number
  total_reviews: number
}


export interface SearchResponse {
  products?: Product[];
}

export interface SearchResultsProps {
  query: string;
  results: Product[];
  recentSearches: string[];
  loading: boolean;
  onProductSelect: (productId: number, productTitle: string) => void;
  onRecentSearchSelect: (search: string) => void;
  onViewAllResults: (query: string) => void;
}