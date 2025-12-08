import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";
import { Product } from "./types/product_types";

export interface Announcment {
  announcmentTxt: string;
  linkTxt: string;
  href: string;
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
  user_id: number;
  total_price: number;
  created_at: number;
  status: "pending" | "completed" | "paid";
}

export type RevenueData = {
  month: string;
  sales: number;
  revenue: number;
};

export interface Message {
  id: number;
  content: string;
  sender: "user" | "admin";
  sender_role: "admin" | "user"
  sender_first_name: string;
  sender_last_name?: string;
  created_at: string;
}

export type TicketStatus = "open" | "closed" | "pending"

export interface Ticket {
  id: number;
  subject: string;
  client: number;
  client_first_name?: string
  client_last_name?: string
  messages: Message[];
  order_id?: number;
  priority: "low" | "medium" | "high";
  status: TicketStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateTicketMessage {
  content: string
  is_internal? : boolean
}

export interface QueryParams {
  limit?: number;
  page?: number;
  status?: string;
  total?: number;
  user?: number;
  from?: string;
  to?: string;
  search?: string;
  sortBy?: string;
  orderBy?: string;
  joined?: string;
  category?: string;
  brand?: string;
  colors?: string;
  sizes?: string;
  minPrice?: string;
  maxPrice?: string;
  sortOrder?: string;
}

export interface AdminOrder {
  id: string;
  created_at: string;
  updated_at: string;
  total_price: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

export interface CustomerDataForAdminOrder {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | undefined;
}



export interface Cart {
  id: number;
  items: CartItem[];
  updated_at: string;
}

export interface CartItem {
  id? : number
  brand?: string
  color?: string
  hex?: string
  size?: string
  product_id: number;
  quantity: number;
  size_id: number;
  color_id: number;
  product: Product;
  created_at: string;
  updated_at: string;
}

export type CartItemReq = Pick<
  CartItem,
  "product_id" | "quantity" | "color_id" | "size_id"
>;

export interface SettingsData {
  site_name?: string;
  site_email?: string;
  currency?: string;
  maintenance_mode?: boolean;
}

export interface UpdateSetting {
  [key: string]: string | boolean;
}



