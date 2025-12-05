import { CustomerDataForAdminOrder } from "../types";

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  size_id?: number;
  color_id?: number;
}

export interface OrderDetailItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  size_id: number;
  color_id: number;
  product_name: string;
  size_name: string;
  color_name: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled"
  | "shipped";

export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  shipping_address_id: number;
  customer: CustomerDataForAdminOrder;
  coupon_id?: number;
  discount_applied?: number;
  status: OrderStatus;
  items?: OrderItem[] | number | OrderDetailItem[];
  created_at: string;
  updated_at: string;
}

export interface CreateOrderItemReq {
  product_id: number;
  quantity: number;
  size_id: number;
  color_id: number;
}

export interface CreateOrderReq {
  shipping_address_id: number;
  coupon_code?: string;
  items: CreateOrderItemReq[];
}

export interface OrdersResponse {
  orders: Order[];
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface Coupon {
  id: number;
  code: string;
  discount_percentage: number;
  min_purchase: number;
  max_purchase: number;
  max_uses: number;
  current_uses: number;
  is_active: boolean;
  expires_at: string;
  created_at: string;
}

export type CreateCouponReq = Pick<
  Coupon,
  | "code"
  | "discount_percentage"
  | "min_purchase"
  | "max_purchase"
  | "max_uses"
  | "current_uses"
  | "is_active"
  | "expires_at"
>;
