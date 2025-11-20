import { StaticImageData } from "next/image";

export interface Signup {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  image?: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name?: string;
  phone?: string;
  image?: string | StaticImageData;
  email: string;
  role: string;
  created_at: string;
}

export interface Address {
  id: number;
  name: string;
  user_id: number;
  country: string;
  city: string;
  address: string;
  postal_code: number | string;
  state?: string;
  is_default: boolean;
  created_at: string;
}

export interface Favorits {
    id: number
    user_id: number
    product_id: number
    created_at: string
}