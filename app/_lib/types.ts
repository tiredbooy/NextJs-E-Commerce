import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

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

export interface SideBarItem {
    title : string
    href : string
    icon : React.ElementType
    
}

export type SideBar<T extends string = string> = {
  [K in T]: SideBarItem[]
}

export type dashboardRole = "admin" | "user"

export interface Stat {
  title: string;
  icon: IconType;
  value: number;
  change?: number; // Percentage change (e.g., 20.1 for +20.1%)
  changeType?: "increase" | "decrease";
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
  prefix?: string; // e.g., "$" for currency
  suffix?: string; // e.g., "%" or "K"
}

export interface PopularCategory {
  name : string
  value : number
  color? : string
}

export interface RecentOrder {
  id: number
  orderId : number
  payment_method : string
  amount : number
  status : "pending" | "completed" | "paid"
}

export type RevenueData = {
  month: string
  sales: number
  revenue : number
};
