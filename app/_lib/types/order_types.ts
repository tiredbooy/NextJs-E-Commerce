import { CustomerDataForAdminOrder } from "../types";

export interface OrderItem {
  id: 1;
  order_id: number;
  product_id: number;
  quantity: number;
  price_at_purchase: number;
  size_id?: number;
  color_id?: number;
}

export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  shipping_address_id: string;
  customer: CustomerDataForAdminOrder
  coupon_id?: number;
  discount_applied?: number;
  status: "pending" | "processing" | "completed" | "cancelled" | "shipped";
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface CreateOrderItemReq {
    product_id : number
    quantity : number
    size_id: number
    color_id: number
}

export interface CreateOrderReq {
    shipping_address_id: number
    coupon_code?: string
    items: CreateOrderItemReq[]
}

export interface OrdersResponse {
    orders: Order[]
    page: number
    limit: number
    total_items: number
    total_pages: number
    has_next: boolean
    has_prev: boolean
}