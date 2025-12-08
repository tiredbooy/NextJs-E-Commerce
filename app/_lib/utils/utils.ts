import { FilterState } from "@/app/_components/products/filter/FilterBar";
import {jwtDecode} from "jwt-decode"

export function getStringFromForm(
  formData: FormData,
  key: string,
  defaultValue = ""
): string {
  const val = formData.get(key);
  if (val == null) return defaultValue;
  if (typeof val === "string") return val;

  return defaultValue;
}

export function getNumberFromForm(
  formData: FormData,
  key: string,
  defaultValue = 0
): number {
  const str = getStringFromForm(formData, key, "").trim();
  if (str === "") return defaultValue;
  const n = Number(str);
  return Number.isFinite(n) ? n : defaultValue;
}

export function buildQuery<T extends Record<string, any>>(params: T): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

// utils/jwt.ts

interface JwtPayload {
  exp?: number;
  email?: string;
  userId?: number;
  role?: string;
  username?: string;
  [key: string]: any;
}

export function decodeJWT(token?: string): JwtPayload | null {
  if (!token) return null;
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error("JWT decode failed:", error);
    return null;
  }
}

export function isTokenExpired(token?: string, bufferSeconds = 60): boolean {
  if (!token) return true;

  const payload = decodeJWT(token);
  if (!payload?.exp) return true;

  const now = Date.now();
  const expiry = payload.exp * 1000;
  const buffer = bufferSeconds * 1000;

  return now >= expiry - buffer;
}
/**
 * Get time remaining until token expires (in seconds)
 */
export function getTokenTimeRemaining(token?: string): number | null {
  if (!token) return null;

  const payload = decodeJWT(token);
  if (!payload?.exp) return null;

  const expiryTime = payload.exp * 1000;
  const now = Date.now();
  const remaining = Math.floor((expiryTime - now) / 1000);

  return remaining > 0 ? remaining : 0;
}

/**
 * Check if token will expire within a certain time window
 */
export function isTokenExpiringSoon(
  token?: string,
  withinSeconds: number = 300 // 5 minutes default
): boolean {
  const remaining = getTokenTimeRemaining(token);
  if (remaining === null) return true;
  return remaining <= withinSeconds;
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Converts filter state to URL query string
 * @param filters - The filter state object
 * @returns Query string (e.g., "?category=shirts&brand=nike&colors=red&colors=blue")
 */
export const filtersToQueryString = (filters: FilterState): string => {
  const params = new URLSearchParams();

  // Search
  if (filters.search) {
    params.set("search", filters.search);
  }

  // Category (single value)
  if (filters.categories.length > 0 && filters.categories[0]?.title) {
    params.set("category", filters.categories[0].title.toLowerCase());
  }

  // Brand (single value)
  if (filters.brands.length > 0 && filters.brands[0]?.title) {
    params.set("brand", filters.brands[0].title.toLowerCase());
  }

  // Sizes (multiple values - only titles)
  if (filters.sizes.length > 0) {
    filters.sizes.forEach((size) => {
      if (size.size) {
        params.append("sizes", size.size.toLowerCase());
      }
    });
  }

  // Colors (multiple values - only titles)
  if (filters.colors.length > 0) {
    filters.colors.forEach((color) => {
      if (color.title) {
        params.append("colors", color.title.toLowerCase());
      }
    });
  }

  // Price range (only if not default)
  if (filters.priceRange.min > 0) {
    params.set("minPrice", filters.priceRange.min.toString());
  }
  if (filters.priceRange.max > 0 && filters.priceRange.max < 20000) {
    params.set("maxPrice", filters.priceRange.max.toString());
  }

  // Boolean filters
  // if (filters.inStock) {
  //   params.set("inStock", "true");
  // }
  // if (filters.onSale) {
  //   params.set("onSale", "true");
  // }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * Converts filter state to a plain object with only the values (no IDs)
 * Useful for API calls that only need the filter values
 * @param filters - The filter state object
 * @returns Object with filter values only
 */
export const filtersToApiParams = (filters: FilterState) => {
  const params: Record<string, any> = {};

  if (filters.search) {
    params.search = filters.search;
  }

  if (filters.categories.length > 0 && filters.categories[0]?.title) {
    params.category = filters.categories[0].title.toLowerCase();
  }

  if (filters.brands.length > 0 && filters.brands[0]?.title) {
    params.brand = filters.brands[0].title.toLowerCase();
  }

  if (filters.sizes.length > 0) {
    params.sizes = filters.sizes
      .map((size) => size.size?.toLowerCase())
      .filter(Boolean);
  }

  if (filters.colors.length > 0) {
    params.colors = filters.colors
      .map((color) => color.title?.toLowerCase())
      .filter(Boolean);
  }

  if (filters.priceRange.min > 0) {
    params.minPrice = filters.priceRange.min;
  }
  if (filters.priceRange.max > 0 && filters.priceRange.max < 20000) {
    params.maxPrice = filters.priceRange.max;
  }

  return params;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
