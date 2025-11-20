import { StaticImageData } from "next/image";
import { IconType } from "react-icons/lib";

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

export interface QueryParams {
  limit?: number;
  page?: number;
  status?: string;
  total?: string;
  user?: string;
  from?: string;
  to?: string;
  search?: string;
  sortBy?: string;
  orderBy?: string;
  joined?: string;
  category?: string;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sortOrder?: string;
}
