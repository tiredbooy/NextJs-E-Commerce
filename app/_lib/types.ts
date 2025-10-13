import { StaticImageData } from "next/image";

export interface Announcment {
  announcmentTxt: string;
  linkTxt: string;
  href: string;
}

export interface ProductSize {
  id: number;
  size: string;
}

export interface ProductColor {
  id: number;
  title: string;
}

export interface ProductCategory {
  id: number;
  title: string;
}

export interface ProductImage {
  id: number;
  url: string | StaticImageData;
  name?: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  discount_price?: number;
  description: string;
  sizes?: ProductSize[];
  colros?: ProductColor[];
  category: ProductCategory[];
  images: ProductImage[];
  stock_quantity: number;
  sales: number;
  created_at: string;
}

export interface CategoryCard {
  title: string;
  image: string | StaticImageData;
  description?: string;
  href?: string;
}
