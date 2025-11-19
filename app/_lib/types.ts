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
  title: string;
  href: string;
  icon: React.ElementType;
}

export type SideBar<T extends string = string> = {
  [K in T]: SideBarItem[];
};

export type dashboardRole = "admin" | "user";

export interface Stat {
  title: string;
  icon: IconType;
  value: number;
  change?: number; // Percentage change (e.g., 20.1 for +20.1%)
  changeType: "increase" | "decrease";
  color: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
  prefix?: string; // e.g., "$" for currency
  suffix?: string; // e.g., "%" or "K"
  isLoading?: boolean;
}

export interface PopularChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface RecentOrder {
  id: number;
  orderId: number;
  payment_method: string;
  amount: number;
  status: "pending" | "completed" | "paid";
}

export type RevenueData = {
  month: string;
  sales: number;
  revenue: number;
};

export interface OrderItem {
  id: 1;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  order_id: number;
  items: OrderItem[];
  user_id: number;
  message?: string;
  total_price: number;
  payment_method: string;
  created_at: string;
  status: "pending" | "completed" | "paid";
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  image?: string | StaticImageData;
  total_orders: number;
  total_spent: number;
  status: "active" | "inactive" | "banned" | "pending";
  created_at: string;
  email?: string;
  addresses?: Address[];
}

export interface Address {
  id: number;
  country: string;
  city: string;
  address: string;
  postal_code: number | string;
}

export interface Message {
  id: number;
  content: string;
  sender: "user" | "admin";
  senderName: string;
  timestamp: Date | string;
}

export interface Ticket {
  id: number;
  subject: string;
  client: number;
  created_at: string;
  messages: Message[];
  order_id?: number;
  priority: "low" | "medium" | "high";
  status: "open" | "closed" | "pending";
}
