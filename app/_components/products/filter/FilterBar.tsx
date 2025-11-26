"use client";

import { useState, useCallback, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import FilterContent from "@/app/_components/products/filter/FilterContent";
import { motion, AnimatePresence } from "framer-motion";
import { Brand, Category, Color, Size } from "@/app/_lib/types/product_types";
import { Button } from "@/components/ui/button";

// Store full objects like before
export interface FilterState {
  categories: Category[];
  brands: Brand[];
  sizes: Size[];
  colors: Color[];
  priceRange: {
    min: number;
    max: number;
  };
  inStock: boolean;
  onSale: boolean;
  search: string;
}

interface Props {
  onFilterChange?: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
  availableCategories?: Category[];
  availableBrands?: Brand[];
  availableSizes?: Size[];
  availableColors?: Color[];
}

const updateURLParams = (filters: FilterState) => {
  const params = new URLSearchParams();

  if (filters.search) params.set("search", filters.search);
  if (filters.categories.length)
    params.set("categories", filters.categories.map((c) => c.title?.toLowerCase()).join(","));
  if (filters.brands.length)
    params.set("brands", filters.brands.map((b) => b.title?.toLowerCase()).join(","));
  if (filters.sizes.length)
    params.set("sizes", filters.sizes.map((s) => s.size?.toLowerCase()).join(","));
  if (filters.colors.length)
    params.set("colors", filters.colors.map((c) => c.title?.toLowerCase()).join(","));
  if (filters.priceRange.min > 0)
    params.set("minPrice", filters.priceRange.min.toString());
  if (filters.priceRange.max <= 20000)
    params.set("maxPrice", filters.priceRange.max.toString());
  if (filters.inStock) params.set("inStock", "true");
  if (filters.onSale) params.set("onSale", "true");

  const newURL = `${window.location.pathname}${
    params.toString() ? "?" + params.toString() : ""
  }`;
  window.history.pushState({}, "", newURL);
};

const FilterBar: React.FC<Props> = ({
  onFilterChange,
  initialFilters,
  availableCategories = [],
  availableBrands = [],
  availableSizes = [],
  availableColors = [],
}) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: initialFilters?.categories || [],
    brands: initialFilters?.brands || [],
    sizes: initialFilters?.sizes || [],
    colors: initialFilters?.colors || [],
    priceRange: initialFilters?.priceRange || { min: 0, max: 20000 },
    inStock: initialFilters?.inStock || false,
    onSale: initialFilters?.onSale || false,
    search: initialFilters?.search || "",
  });

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const updateFilters = useCallback(
    (newFilters: FilterState) => {
      setFilters(newFilters);
      updateURLParams(newFilters);
      onFilterChange?.(newFilters);
    },
    [onFilterChange]
  );

  // Fixed: Compare by ID, not by object reference
  const toggleArrayFilter = useCallback(
    (
      key: "categories" | "brands" | "sizes" | "colors",
      item: Category | Brand | Size | Color
    ) => {
      const currentArray = filters[key];
      const exists = currentArray.some((i) => i.id === item.id);

      const newArray = exists
        ? currentArray.filter((i) => i.id !== item.id)
        : [...currentArray, item];

      updateFilters({ ...filters, [key]: newArray } as FilterState);
    },
    [filters, updateFilters]
  );

  const toggleBooleanFilter = useCallback(
    (key: "inStock" | "onSale") => {
      updateFilters({ ...filters, [key]: !filters[key] });
    },
    [filters, updateFilters]
  );

  const updatePriceRange = useCallback(
    (range: { min: number; max: number }) => {
      updateFilters({ ...filters, priceRange: range });
    },
    [filters, updateFilters]
  );

  const updateSearch = useCallback(
    (search: string) => {
      updateFilters({ ...filters, search });
    },
    [filters, updateFilters]
  );

  const clearAllFilters = useCallback(() => {
    const clearedFilters: FilterState = {
      categories: [],
      brands: [],
      sizes: [],
      colors: [],
      priceRange: { min: 0, max: 20000 },
      inStock: false,
      onSale: false,
      search: "",
    };
    updateFilters(clearedFilters);
  }, [updateFilters]);

  const activeFilterCount = useMemo(() => {
    return (
      filters.categories.length +
      filters.brands.length +
      filters.sizes.length +
      filters.colors.length +
      (filters.priceRange.min > 0 || filters.priceRange.max <= 20000 ? 1 : 0) +
      (filters.inStock ? 1 : 0) +
      (filters.onSale ? 1 : 0) +
      (filters.search ? 1 : 0)
    );
  }, [filters]);

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setIsMobileOpen(true)}
          variant="outline"
          className="w-full justify-between"
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </div>
          {activeFilterCount > 0 && (
            <span className="bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </Button>
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
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="fixed top-0 left-0 bottom-0 w-[85vw] bg-background z-50 shadow-lg lg:hidden border-r"
          >
            <FilterContent
              filters={filters}
              activeFilterCount={activeFilterCount}
              clearAllFilters={clearAllFilters}
              toggleArrayFilter={toggleArrayFilter}
              toggleBooleanFilter={toggleBooleanFilter}
              updatePriceRange={updatePriceRange}
              updateSearch={updateSearch}
              availableCategories={availableCategories}
              availableBrands={availableBrands}
              availableSizes={availableSizes}
              availableColors={availableColors}
              onClose={() => setIsMobileOpen(false)}
              isMobile={true}
            />
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
            toggleArrayFilter={toggleArrayFilter}
            toggleBooleanFilter={toggleBooleanFilter}
            updatePriceRange={updatePriceRange}
            updateSearch={updateSearch}
            availableCategories={availableCategories}
            availableBrands={availableBrands}
            availableSizes={availableSizes}
            availableColors={availableColors}
            isMobile={false}
          />
        </div>
      </div>
    </>
  );
};

export default FilterBar;
