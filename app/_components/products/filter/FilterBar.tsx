"use client";

import { useState, useCallback, useMemo } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import FilterContent from "@/app/_components/products/filter/FilterContent";
import { motion, AnimatePresence } from "framer-motion";

// Types (keep in main file or extract to types.ts if grows)
export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface PriceRange {
  min: number;
  max: number;
}

export interface FilterState {
  categories: string[];
  brands: string[];
  sizes: string[];
  colors: string[];
  priceRange: PriceRange;
  inStock: boolean;
  onSale: boolean;
  search: string;
}

interface Props {
  onFilterChange?: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

// Mock data (could be props or fetched)
const CATEGORIES: FilterOption[] = [
  { id: "perfumes", label: "Perfumes", count: 245 },
  { id: "clothing", label: "Clothing", count: 532 },
  { id: "accessories", label: "Accessories", count: 189 },
  { id: "shoes", label: "Shoes", count: 167 },
  { id: "bags", label: "Bags", count: 98 },
];

const BRANDS: FilterOption[] = [
  { id: "chanel", label: "Chanel", count: 45 },
  { id: "dior", label: "Dior", count: 38 },
  { id: "gucci", label: "Gucci", count: 52 },
  { id: "versace", label: "Versace", count: 29 },
  { id: "prada", label: "Prada", count: 41 },
];

const SIZES: FilterOption[] = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
];

const COLORS: FilterOption[] = [
  { id: "black", label: "Black" },
  { id: "white", label: "White" },
  { id: "red", label: "Red" },
  { id: "blue", label: "Blue" },
  { id: "green", label: "Green" },
];

// Utility function to update URL params
const updateURLParams = (filters: FilterState) => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.categories.length)
    params.set("categories", filters.categories.join(","));
  if (filters.brands.length) params.set("brands", filters.brands.join(","));
  if (filters.sizes.length) params.set("sizes", filters.sizes.join(","));
  if (filters.colors.length) params.set("colors", filters.colors.join(","));
  if (filters.priceRange.min > 0)
    params.set("minPrice", filters.priceRange.min.toString());
  if (filters.priceRange.max < 1000)
    params.set("maxPrice", filters.priceRange.max.toString());
  if (filters.inStock) params.set("inStock", "true");
  if (filters.onSale) params.set("onSale", "true");

  const newURL = `${window.location.pathname}${
    params.toString() ? "?" + params.toString() : ""
  }`;
  window.history.pushState({}, "", newURL);
};

const FilterBar: React.FC<Props> = ({ onFilterChange, initialFilters }) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: initialFilters?.categories || [],
    brands: initialFilters?.brands || [],
    sizes: initialFilters?.sizes || [],
    colors: initialFilters?.colors || [],
    priceRange: initialFilters?.priceRange || { min: 0, max: 1000 },
    inStock: initialFilters?.inStock || false,
    onSale: initialFilters?.onSale || false,
    search: initialFilters?.search || "",
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Update filters and URL
  const updateFilters = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);
      updateURLParams(newFilters);
      onFilterChange?.(newFilters);
    },
    [onFilterChange]
  );

  // Toggle array filter
  const toggleArrayFilter = useCallback(
    (
      key: keyof Pick<
        FilterState,
        "categories" | "brands" | "sizes" | "colors"
      >,
      value: string
    ) => {
      const newFilters = {
        ...filters,
        [key]: filters[key].includes(value)
          ? filters[key].filter((v) => v !== value)
          : [...filters[key], value],
      };
      updateFilters(newFilters);
    },
    [filters, updateFilters]
  );

  // Toggle boolean filter
  const toggleBooleanFilter = useCallback(
    (key: "inStock" | "onSale") => {
      updateFilters({ ...filters, [key]: !filters[key] });
    },
    [filters, updateFilters]
  );

  // Update price range
  const updatePriceRange = useCallback(
    (range: PriceRange) => {
      updateFilters({ ...filters, priceRange: range });
    },
    [filters, updateFilters]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    const clearedFilters: FilterState = {
      categories: [],
      brands: [],
      sizes: [],
      colors: [],
      priceRange: { min: 0, max: 1000 },
      inStock: false,
      onSale: false,
      search: "",
    };
    updateFilters(clearedFilters);
  }, [updateFilters]);

  // Count active filters
  const activeFilterCount = useMemo(() => {
    return (
      filters.categories.length +
      filters.brands.length +
      filters.sizes.length +
      filters.colors.length +
      (filters.priceRange.min > 0 || filters.priceRange.max < 1000 ? 1 : 0) +
      (filters.inStock ? 1 : 0) +
      (filters.onSale ? 1 : 0) +
      (filters.search ? 1 : 0)
    );
  }, [filters]);

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center justify-between gap-2 px-4 py-3 w-full bg-card border border-border rounded-lg hover:bg-card-hover transition-colors shadow-sm"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Filters</span>
          </div>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <AnimatePresence mode="wait">
        {isMobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1], // smooth cubic bezier easing
            }}
            className={`
        fixed top-0 left-0 bottom-0 w-[85vw] glass z-50 shadow-lg
        lg:hidden
      `}
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b border-divider">
                <h2 className="text-lg font-semibold text-foreground">
                  Filters
                </h2>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-muted rounded-md transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <FilterContent
                  filters={filters}
                  activeFilterCount={activeFilterCount}
                  clearAllFilters={clearAllFilters}
                  updateFilters={updateFilters}
                  toggleArrayFilter={toggleArrayFilter}
                  toggleBooleanFilter={toggleBooleanFilter}
                  updatePriceRange={updatePriceRange}
                  categories={CATEGORIES}
                  brands={BRANDS}
                  sizes={SIZES}
                  colors={COLORS}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="border border-border bg-card rounded-lg overflow-hidden shadow-sm">
          <FilterContent
            filters={filters}
            activeFilterCount={activeFilterCount}
            clearAllFilters={clearAllFilters}
            updateFilters={updateFilters}
            toggleArrayFilter={toggleArrayFilter}
            toggleBooleanFilter={toggleBooleanFilter}
            updatePriceRange={updatePriceRange}
            categories={CATEGORIES}
            brands={BRANDS}
            sizes={SIZES}
            colors={COLORS}
          />
        </div>
      </div>
    </>
  );
};

export default FilterBar;
